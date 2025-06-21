import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const footerStyles = {
  background: 'black',
  color: 'white',
};

const FooterAdmin = () => {
  return (
    <AppBar position="sticky" style={footerStyles}>
      <Toolbar sx={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid>
          <Typography> Copyright © 2023 Game Mania - Todos los derechos reservados </Typography>
        </Grid>

      </Toolbar>
    </AppBar >
  );
};

export default FooterAdmin;
