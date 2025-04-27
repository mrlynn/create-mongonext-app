import pdf from 'pdf-parse/lib/pdf-parse';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import * as cheerio from 'cheerio';

export async function extractTextFromFile(filePath, filetype) {
  const fs = await import('fs/promises');
  const buffer = await fs.readFile(filePath);

  if (filetype === 'pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  }
  if (filetype === 'md') {
    const text = buffer.toString('utf-8');
    const tree = unified().use(remarkParse).parse(text);
    // Flatten all text nodes
    return tree.children.map(node => node.value || '').join(' ');
  }
  if (filetype === 'html') {
    const html = buffer.toString('utf-8');
    const $ = load(html);
    return $('body').text();
  }
  if (filetype === 'txt') {
    return buffer.toString('utf-8');
  }
  throw new Error('Unsupported file type');
} 