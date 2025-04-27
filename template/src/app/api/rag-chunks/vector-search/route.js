import { NextResponse } from 'next/server';
import RagChunk from '@/models/RagChunk';
import RagDocument from '@/models/RagDocument';
import connectDB from '@/lib/mongodb';

export const runtime = 'nodejs';

async function getOpenAIEmbedding(text) {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set');
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ input: text, model: 'text-embedding-3-small' }),
  });
  const data = await res.json();
  return data.data[0].embedding;
}

export async function POST(request) {
  await connectDB();
  try {
    const { query, topK = 5 } = await request.json();
    if (!query) {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 });
    }
    const embedding = await getOpenAIEmbedding(query);
    // Vector search aggregation
    const results = await RagChunk.aggregate([
      {
        $vectorSearch: {
          queryVector: embedding,
          path: 'embedding',
          numCandidates: 100,
          limit: topK,
          index: 'vector_index', // Use your Atlas vector index name if different
        },
      },
      {
        $lookup: {
          from: 'ragdocuments',
          localField: 'document',
          foreignField: '_id',
          as: 'document',
        },
      },
      { $unwind: '$document' },
      {
        $project: {
          text: 1,
          chunkIndex: 1,
          score: { $meta: 'vectorSearchScore' },
          document: {
            _id: 1,
            title: 1,
            filetype: 1,
            uploadedAt: 1,
          },
        },
      },
    ]);
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 