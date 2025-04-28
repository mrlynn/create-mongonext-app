import { NextResponse } from 'next/server';
import RagChunk from '@/models/RagChunk';
import RagDocument from '@/models/RagDocument';
import connectDB from '@/lib/mongodb';
import OpenAI from 'openai';

export const runtime = 'nodejs';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const DEBUG_MODE = process.env.DEBUG_MODE === 'true';
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY?.slice(0, 8));
console.log('Loaded vector-search API route');
async function getOpenAIEmbedding(text) {
    if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set');
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      encoding_format: 'float',
    });
    if (!response.data || !response.data[0]?.embedding) {
      throw new Error('No embedding returned from OpenAI');
    }
    return response.data[0].embedding;
  }

export async function POST(request) {

  console.log('DEBUG_MODE:', DEBUG_MODE);
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
    if (DEBUG_MODE) {
      console.error('Vector search error:', error);
      return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 