'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  Box,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  AccountCircle, 
  ShoppingCart, 
  AdminPanelSettings,
  Movie as MovieIcon,
  Logout
} from '@mui/icons-material';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            MovieFlix
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {session ? (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </MenuItem>
                {isAdmin && (
                  <>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <AdminPanelSettings fontSize="small" />
                      </ListItemIcon>
                      <Link href="/admin/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Products
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <MovieIcon fontSize="small" />
                      </ListItemIcon>
                      <Link href="/admin/movies" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Movies
                      </Link>
                    </MenuItem>
                  </>
                )}
                <Divider />
                <MenuItem onClick={() => {
                  handleClose();
                  signOut();
                }}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} href="/auth/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 