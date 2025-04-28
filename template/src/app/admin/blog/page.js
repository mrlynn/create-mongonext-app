'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import TitleIcon from '@mui/icons-material/Title';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

export default function BlogAdminPage() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft'
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (open && editor && formData.content !== editor.getHTML()) {
      editor.commands.setContent(formData.content || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, formData.content, editor]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/blog');
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
  };

  const handleOpen = (post = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || '',
        status: post.status || 'draft'
      });
    } else {
      setEditingPost(null);
      setFormData({ title: '', slug: '', content: '', excerpt: '', status: 'draft' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPost(null);
    setFormData({ title: '', slug: '', content: '', excerpt: '', status: 'draft' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingPost ? `/api/blog?id=${editingPost._id}` : '/api/blog';
    const method = editingPost ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      fetchPosts();
      handleClose();
      setSnackbar({ open: true, message: editingPost ? 'Blog post updated!' : 'Blog post added!', severity: 'success' });
    } else {
      const data = await res.json();
      setSnackbar({ open: true, message: data.error || 'Error', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPosts();
        setSnackbar({ open: true, message: 'Blog post deleted!', severity: 'success' });
      } else {
        const data = await res.json();
        setSnackbar({ open: true, message: data.error || 'Error', severity: 'error' });
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Blog Posts</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Add Blog Post
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post._id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.slug}</TableCell>
                <TableCell>{post.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(post)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(post._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingPost ? 'Edit Blog Post' : 'Add Blog Post'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Content
              </Typography>
              {editor && (
                <ButtonGroup variant="outlined" size="small" sx={{ mb: 1 }}>
                  <Tooltip title="Bold"><Button onClick={() => editor.chain().focus().toggleBold().run()} color={editor.isActive('bold') ? 'primary' : 'inherit'}><FormatBoldIcon /></Button></Tooltip>
                  <Tooltip title="Italic"><Button onClick={() => editor.chain().focus().toggleItalic().run()} color={editor.isActive('italic') ? 'primary' : 'inherit'}><FormatItalicIcon /></Button></Tooltip>
                  <Tooltip title="Underline"><Button onClick={() => editor.chain().focus().toggleUnderline().run()} color={editor.isActive('underline') ? 'primary' : 'inherit'}><FormatUnderlinedIcon /></Button></Tooltip>
                  <Tooltip title="Heading"><Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'inherit'}><TitleIcon /></Button></Tooltip>
                  <Tooltip title="Bullet List"><Button onClick={() => editor.chain().focus().toggleBulletList().run()} color={editor.isActive('bulletList') ? 'primary' : 'inherit'}><FormatListBulletedIcon /></Button></Tooltip>
                  <Tooltip title="Ordered List"><Button onClick={() => editor.chain().focus().toggleOrderedList().run()} color={editor.isActive('orderedList') ? 'primary' : 'inherit'}><FormatListNumberedIcon /></Button></Tooltip>
                  <Tooltip title="Blockquote"><Button onClick={() => editor.chain().focus().toggleBlockquote().run()} color={editor.isActive('blockquote') ? 'primary' : 'inherit'}><FormatQuoteIcon /></Button></Tooltip>
                  <Tooltip title="Code"><Button onClick={() => editor.chain().focus().toggleCodeBlock().run()} color={editor.isActive('codeBlock') ? 'primary' : 'inherit'}><CodeIcon /></Button></Tooltip>
                  <Tooltip title="Undo"><Button onClick={() => editor.chain().focus().undo().run()}><UndoIcon /></Button></Tooltip>
                  <Tooltip title="Redo"><Button onClick={() => editor.chain().focus().redo().run()}><RedoIcon /></Button></Tooltip>
                </ButtonGroup>
              )}
              <Paper variant="outlined" sx={{ p: 2, minHeight: 200, '& .ProseMirror': { outline: 'none', minHeight: 150 } }}>
                <EditorContent editor={editor} />
              </Paper>
            </Box>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingPost ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 