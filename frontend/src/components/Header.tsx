import { AccountCircle, Face2, ShoppingCart } from '@mui/icons-material/';
import { AppBar, Badge, IconButton, Menu, MenuItem, Toolbar } from '@mui/material/';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { CartContext } from '../components/CartContext';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import SearchComponent from './SearchComponent';

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

  return (
    <AppBar position="sticky" style={{
      background: 'black',
      color: 'white',
      padding: 10,
    }}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Link to={`/`}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: '100px', marginRight: '10px' }}
              />
            </Link>
          </Grid>
          <SearchComponent />
          <Grid item xs={4}>
            <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'right' }}>
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

                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                          Mi perfil
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleLogOf}>
                        Cerrar sesion
                      </MenuItem>
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
            </ul>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
