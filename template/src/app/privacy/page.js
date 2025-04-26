import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function PrivacyPage() {
  return (
    <>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          Privacy Policy
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography variant="body1" paragraph>
            Your privacy is important to us. This Privacy Policy explains how MongoNext collects, uses, and protects your information when you use our website and services.
          </Typography>
          <Typography variant="h6" gutterBottom>1. Information We Collect</Typography>
          <Typography variant="body1" paragraph>
            We may collect personal information such as your name, email address, and usage data when you interact with our services.
          </Typography>
          <Typography variant="h6" gutterBottom>2. How We Use Information</Typography>
          <Typography variant="body1" paragraph>
            We use your information to provide, maintain, and improve our services, communicate with you, and ensure security.
          </Typography>
          <Typography variant="h6" gutterBottom>3. Data Security</Typography>
          <Typography variant="body1" paragraph>
            We implement reasonable security measures to protect your information from unauthorized access, disclosure, or destruction.
          </Typography>
          <Typography variant="h6" gutterBottom>4. Contact Us</Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about this Privacy Policy, please contact us at privacy@mongonext.com.
          </Typography>
        </Box>
      </Container>
    </>
  );
} 