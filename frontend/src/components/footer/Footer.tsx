import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { IconButton, List, ListItem, Typography, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faInstagram, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState } from "react";
import TermsDialog from '../dialog/TermsDialog';
import PrivacyDialog from '../dialog/PrivacyDialog';
import ContactDialog from '../dialog/ContactDialog';
import FaqDialog from '../dialog/FaqDialog';

const Footer = () => {

  // Dialog state
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <AppBar position="static" component="footer">
      <Toolbar
        sx={{
          minHeight: { xs: 120, md: 200 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 1, md: 10 },
        }}
        className="!bg-black"
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
            <Typography variant="body2" className="text-gray-400">
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
            <List sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' }, p: 0 }}>
              <ListItem sx={{ display: 'block', p: 0, my: 0.5 }}>
                <button
                  className="text-white hover:underline font-semibold transition-colors duration-150 text-xs"
                  onClick={() => setTermsOpen(true)}
                >
                  Términos y condiciones
                </button>
              </ListItem>
              <ListItem sx={{ display: 'block', p: 0, my: 0.5 }}>
                <button
                  className="text-white hover:underline font-semibold transition-colors duration-150 text-xs"
                  onClick={() => setPrivacyOpen(true)}
                >
                  Política de privacidad
                </button>
              </ListItem>
              <ListItem sx={{ display: 'block', p: 0, my: 0.5 }}>
                <button
                  className="text-white hover:underline font-semibold transition-colors duration-150 text-xs"
                  onClick={() => setContactOpen(true)}
                >
                  Contacto
                </button>
              </ListItem>
              <ListItem sx={{ display: 'block', p: 0, my: 0.5 }}>
                <button
                  className="text-white hover:underline font-semibold transition-colors duration-150 text-xs"
                  onClick={() => setFaqOpen(true)}
                >
                  Preguntas frecuentes
                </button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Toolbar>
      {/* Dialogs */}
      <TermsDialog open={termsOpen} onClose={() => setTermsOpen(false)} />
      <PrivacyDialog open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
      <FaqDialog open={faqOpen} onClose={() => setFaqOpen(false)} />
    </AppBar>
  );
};

export default Footer;
