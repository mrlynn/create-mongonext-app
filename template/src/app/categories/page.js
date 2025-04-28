'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    type: 'both',
    description: '',
    parent: '',
    order: 0
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    type: 'both',
    description: '',
    parent: '',
    order: 0
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return;

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        setNewCategory({
          name: '',
          type: 'both',
          description: '',
          parent: '',
          order: 0
        });
        fetchCategories();
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEditCategory = async (id) => {
    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        setEditingCategory(null);
        setEditForm({
          name: '',
          type: 'both',
          description: '',
          parent: '',
          order: 0
        });
        fetchCategories();
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const toggleCategory = (id) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategoryType = (type) => {
    const colors = {
      product: 'primary',
      blog: 'secondary',
      both: 'success'
    };
    return (
      <Chip 
        label={type} 
        color={colors[type]} 
        size="small" 
        sx={{ ml: 1 }}
      />
    );
  };

  const renderCategoryItem = (category, level = 0) => {
    const hasChildren = categories.some(c => c.parent?._id === category._id);
    const isExpanded = expandedCategories.has(category._id);

    return (
      <Box key={category._id}>
        <ListItem 
          sx={{ 
            pl: level * 2,
            bgcolor: editingCategory === category._id ? 'action.hover' : 'background.paper'
          }}
        >
          {editingCategory === category._id ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  fullWidth
                />
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={editForm.type}
                    label="Type"
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                  >
                    <MenuItem value="product">Product</MenuItem>
                    <MenuItem value="blog">Blog</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <TextField
                label="Description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                fullWidth
                multiline
                rows={2}
              />
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={() => setEditingCategory(null)}>Cancel</Button>
                <Button variant="contained" onClick={() => handleEditCategory(category._id)}>
                  Save
                </Button>
              </Stack>
            </Box>
          ) : (
            <>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {hasChildren && (
                      <IconButton size="small" onClick={() => toggleCategory(category._id)}>
                        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    )}
                    {category.name}
                    {renderCategoryType(category.type)}
                  </Box>
                }
                secondary={category.description}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => {
                    setEditingCategory(category._id);
                    setEditForm({
                      name: category.name,
                      type: category.type,
                      description: category.description || '',
                      parent: category.parent?._id || '',
                      order: category.order
                    });
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>
        {hasChildren && isExpanded && (
          <List disablePadding>
            {categories
              .filter(c => c.parent?._id === category._id)
              .sort((a, b) => a.order - b.order)
              .map(child => renderCategoryItem(child, level + 1))}
          </List>
        )}
      </Box>
    );
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Categories
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Category
          </Button>
        </Box>

        <List>
          {categories
            .filter(category => !category.parent)
            .sort((a, b) => a.order - b.order)
            .map(category => renderCategoryItem(category))}
        </List>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newCategory.type}
                  label="Type"
                  onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
                >
                  <MenuItem value="product">Product</MenuItem>
                  <MenuItem value="blog">Blog</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                fullWidth
                multiline
                rows={2}
              />
              <FormControl fullWidth>
                <InputLabel>Parent Category</InputLabel>
                <Select
                  value={newCategory.parent}
                  label="Parent Category"
                  onChange={(e) => setNewCategory({ ...newCategory, parent: e.target.value })}
                >
                  <MenuItem value="">None</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Order"
                type="number"
                value={newCategory.order}
                onChange={(e) => setNewCategory({ ...newCategory, order: parseInt(e.target.value) })}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddCategory}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
} 