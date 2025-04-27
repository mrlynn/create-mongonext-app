'use client';

import { Container, Typography, Box, Paper, Grid, Button, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import GroupIcon from '@mui/icons-material/Group';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

export default function OpenSourcePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Open Source
      </Typography>

      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Our Commitment to Open Source
        </Typography>
        <Typography variant="body1" paragraph>
          MongoNext is built on the principles of open source software. We believe in transparency, 
          collaboration, and community-driven development. Our code is freely available for anyone 
          to use, modify, and distribute.
        </Typography>
      </StyledPaper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <FeatureCard elevation={3}>
            <GitHubIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Contribute
            </Typography>
            <Typography variant="body1" paragraph>
              Help us improve MongoNext by contributing code, reporting issues, or suggesting features.
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              href="https://github.com/yourusername/mongonext"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
          </FeatureCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <FeatureCard elevation={3}>
            <CodeIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              License
            </Typography>
            <Typography variant="body1" paragraph>
              MongoNext is licensed under the MIT License, giving you the freedom to use it in any project.
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              href="/license"
            >
              View License
            </Button>
          </FeatureCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <FeatureCard elevation={3}>
            <GroupIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Community
            </Typography>
            <Typography variant="body1" paragraph>
              Join our growing community of developers, share your experiences, and help others.
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              href="/community"
            >
              Join Community
            </Button>
          </FeatureCard>
        </Grid>
      </Grid>

      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          How to Contribute
        </Typography>
        <Typography variant="body1" paragraph>
          1. Fork the repository
        </Typography>
        <Typography variant="body1" paragraph>
          2. Create your feature branch
        </Typography>
        <Typography variant="body1" paragraph>
          3. Commit your changes
        </Typography>
        <Typography variant="body1" paragraph>
          4. Push to the branch
        </Typography>
        <Typography variant="body1" paragraph>
          5. Create a Pull Request
        </Typography>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Code of Conduct
        </Typography>
        <Typography variant="body1" paragraph>
          We are committed to providing a friendly, safe, and welcoming environment for all. 
          Please read our Code of Conduct before participating in our community.
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          href="/code-of-conduct"
        >
          View Code of Conduct
        </Button>
      </StyledPaper>
    </Container>
  );
} 