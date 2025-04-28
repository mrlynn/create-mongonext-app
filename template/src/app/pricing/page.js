'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Fade,
  Zoom
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BusinessIcon from '@mui/icons-material/Business';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme, featured }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
  ...(featured && {
    border: `2px solid ${theme.palette.primary.main}`,
    '&::before': {
      content: '"Most Popular"',
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      padding: '4px 12px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      borderBottomLeftRadius: '8px',
    },
  }),
}));

const pricingTiers = [
  {
    name: 'Starter',
    price: {
      monthly: 9,
      yearly: 90,
    },
    description: 'Perfect for individuals and small projects',
    features: [
      'Up to 5 projects',
      'Basic analytics',
      'Email support',
      '1GB storage',
      'Basic templates',
    ],
    icon: <RocketLaunchIcon />,
  },
  {
    name: 'Professional',
    price: {
      monthly: 29,
      yearly: 290,
    },
    description: 'Ideal for growing businesses',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      '10GB storage',
      'All templates',
      'Custom branding',
      'API access',
    ],
    featured: true,
    icon: <StarIcon />,
  },
  {
    name: 'Enterprise',
    price: {
      monthly: 99,
      yearly: 990,
    },
    description: 'For large organizations',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'Unlimited storage',
      'SLA guarantee',
      'Advanced security',
      'Team management',
      'Custom development',
    ],
    icon: <BusinessIcon />,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleBillingCycleChange = (event, newBillingCycle) => {
    if (newBillingCycle !== null) {
      setBillingCycle(newBillingCycle);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom>
          Simple, Transparent Pricing
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Choose the perfect plan for your needs
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <ToggleButtonGroup
            value={billingCycle}
            exclusive
            onChange={handleBillingCycleChange}
            aria-label="billing cycle"
            sx={{ mb: 4 }}
          >
            <ToggleButton value="monthly">Monthly</ToggleButton>
            <ToggleButton value="yearly">Yearly (Save 20%)</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {pricingTiers.map((tier, index) => (
          <Grid item xs={12} md={4} key={tier.name}>
            <Fade in timeout={500 + index * 200}>
              <StyledCard featured={tier.featured}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {tier.icon}
                    <Typography variant="h5" component="h2" sx={{ ml: 1 }}>
                      {tier.name}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h3" component="div" sx={{ mb: 2 }}>
                    ${tier.price[billingCycle]}
                    <Typography component="span" variant="h6" color="text.secondary">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </Typography>
                  </Typography>
                  
                  <Typography color="text.secondary" paragraph>
                    {tier.description}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List>
                    {tier.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} disableGutters>
                        <ListItemIcon>
                          <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                
                <CardActions sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant={tier.featured ? 'contained' : 'outlined'}
                    size="large"
                    sx={{ py: 1.5 }}
                  >
                    Get Started
                  </Button>
                </CardActions>
              </StyledCard>
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Need a custom solution?
        </Typography>
        <Typography color="text.secondary" paragraph>
          Contact our sales team for a tailored plan that fits your specific needs.
        </Typography>
        <Button variant="outlined" size="large" sx={{ mt: 2 }}>
          Contact Sales
        </Button>
      </Box>
    </Container>
  );
} 