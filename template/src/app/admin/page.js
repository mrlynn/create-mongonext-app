'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Alert
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 42,
    categories: 8,
    users: 156,
    orders: 23
  });
  const router = useRouter();

  const activity = [
    {
      icon: <AddCircleIcon color="primary" />,
      text: 'New product added',
      time: '2 minutes ago',
    },
    {
      icon: <CheckCircleIcon color="success" />,
      text: 'Order completed',
      time: '15 minutes ago',
    },
    {
      icon: <PersonAddIcon color="secondary" />,
      text: 'New user registered',
      time: '1 hour ago',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Alert severity="info" variant="outlined" sx={{ mb: 3, maxWidth: 400, mx: 'auto', fontSize: 14, background: 'rgba(0,0,0,0.03)' }}>
        This dashboard is displaying static demo data.
      </Alert>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Admin Dashboard
      </Typography>
      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <ShoppingCartIcon />
                </Avatar>
                <Box>
                  <Typography color="textSecondary">Products</Typography>
                  <Typography variant="h5">{stats.products}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <CategoryIcon />
                </Avatar>
                <Box>
                  <Typography color="textSecondary">Categories</Typography>
                  <Typography variant="h5">{stats.categories}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography color="textSecondary">Users</Typography>
                  <Typography variant="h5">{stats.users}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <ReceiptIcon />
                </Avatar>
                <Box>
                  <Typography color="textSecondary">Orders</Typography>
                  <Typography variant="h5">{stats.orders}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Quick Actions & Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Quick Actions
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" startIcon={<ShoppingCartIcon />} onClick={() => router.push('/admin/products')}>
                  Manage Products
                </Button>
                <Button variant="contained" color="success" startIcon={<CategoryIcon />} onClick={() => router.push('/admin/categories')}>
                  Manage Categories
                </Button>
                <Button variant="contained" color="secondary" startIcon={<PeopleIcon />} onClick={() => router.push('/admin/users')}>
                  Manage Users
                </Button>
                <Button variant="contained" color="warning" startIcon={<ReceiptIcon />} onClick={() => router.push('/admin/orders')}>
                  Manage Orders
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {activity.map((item, idx) => (
                  <ListItem key={idx}>
                    <ListItemAvatar>
                      <Avatar>
                        {item.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.text} secondary={item.time} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
} 