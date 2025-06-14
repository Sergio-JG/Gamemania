import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { IconButton, List, ListItem, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faInstagram, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const footerStyles = {
  background: 'black',
  color: 'white',
  padding: 10,
};

const Footer = () => {
  return (
    <AppBar position="sticky" style={footerStyles}>
      <Toolbar sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid item xs={4} marginInlineStart={10}>
          <IconButton style={{ color: 'white' }}>
            <FontAwesomeIcon icon={faDiscord} style={{ paddingInlineEnd: 15 }} />
          </IconButton>
          <IconButton style={{ color: 'white' }}>
            <FontAwesomeIcon icon={faInstagram} style={{ paddingInlineEnd: 15 }} />
          </IconButton>
          <IconButton style={{ color: 'white' }}>
            <FontAwesomeIcon icon={faYoutube} style={{ paddingInlineEnd: 15 }} />
          </IconButton>
          <IconButton style={{ color: 'white' }}>
            <FontAwesomeIcon icon={faXTwitter} style={{ paddingInlineEnd: 15 }} />
          </IconButton>
        </Grid>

        <Grid item xs={4} >
          <Typography> Copyright © 2023 Game Mania - Todos los derechos reservados </Typography>
        </Grid>

        <Grid item xs={4} marginInlineEnd={10} textAlign={"end"}>
          <List>
            <ListItem>
              <Typography variant="body1"> Terminos y condiciones </Typography>
            </ListItem >
            <ListItem>
              <Typography variant="body1"> Política de privacidad </Typography>
            </ListItem >
            <ListItem>
              <Typography variant="body1"> Contacto </Typography>
            </ListItem >
            <ListItem>
              <Typography variant="body1"> Preguntas frecuentes </Typography>
            </ListItem >
          </List>
        </Grid>
      </Toolbar>
    </AppBar >
  );
};

export default Footer;
