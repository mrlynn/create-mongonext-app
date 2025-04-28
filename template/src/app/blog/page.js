'use client';

import { Container, Typography, Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import BlogPostCard from '@/app/components/BlogPostCard';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        // Filter to only show published posts
        const publishedPosts = data.filter(post => post.status === 'published');
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Blog
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" align="center" paragraph>
        Latest articles and updates
      </Typography>
      
      {posts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No blog posts available yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <BlogPostCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
} 