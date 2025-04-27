'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

export default function MoviesAdmin() {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    runtime: '',
    genres: [],
    plot: '',
    poster: ''
  });

  useEffect(() => {
    loadMovies();
  }, [page, rowsPerPage]);

  const loadMovies = async () => {
    try {
      const res = await fetch(`/api/sample-movies?limit=${rowsPerPage}&skip=${page * rowsPerPage}`);
      const data = await res.json();
      setMovies(data.movies);
      setTotal(data.total);
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (movie = null) => {
    if (movie) {
      setSelectedMovie(movie);
      setFormData({
        title: movie.title,
        year: movie.year,
        runtime: movie.runtime,
        genres: movie.genres || [],
        plot: movie.plot,
        poster: movie.poster
      });
    } else {
      setSelectedMovie(null);
      setFormData({
        title: '',
        year: '',
        runtime: '',
        genres: [],
        plot: '',
        poster: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMovie(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedMovie) {
        await fetch('/api/sample-movies', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: selectedMovie._id, ...formData }),
        });
      } else {
        await fetch('/api/sample-movies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      handleCloseDialog();
      loadMovies();
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await fetch(`/api/sample-movies?id=${id}`, { method: 'DELETE' });
        loadMovies();
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Movies Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Movie
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Poster</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Runtime</TableCell>
                <TableCell>Genres</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => (
                <TableRow key={movie._id}>
                  <TableCell>
                    {movie.poster && (
                      <img 
                        src={movie.poster} 
                        alt={movie.title} 
                        style={{ width: 50, height: 75, objectFit: 'cover' }} 
                      />
                    )}
                  </TableCell>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{movie.year}</TableCell>
                  <TableCell>{movie.runtime} min</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {movie.genres?.map((genre, index) => (
                        <Chip key={index} label={genre} size="small" />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleOpenDialog(movie)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(movie._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedMovie ? 'Edit Movie' : 'Add Movie'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                fullWidth
              />
              <TextField
                label="Year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
                fullWidth
              />
              <TextField
                label="Runtime (minutes)"
                type="number"
                value={formData.runtime}
                onChange={(e) => setFormData({ ...formData, runtime: e.target.value })}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Genres</InputLabel>
                <Select
                  multiple
                  value={formData.genres}
                  onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'].map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Plot"
                value={formData.plot}
                onChange={(e) => setFormData({ ...formData, plot: e.target.value })}
                multiline
                rows={4}
                fullWidth
              />
              <TextField
                label="Poster URL"
                value={formData.poster}
                onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedMovie ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
} 