import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Category from '@/models/Category';

// GET all blog posts or a single post by ID or slug
export async function GET(request) {
  try {
    console.log('Attempting to connect to MongoDB...');
    const db = await connectDB();
    if (!db) {
      console.error('Failed to connect to MongoDB');
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    console.log('MongoDB connection successful');

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (id) {
      console.log('Fetching post by ID:', id);
      const post = await BlogPost.findById(id).populate('author categories');
      if (!post) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    if (slug) {
      console.log('Fetching post by slug:', slug);
      const post = await BlogPost.findOne({ slug }).populate('author categories');
      if (!post) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    console.log('Fetching all blog posts');
    const posts = await BlogPost.find().populate('author categories').sort({ createdAt: -1 });
    console.log(`Found ${posts.length} posts`);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error in blog API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new blog post
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const post = await BlogPost.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update a blog post
export async function PUT(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a blog post
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 