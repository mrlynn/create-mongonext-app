'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Snackbar, Alert, IconButton, TextField, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const FILETYPES = [
  { value: 'md', label: 'Markdown' },
  { value: 'html', label: 'HTML' },
  { value: 'txt', label: 'Plain Text' },
  { value: 'pdf', label: 'PDF (future)' },
];

export default function RagDocumentsAdmin() {
  const [documents, setDocuments] = useState([]);
  const [creating, setCreating] = useState(false);
  const [processing, setProcessing] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [form, setForm] = useState({ title: '', filetype: 'md', content: '' });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/rag-documents');
      const data = await res.json();
      setDocuments(data.map(doc => ({
        ...doc,
        id: doc._id,
        status: doc.status || 'uploaded',
      })));
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to fetch documents', severity: 'error' });
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setSnackbar({ open: true, message: 'Title and content are required.', severity: 'error' });
      return;
    }
    setCreating(true);
    try {
      const res = await fetch('/api/rag-documents/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title, filetype: form.filetype, content: form.content }),
      });
      const data = await res.json();
      if (res.ok) {
        setDocuments((docs) => [...docs, { ...data, status: 'uploaded' }]);
        setSnackbar({ open: true, message: 'Document created!', severity: 'success' });
        setForm({ title: '', filetype: 'md', content: '' });
      } else {
        setSnackbar({ open: true, message: data.error || 'Creation failed', severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setCreating(false);
    }
  };

  const handleProcess = async (doc) => {
    setProcessing((p) => ({ ...p, [doc.id]: true }));
    try {
      const res = await fetch('/api/rag-documents/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: doc.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setDocuments((docs) => docs.map(d => d.id === doc.id ? { ...d, status: 'processed', chunks: data.chunks } : d));
        setSnackbar({ open: true, message: 'Document processed!', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: data.error || 'Processing failed', severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setProcessing((p) => ({ ...p, [doc.id]: false }));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>RAG Documents</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <form onSubmit={handleCreate}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="filetype"
                value={form.filetype}
                label="Type"
                onChange={handleFormChange}
              >
                {FILETYPES.map((ft) => (
                  <MenuItem key={ft.value} value={ft.value}>{ft.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Content"
              name="content"
              value={form.content}
              onChange={handleFormChange}
              required
              fullWidth
              multiline
              minRows={6}
              placeholder="Paste or type your document content here..."
            />
            <Button type="submit" variant="contained" disabled={creating}>
              {creating ? 'Creating...' : 'Create Document'}
            </Button>
          </Box>
        </form>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Uploaded</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Chunks</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.title}</TableCell>
                <TableCell>{doc.filetype}</TableCell>
                <TableCell>{new Date(doc.uploadedAt).toLocaleString()}</TableCell>
                <TableCell>{doc.status || 'uploaded'}</TableCell>
                <TableCell>{doc.chunks || '-'}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<RefreshIcon />}
                    onClick={() => handleProcess(doc)}
                    disabled={processing[doc.id] || doc.status === 'processed'}
                  >
                    {processing[doc.id] ? 'Processing...' : 'Process'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {documents.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">No documents uploaded yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 