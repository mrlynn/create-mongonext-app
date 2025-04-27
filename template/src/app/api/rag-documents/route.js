import connectDB from '@/lib/mongodb';
import RagDocument from '@/models/RagDocument';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  await connectDB();
  const docs = await RagDocument.find().sort({ uploadedAt: -1 });
  return NextResponse.json(docs);
} 