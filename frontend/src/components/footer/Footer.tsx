import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { IconButton, List, ListItem, Typography, Box } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faInstagram, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const footerStyles = {
  background: 'black',
  color: 'white',
  padding: 10,
};

const Footer = () => {
  return (
    <AppBar position="static" style={footerStyles} component="footer">
      <Toolbar
        sx={{
          minHeight: { xs: 120, md: 200 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 1, md: 10 },
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
              mb: { xs: 2, md: 0 },
            }}
          >
            <Box>
              <IconButton style={{ color: 'white' }}>
                <FontAwesomeIcon icon={faDiscord} style={{ paddingInlineEnd: 10 }} />
              </IconButton>
              <IconButton style={{ color: 'white' }}>
                <FontAwesomeIcon icon={faInstagram} style={{ paddingInlineEnd: 10 }} />
              </IconButton>
              <IconButton style={{ color: 'white' }}>
                <FontAwesomeIcon icon={faYoutube} style={{ paddingInlineEnd: 10 }} />
              </IconButton>
              <IconButton style={{ color: 'white' }}>
                <FontAwesomeIcon icon={faXTwitter} style={{ paddingInlineEnd: 0 }} />
              </IconButton>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: { xs: 2, md: 0 },
              textAlign: 'center',
            }}
          >
            <Typography variant="body2">
              Copyright © 2023 Game Mania - Todos los derechos reservados
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              textAlign: { xs: 'center', md: 'end' },
            }}
          >
            <List sx={{ display: 'inline-block', p: 0 }}>
              <ListItem sx={{ display: 'inline', p: 0, mx: 1 }}>
                <Typography variant="body2">Términos y condiciones</Typography>
              </ListItem>
              <ListItem sx={{ display: 'inline', p: 0, mx: 1 }}>
                <Typography variant="body2">Política de privacidad</Typography>
              </ListItem>
              <ListItem sx={{ display: 'inline', p: 0, mx: 1 }}>
                <Typography variant="body2">Contacto</Typography>
              </ListItem>
              <ListItem sx={{ display: 'inline', p: 0, mx: 1 }}>
                <Typography variant="body2">Preguntas frecuentes</Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
