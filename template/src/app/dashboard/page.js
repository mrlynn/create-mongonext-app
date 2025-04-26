'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Container, Box, Typography, Paper, Button } from '@mui/material';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to your Dashboard
          </Typography>
          <Typography variant="body1" paragraph>
            You are signed in as {session?.user?.email}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => router.push('/')}
          >
            Go to Home
          </Button>
        </Paper>
      </Box>
    </Container>
  );
} 