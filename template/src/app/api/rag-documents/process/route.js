import { NextResponse } from 'next/server';
import RagDocument from '@/models/RagDocument';
import RagChunk from '@/models/RagChunk';
import { extractTextFromFile } from '@/utils/ragProcessing';
import { chunkText } from '@/utils/chunkText';
import connectDB from '@/lib/mongodb';

export const runtime = 'nodejs';

async function getOpenAIEmbedding(text) {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set');
  try {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ input: text, model: 'text-embedding-3-small' }),
    });
    const data = await res.json();
    console.debug('OpenAI embedding API response:', JSON.stringify(data));
    if (!data.data || !data.data[0] || !data.data[0].embedding) throw new Error('Failed to get embedding');
    return data.data[0].embedding;
  } catch (err) {
    console.error('Error in getOpenAIEmbedding:', err);
    throw err;
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const { documentId } = await request.json();
    console.debug('Processing documentId:', documentId);
    if (!documentId) {
      console.error('Missing documentId in request');
      return NextResponse.json({ error: 'Missing documentId' }, { status: 400 });
    }
    const doc = await RagDocument.findById(documentId);
    if (!doc) {
      console.error('Document not found:', documentId);
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    if (!doc.content) {
      console.error('No content in document:', documentId);
      return NextResponse.json({ error: 'This document does not have content to process. Only copy/paste documents are supported at this time.' }, { status: 400 });
    }
    const text = doc.content;
    const chunks = chunkText(text);
    console.debug(`Chunked text into ${chunks.length} chunks.`);
    const chunkDocs = await Promise.all(
      chunks.map(async (chunk, idx) => {
        try {
          const embedding = await getOpenAIEmbedding(chunk);
          return RagChunk.create({
            document: doc._id,
            chunkIndex: idx,
            text: chunk,
            embedding,
          });
        } catch (err) {
          console.error(`Failed to get embedding for chunk ${idx}:`, err);
          throw err;
        }
      })
    );
    console.debug(`Successfully processed and stored ${chunkDocs.length} chunks for document ${doc._id}`);
    return NextResponse.json({
      documentId: doc._id,
      chunks: chunkDocs.length,
      status: 'processed',
    });
  } catch (error) {
    console.error('Error in /api/rag-documents/process:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 