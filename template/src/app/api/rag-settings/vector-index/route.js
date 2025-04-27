import { NextResponse } from 'next/server';

const ATLAS_GROUP_ID = process.env.ATLAS_GROUP_ID; // Project ID
const ATLAS_CLUSTER_NAME = process.env.ATLAS_CLUSTER_NAME;
const ATLAS_API_PUBLIC_KEY = process.env.ATLAS_API_PUBLIC_KEY;
const ATLAS_API_PRIVATE_KEY = process.env.ATLAS_API_PRIVATE_KEY;
const ATLAS_DB_NAME = process.env.ATLAS_DB_NAME; // Your DB name

const BASE_URL = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${ATLAS_GROUP_ID}/clusters/${ATLAS_CLUSTER_NAME}/fts/indexes`;

async function getVectorIndexes() {
  const res = await fetch(BASE_URL, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${ATLAS_API_PUBLIC_KEY}:${ATLAS_API_PRIVATE_KEY}`).toString('base64'),
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

async function createVectorIndex() {
  const body = {
    collectionName: 'ragchunks',
    database: ATLAS_DB_NAME,
    name: 'default',
    mappings: {
      dynamic: false,
      fields: {
        embedding: {
          type: 'vector',
          dimensions: 1536,
          similarity: 'cosine',
        },
      },
    },
  };
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${ATLAS_API_PUBLIC_KEY}:${ATLAS_API_PRIVATE_KEY}`).toString('base64'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

export async function GET() {
  try {
    const indexes = await getVectorIndexes();
    const exists = indexes.results?.some(idx => idx.collectionName === 'ragchunks' && idx.mappings?.fields?.embedding?.type === 'vector');
    return NextResponse.json({ exists });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const result = await createVectorIndex();
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 