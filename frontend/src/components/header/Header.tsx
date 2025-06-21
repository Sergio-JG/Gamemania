import { AccountCircle, Face2, ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, IconButton, Menu, MenuItem, Toolbar, Grid, useMediaQuery, useTheme, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import { CartContext } from '../CartContext';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import SearchComponent from '../SearchComponent';

const HeaderComponent = () => {
  const { toggleCart, totalItemsInCart } = useContext(CartContext);
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    const storedIdLocal = localStorage.getItem('userId');
    const storedIdSession = sessionStorage.getItem('userId');
    if (storedIdLocal) {
      setUserId(storedIdLocal);
    } else if (storedIdSession) {
      setUserId(storedIdSession);
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOf = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUserId(undefined);
    navigate('/');
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="sticky"
      style={{
        background: 'black',
        color: 'white',
        padding: isMobile ? 4 : 10,
      }}
    >
      <Toolbar>
        <Grid container alignItems="center" spacing={isMobile ? 1 : 2}>
          <Grid item xs={isMobile ? 6 : 4} style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={`/`}>
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: isMobile ? '50px' : '100px',
                  marginRight: isMobile ? '4px' : '10px',
                  maxWidth: '100%',
                  width: 'auto',
                }}
              />
            </Link>
          </Grid>
          <Grid item xs={isMobile ? 12 : 4} style={{ display: isMobile ? 'none' : 'flex', justifyContent: 'center' }}>
            <SearchComponent />
          </Grid>
          <Grid item xs={isMobile ? 6 : 4}>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <IconButton style={{ color: 'yellow' }} onClick={toggleCart}>
                  <Badge badgeContent={totalItemsInCart} color="primary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </li>
              <li>
                {userId ? (
                  <>
                    <IconButton style={{ color: 'yellow' }} onClick={handleClick}>
                      <Face2 />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                      <MenuItem onClick={handleClose}>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                          Mi perfil
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleLogOf}>Cerrar sesion</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Link to={`/login`}>
                    <IconButton style={{ color: 'yellow' }}>
                      <AccountCircle />
                    </IconButton>
                  </Link>
                )}
              </li>
            </Box>
          </Grid>
          {isMobile && (
            <Grid item xs={12} style={{ marginTop: 8 }}>
              <SearchComponent />
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
