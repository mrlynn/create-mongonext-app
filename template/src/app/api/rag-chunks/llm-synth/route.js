import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { question, context } = await request.json();
    if (!question || !context) {
      return NextResponse.json({ error: 'Missing question or context' }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY not set' }, { status: 500 });
    }
    const prompt = `You are a helpful assistant. Use the following context to answer the user's question.\n\nContext:\n${context}\n\nQuestion: ${question}\n\nAnswer:`;
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant for answering questions using provided context.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 512,
        temperature: 0.2,
      }),
    });
    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content?.trim() || '';
    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 