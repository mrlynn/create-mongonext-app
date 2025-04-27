import { NextResponse } from 'next/server';
import { getSampleMovies, createSampleMovie, updateSampleMovie, deleteSampleMovie } from '@/utils/sampleData';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit'), 10) || 10;
    const skip = parseInt(searchParams.get('skip'), 10) || 0;
    const { movies, total } = await getSampleMovies(limit, skip);
    return NextResponse.json({ movies, total });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const movie = await createSampleMovie(body);
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...movieData } = body;
    const updated = await updateSampleMovie(id, movieData);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await deleteSampleMovie(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 