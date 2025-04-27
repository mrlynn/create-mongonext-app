'use client';

import { Container, Typography, Box, Paper, Grid, Avatar, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
}));

const TeamMemberCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const SocialLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const teamMembers = [
  {
    name: 'Michael Lynn',
    role: 'Founder & Lead Developer',
    avatar: '/team/michael.jpg',
    bio: 'Full-stack developer with a passion for creating modern web applications.',
    social: {
      github: 'https://github.com/merlynn',
      twitter: 'https://twitter.com/merlynn',
      linkedin: 'https://linkedin.com/in/merlynn',
    },
  },
  // Add more team members as needed
];

export default function TeamPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Our Team
      </Typography>

      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Meet the People Behind MongoNext
        </Typography>
        <Typography variant="body1" paragraph>
          We're a diverse team of developers, designers, and open source enthusiasts 
          working together to build the best possible tools for the web development community.
        </Typography>
      </StyledPaper>

      <Grid container spacing={4}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.name}>
            <TeamMemberCard elevation={3}>
              <Avatar
                src={member.avatar}
                alt={member.name}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                {member.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {member.role}
              </Typography>
              <Typography variant="body2" paragraph>
                {member.bio}
              </Typography>
              <Box>
                <SocialLink href={member.social.github} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                </SocialLink>
                <SocialLink href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                  <TwitterIcon />
                </SocialLink>
                <SocialLink href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon />
                </SocialLink>
              </Box>
            </TeamMemberCard>
          </Grid>
        ))}
      </Grid>

      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Join Our Team
        </Typography>
        <Typography variant="body1" paragraph>
          We're always looking for passionate developers to join our team. 
          If you're interested in contributing to MongoNext, check out our open positions 
          or reach out to us directly.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link href="/careers" variant="button">
            View Open Positions
          </Link>
        </Box>
      </StyledPaper>
    </Container>
  );
} 