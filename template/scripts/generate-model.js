#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const [,, modelName] = process.argv;

if (!modelName) {
  console.error('Usage: node template/scripts/generate-model.js ModelName');
  process.exit(1);
}

const modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1);
const modelNameLower = modelName.toLowerCase();
const modelFile = path.join(__dirname, '../src/models', `${modelClass}.js`);
const apiDir = path.join(__dirname, `../src/app/api/${modelNameLower}s`);
const apiFile = path.join(apiDir, 'route.js');
const pageDir = path.join(__dirname, `../src/app/${modelNameLower}s`);
const pageFile = path.join(pageDir, 'page.js');

if (fs.existsSync(modelFile)) {
  console.error(`Model file already exists: ${modelFile}`);
  process.exit(1);
}
if (fs.existsSync(apiFile)) {
  console.error(`API route already exists: ${apiFile}`);
  process.exit(1);
}
if (fs.existsSync(pageFile)) {
  console.error(`Page already exists: ${pageFile}`);
  process.exit(1);
}

const modelTemplate = `import mongoose from 'mongoose';

const ${modelClass}Schema = new mongoose.Schema({
  // Add your fields here
  name: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.${modelClass} || mongoose.model('${modelClass}', ${modelClass}Schema);
`;

const apiTemplate = `import connectDB from '@/lib/mongodb';
import ${modelClass} from '@/models/${modelClass}';

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    const item = await ${modelClass}.findById(id);
    return Response.json(item);
  }
  const items = await ${modelClass}.find();
  return Response.json(items);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const item = await ${modelClass}.create(data);
  return Response.json(item);
}

export async function PUT(req) {
  await connectDB();
  const data = await req.json();
  const item = await ${modelClass}.findByIdAndUpdate(data._id, data, { new: true });
  return Response.json(item);
}

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 });
  await ${modelClass}.findByIdAndDelete(id);
  return Response.json({ success: true });
}
`;

let pageTemplate = `"use client";
import { useEffect, useState } from "react";

export default function ${modelClass}sPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const res = await fetch("/api/__modelNameLower__s");
    setItems(await res.json());
  }

  async function addItem() {
    await fetch("/api/__modelNameLower__s", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchItems();
  }

  async function deleteItem(id) {
    await fetch(\`/api/__modelNameLower__s?id=\${id}\`, { method: "DELETE" });
    fetchItems();
  }

  function startEdit(item) {
    setEditing(item._id);
    setEditName(item.name);
  }

  async function saveEdit(id) {
    await fetch("/api/__modelNameLower__s", {
      method: "PUT",
      body: JSON.stringify({ _id: id, name: editName }),
    });
    setEditing(null);
    setEditName("");
    fetchItems();
  }

  return (
    <div style={{ 
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem'
    }}>
      <h1 style={{ 
        fontSize: '1.875rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem'
      }}>${modelClass}s</h1>
      <div style={{ 
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <input
          type="text"
          style={{ 
            flex: '1',
            padding: '0.5rem 1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.25rem'
          }}
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button
          style={{ 
            backgroundColor: '#3b82f6',
            color: 'white',
            fontWeight: 'bold',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            border: 'none',
            cursor: 'pointer',
            opacity: name ? '1' : '0.5'
          }}
          onClick={addItem}
          disabled={!name}
        >
          Add
        </button>
      </div>
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ 
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead style={{ 
            backgroundColor: '#f9fafb'
          }}>
            <tr>
              <th style={{ 
                padding: '0.75rem 1.5rem',
                textAlign: 'left',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Name</th>
              <th style={{ 
                padding: '0.75rem 1.5rem',
                textAlign: 'left',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Created At</th>
              <th style={{ 
                padding: '0.75rem 1.5rem',
                textAlign: 'right',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id} style={{ 
                borderTop: '1px solid #e5e7eb'
              }}>
                <td style={{ 
                  padding: '1rem 1.5rem',
                  whiteSpace: 'nowrap'
                }}>
                  {editing === item._id ? (
                    <input
                      type="text"
                      style={{ 
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.25rem'
                      }}
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td style={{ 
                  padding: '1rem 1.5rem',
                  whiteSpace: 'nowrap'
                }}>
                  {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
                </td>
                <td style={{ 
                  padding: '1rem 1.5rem',
                  whiteSpace: 'nowrap',
                  textAlign: 'right'
                }}>
                  {editing === item._id ? (
                    <button
                      style={{ 
                        backgroundColor: '#10b981',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '0.5rem'
                      }}
                      onClick={() => saveEdit(item._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      style={{ 
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '0.5rem'
                      }}
                      onClick={() => startEdit(item)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    style={{ 
                      backgroundColor: '#ef4444',
                      color: 'white',
                      fontWeight: 'bold',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.25rem',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;

pageTemplate = pageTemplate.replace(/__modelNameLower__/g, modelNameLower);

fs.writeFileSync(modelFile, modelTemplate);
fs.mkdirSync(apiDir, { recursive: true });
fs.writeFileSync(apiFile, apiTemplate);
fs.mkdirSync(pageDir, { recursive: true });
fs.writeFileSync(pageFile, pageTemplate);

console.log(`Model created: ${modelFile}`);
console.log(`API route created: ${apiFile}`);
console.log(`Page created: ${pageFile}`); 