'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Alert
} from '@mui/material';

export default function ProductsCatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">Loading...</Box>;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={4}>Product Catalog</Typography>
      {products.length === 0 ? (
        <Alert severity="info">No products found in the catalog.</Alert>
      ) : (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="180"
                    image={product.image || 'https://placehold.co/600x400?text=No+Image'}
                    alt={product.name}
                    sx={{ objectFit: 'cover', bgcolor: '#fafafa' }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {product.category?.name || 'Uncategorized'}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" fontWeight={700}>
                      ${product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
} 