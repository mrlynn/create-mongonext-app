import { Card, CardContent, CardMedia, Typography, Box, Chip, Link } from '@mui/material';
import { format } from 'date-fns';
import NextLink from 'next/link';

function stripHtml(html) {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

export default function BlogPostCard({ post }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {post.featuredImage && (
        <CardMedia
          component="img"
          height="200"
          image={post.featuredImage}
          alt={post.title}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 2 }}>
          {post.categories?.map((category) => (
            <Chip
              key={category._id}
              label={category.name}
              size="small"
              sx={{ mr: 1 }}
            />
          ))}
        </Box>
        <Typography gutterBottom variant="h5" component="h2">
          <Link
            component={NextLink}
            href={`/blog/${post.slug}`}
            color="inherit"
            underline="none"
          >
            {post.title}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {stripHtml(post.excerpt || post.content).substring(0, 150) + '...'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Draft'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {post.author?.name || 'Anonymous'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
} 