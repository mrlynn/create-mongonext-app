'use client';

import { Container, Typography, Box, Paper, Grid, Button, Link, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
}));

const RoleCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const openPositions = [
  {
    title: 'Documentation Contributor',
    icon: <DescriptionIcon sx={{ fontSize: 40, mb: 2 }} />,
    description: 'Help us create comprehensive documentation for MongoNext. This role involves writing clear, concise documentation, creating tutorials, and improving existing docs.',
    responsibilities: [
      'Write and maintain documentation',
      'Create tutorials and guides',
      'Review and improve existing docs',
      'Help with technical writing',
    ],
    requirements: [
      'Strong technical writing skills',
      'Understanding of Next.js and MongoDB',
      'Experience with documentation tools',
      'Good communication skills',
    ],
    tags: ['Documentation', 'Technical Writing', 'Next.js', 'MongoDB'],
  },
  {
    title: 'Core Developer',
    icon: <CodeIcon sx={{ fontSize: 40, mb: 2 }} />,
    description: 'Contribute to the core development of MongoNext. Work on features, bug fixes, and improvements to make the framework better for everyone.',
    responsibilities: [
      'Develop new features',
      'Fix bugs and issues',
      'Review pull requests',
      'Improve code quality',
    ],
    requirements: [
      'Strong JavaScript/React skills',
      'Experience with Next.js',
      'Knowledge of MongoDB',
      'Understanding of Material UI',
    ],
    tags: ['JavaScript', 'React', 'Next.js', 'MongoDB', 'Material UI'],
  },
  {
    title: 'Community Manager',
    icon: <GroupIcon sx={{ fontSize: 40, mb: 2 }} />,
    description: 'Help grow and manage the MongoNext community. Engage with users, organize events, and create content to help developers succeed.',
    responsibilities: [
      'Engage with community members',
      'Create educational content',
      'Organize community events',
      'Manage social media presence',
    ],
    requirements: [
      'Strong communication skills',
      'Experience with developer communities',
      'Content creation skills',
      'Social media management',
    ],
    tags: ['Community', 'Content Creation', 'Social Media', 'Events'],
  },
];

export default function CareersPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Join Our Open Source Journey
      </Typography>

      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Why Contribute to MongoNext?
        </Typography>
        <Typography variant="body1" paragraph>
          At MongoNext, we believe in the power of open source to transform developers' careers. 
          By contributing to our project, you'll not only help build a valuable tool for the community 
          but also gain real-world experience, build your portfolio, and connect with other developers.
        </Typography>
        <Typography variant="body1" paragraph>
          Whether you're looking to improve your skills, give back to the community, or build your 
          professional network, MongoNext offers opportunities for growth and learning.
        </Typography>
      </StyledPaper>

      <Grid container spacing={4}>
        {openPositions.map((position) => (
          <Grid item xs={12} md={6} key={position.title}>
            <RoleCard elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {position.icon}
                <Typography variant="h5" sx={{ ml: 2 }}>
                  {position.title}
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {position.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Responsibilities:
              </Typography>
              <ul>
                {position.responsibilities.map((item, index) => (
                  <li key={index}>
                    <Typography variant="body2">{item}</Typography>
                  </li>
                ))}
              </ul>
              <Typography variant="h6" gutterBottom>
                Requirements:
              </Typography>
              <ul>
                {position.requirements.map((item, index) => (
                  <li key={index}>
                    <Typography variant="body2">{item}</Typography>
                  </li>
                ))}
              </ul>
              <Box sx={{ mt: 2 }}>
                {position.tags.map((tag) => (
                  <StyledChip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
              <Button
                variant="contained"
                component={Link}
                href="/contact"
                sx={{ mt: 3 }}
              >
                Apply Now
              </Button>
            </RoleCard>
          </Grid>
        ))}
      </Grid>

      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Benefits of Contributing
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <SchoolIcon sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Skill Development
              </Typography>
              <Typography variant="body2">
                Work with modern technologies and best practices in a real-world project.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <GroupIcon sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Community
              </Typography>
              <Typography variant="body2">
                Join a supportive community of developers and build your professional network.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <CodeIcon sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Portfolio Building
              </Typography>
              <Typography variant="body2">
                Add meaningful contributions to your portfolio and GitHub profile.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          How to Get Started
        </Typography>
        <Typography variant="body1" paragraph>
          Ready to contribute? Here's how to get started:
        </Typography>
        <ol>
          <li>
            <Typography variant="body1">
              Check out our GitHub repository and explore the issues labeled "good first issue"
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Join our community discussions and introduce yourself
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Start small with documentation improvements or bug fixes
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Work your way up to more complex features and improvements
            </Typography>
          </li>
        </ol>
        <Button
          variant="contained"
          component={Link}
          href="https://github.com/mrlynn/create-mongonext-app"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 2 }}
        >
          View GitHub Repository
        </Button>
      </StyledPaper>
    </Container>
  );
} 