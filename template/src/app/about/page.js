'use client';

import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
}));

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        About MongoNext
      </Typography>
      
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          MongoNext was created to provide developers with a modern, production-ready foundation for building web applications. 
          We believe in the power of Next.js, Material UI, and MongoDB Atlas to create exceptional digital experiences.
        </Typography>
      </StyledPaper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Why Choose MongoNext?
            </Typography>
            <Typography variant="body1" paragraph>
              • Modern tech stack with Next.js 13+ and App Router
            </Typography>
            <Typography variant="body1" paragraph>
              • Beautiful UI with Material UI components
            </Typography>
            <Typography variant="body1" paragraph>
              • Scalable database with MongoDB Atlas
            </Typography>
            <Typography variant="body1" paragraph>
              • Built-in authentication and security
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Our Values
            </Typography>
            <Typography variant="body1" paragraph>
              • Open Source: We believe in the power of community and collaboration
            </Typography>
            <Typography variant="body1" paragraph>
              • Quality: We maintain high standards for code and documentation
            </Typography>
            <Typography variant="body1" paragraph>
              • Innovation: We continuously improve and adapt to new technologies
            </Typography>
            <Typography variant="body1" paragraph>
              • Support: We provide comprehensive documentation and community support
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>

      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Join Our Community
        </Typography>
        <Typography variant="body1" paragraph>
          We're building a community of developers who share our passion for creating great web applications. 
          Whether you're a beginner or an experienced developer, there's a place for you in the MongoNext community.
        </Typography>
        <Typography variant="body1">
          Get started by checking out our GitHub repository, joining our discussions, or contributing to the project.
        </Typography>
      </StyledPaper>
    </Container>
  );
} 