import { Box, Typography, Button, Grid, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import StorageIcon from '@mui/icons-material/Storage';
import PaletteIcon from '@mui/icons-material/Palette';
import LockIcon from '@mui/icons-material/Lock';
import ApiIcon from '@mui/icons-material/Api';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const features = [
  {
    icon: <StorageIcon color="primary" />, title: 'MongoDB Atlas Integration',
    desc: 'Connect instantly to MongoDB Atlas with Mongoose. Production-ready, scalable, and secure.'
  },
  {
    icon: <PaletteIcon color="primary" />, title: 'Material UI Theming',
    desc: 'Modern, customizable UI with full dark/light mode support and easy branding.'
  },
  {
    icon: <LockIcon color="primary" />, title: 'NextAuth.js Authentication',
    desc: 'Secure authentication with providers, sessions, and protected routes out of the box.'
  },
  {
    icon: <ApiIcon color="primary" />, title: 'API Routes & Models',
    desc: 'Easily add new data models and RESTful API endpoints with our CLI generator.'
  },
  {
    icon: <Brightness4Icon color="primary" />, title: 'Dark/Light Mode',
    desc: 'Switch themes instantly. All components and docs are theme-aware.'
  }
];

export default function HomePage() {
  return (
    <Box>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 4,
        }}
      >
        <Image
          src="/images/logo-circle-white-on-black.png"
          alt="MongoNext Logo"
          width={200}
          height={200}
          priority
          style={{ borderRadius: '50%', background: 'black' }}
        />
        <Typography variant="h2" component="h1" gutterBottom>
          MongoNext
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          The modern Next.js + MongoDB Atlas starter template with Material UI and NextAuth.js and built-in features such as a RAG chatbot right out of the box.
        </Typography>
        <Button
          component={Link}
          href="https://docs.mongonext.com"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Get Started
        </Button>
      </Box>
      <Box sx={{ mt: 8, mb: 8, px: { xs: 1, sm: 2, md: 4 } }}>
        <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 4, p: { xs: 2, sm: 4 }, bgcolor: 'background.paper' }}>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }} elevation={3}>
                  <CardHeader
                    avatar={<Avatar sx={{ bgcolor: 'background.paper', color: 'primary.main', width: 48, height: 48 }}>{feature.icon}</Avatar>}
                    title={<Typography variant="h6">{feature.title}</Typography>}
                    sx={{ textAlign: 'center', pb: 0 }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography color="text.secondary">{feature.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
} 