import { Box, Container, Grid, Typography, Link, TextField, Button, Divider, IconButton } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/X';
import PublicIcon from '@mui/icons-material/Public';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, borderTop: '1px solid #eee', mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={2}>
            <Box display="flex" alignItems="center" mb={2}>
              <Image src="/images/logo-circle-black-on-white.png" alt="MongoNext Logo" width={36} height={36} />
              <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>MongoNext</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              © {new Date().getFullYear()} MongoNext, Inc.
            </Typography>
            <Box mt={2}>
              <IconButton href="https://github.com/mrlynn/mongonext" target="_blank"><GitHubIcon /></IconButton>
              <IconButton href="https://x.com/mlynn" target="_blank"><TwitterIcon /></IconButton>
              <IconButton href="https://mongonext.com/" target="_blank"><PublicIcon /></IconButton>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>Resources</Typography>
            <Link href="https://docs.mongonext.com" color="inherit" underline="hover" display="block">Docs</Link>
            <Link href="/support" color="inherit" underline="hover" display="block">Support</Link>
            <Link href="/blog" color="inherit" underline="hover" display="block">Blog</Link>
            <Link href="/showcase" color="inherit" underline="hover" display="block">Showcase</Link>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>More</Typography>
            <Link href="https://mlynn.org" color="inherit" underline="hover" display="block">Michael Lynn</Link>
            <Link href="/github" color="inherit" underline="hover" display="block">GitHub</Link>
            <Link href="/releases" color="inherit" underline="hover" display="block">Releases</Link>
            <Link href="/governance" color="inherit" underline="hover" display="block">Governance</Link>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>About</Typography>
            <Link href="/about" color="inherit" underline="hover" display="block">About Us</Link>
            <Link href="/open-source" color="inherit" underline="hover" display="block">Open Source</Link>
            <Link href="/team" color="inherit" underline="hover" display="block">Team</Link>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>Legal</Typography>
            <Link href="/privacy" color="inherit" underline="hover" display="block">Privacy Policy</Link>
            <Link href="/terms" color="inherit" underline="hover" display="block">Terms of Service</Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>Subscribe to our newsletter</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Stay updated on new releases and features, guides, and case studies.
            </Typography>
            <Box component="form" display="flex" gap={1}>
              <TextField size="small" placeholder="you@domain.com" variant="outlined" sx={{ flex: 1 }} />
              <Button variant="outlined">Subscribe</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 