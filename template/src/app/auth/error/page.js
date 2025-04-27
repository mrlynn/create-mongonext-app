'use client';

import { useSearchParams } from 'next/navigation';
import { Alert, Container, Typography } from '@mui/material';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        <Typography variant="h6">Authentication Error</Typography>
        <Typography>{error || 'An error occurred during authentication'}</Typography>
      </Alert>
    </Container>
  );
} 