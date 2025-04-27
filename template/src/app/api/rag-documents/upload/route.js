import { NextResponse } from 'next/server';
import RagDocument from '@/models/RagDocument';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '@/lib/mongodb';  

export const runtime = 'nodejs'; // Ensure Node.js runtime for file handling

export async function POST(request) {
  await connectDB();

  // Try to parse as JSON (copy/paste mode)
  let data;
  try {
    data = await request.json();
  } catch {
    data = null;
  }

  if (data && data.title && data.filetype && data.content) {
    // Copy/paste mode
    const doc = await RagDocument.create({
      title: data.title,
      filetype: data.filetype,
      content: data.content,
      // Optionally: uploadedBy (if you have auth)
    });
    return NextResponse.json({
      id: doc._id,
      title: doc.title,
      filetype: doc.filetype,
      content: doc.content,
      uploadedAt: doc.uploadedAt,
    });
  }

  // Fallback to formData (file upload mode, for future use)
  if (request.headers.get('content-type')?.includes('multipart/form-data')) {
    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title') || file?.name;
    const allowedTypes = ['application/pdf', 'text/markdown', 'text/html', 'text/plain'];
    const extMap = {
      'application/pdf': 'pdf',
      'text/markdown': 'md',
      'text/html': 'html',
      'text/plain': 'txt',
    };

    if (!file || !allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type.' }, { status: 400 });
    }

    // Save file to /tmp (or use S3 in production)
    const { promises: fs } = await import('fs');
    const path = (await import('path')).default;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}.${extMap[file.type]}`;
    const filePath = path.join('/tmp', filename);
    await fs.writeFile(filePath, buffer);

    // Create RagDocument entry
    const doc = await RagDocument.create({
      title,
      filename,
      filetype: extMap[file.type],
      fileUrl: filePath,
      // Optionally: uploadedBy (if you have auth)
    });

    return NextResponse.json({
      id: doc._id,
      title: doc.title,
      filename: doc.filename,
      filetype: doc.filetype,
      fileUrl: doc.fileUrl,
      uploadedAt: doc.uploadedAt,
    });
  }

  return NextResponse.json({ error: 'Invalid request. Must provide content or file.' }, { status: 400 });
} 