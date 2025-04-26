import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function TermsPage() {
  return (
    <>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          Terms of Service
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography variant="body1" paragraph>
            Welcome to MongoNext! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
          </Typography>
          <Typography variant="h6" gutterBottom>1. Acceptance of Terms</Typography>
          <Typography variant="body1" paragraph>
            By using our services, you agree to comply with and be legally bound by these Terms. If you do not agree to these Terms, please do not use our services.
          </Typography>
          <Typography variant="h6" gutterBottom>2. Changes to Terms</Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to modify these Terms at any time. We will provide notice of any changes by updating the date at the top of these Terms.
          </Typography>
          <Typography variant="h6" gutterBottom>3. User Responsibilities</Typography>
          <Typography variant="body1" paragraph>
            You are responsible for your use of the services and for any content you provide. You agree not to misuse the services or help anyone else do so.
          </Typography>
          <Typography variant="h6" gutterBottom>4. Contact Us</Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about these Terms, please contact us at support@mongonext.com.
          </Typography>
        </Box>
      </Container>
    </>
  );
} 