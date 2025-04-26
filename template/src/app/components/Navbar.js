'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { AppBar, Toolbar, Button, IconButton, Box, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    signOut({ callbackUrl: '/' });
  };

  return (
    <AppBar position="static" elevation={1} color="primary">
      <Toolbar>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Image
            src="/images/logo-circle-black-on-white.png"
            alt="MongoNext Logo"
            width={36}
            height={36}
            style={{ marginRight: 12 }}
          />
          <Typography variant="h6" component="div">
            MongoNext
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/products" style={{ textDecoration: 'none', color: 'inherit', mx: 1 }}>
            <Button color="inherit">Products</Button>
          </Link>
          <Link href="/pricing" style={{ textDecoration: 'none', color: 'inherit', mx: 1 }}>
            <Button color="inherit">Pricing</Button>
          </Link>
          <Link href="/blog" style={{ textDecoration: 'none', color: 'inherit', mx: 1 }}>
            <Button color="inherit">Blog</Button>
          </Link>

          {!loading && !session ? (
            <>
              <Link href="/auth/signin" style={{ textDecoration: 'none', color: 'inherit', mx: 1 }}>
                <Button color="inherit">Sign In</Button>
              </Link>
              <Link href="/auth/register" style={{ textDecoration: 'none', color: 'inherit', mx: 1 }}>
                <Button color="inherit" variant="outlined">
                  Register
                </Button>
              </Link>
            </>
          ) : null}

          {!loading && session ? (
            <>
              <Link href="/dashboard" style={{ textDecoration: 'none', color: 'inherit', mx: 1 }}>
                <Button color="inherit">Dashboard</Button>
              </Link>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
                aria-label="account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {session.user?.name ? session.user.name[0] : 'U'}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>{session.user?.email}</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </Menu>
            </>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 