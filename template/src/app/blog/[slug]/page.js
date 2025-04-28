'use client';

import { Container, Typography, Box, Chip, Avatar, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';

export default function BlogPostPage({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog?slug=${params.slug}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center">
          Blog post not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        {post.featuredImage && (
          <Box sx={{ mb: 4, position: 'relative', height: 400 }}>
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        )}
        
        <Typography variant="h2" component="h1" gutterBottom>
          {post.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={post.author?.image}
            alt={post.author?.name}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1">
              {post.author?.name || 'Anonymous'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Draft'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          {post.categories?.map((category) => (
            <Chip
              key={category._id}
              label={category.name}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>

        <Box sx={{ typography: 'body1' }}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Box>
      </Box>
    </Container>
  );
} 