import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Typography, useTheme } from '@mui/material';

import logo from '../images/logo.png';
import ImagenLogin from '../images/loginimage.jpg';

const RegisterComponent: React.FC = () => {

  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: "User",
  });

  const [errors, setErrors] = React.useState({
    passwordError: '',
    emailError: '',
    firstName: '',
    lastName: '',
    generalError: '',
  });

  const validate = async () => {

    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setErrors((prevErrors) => ({ ...prevErrors, generalError: 'Todos los campos son obligatorios' }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, generalError: '' }));
    }
    if (!emailRegex.test(formData.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: 'Formato de email no valido' }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: '' }));
    }
    if (formData.password.length < 6) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordError: 'La contraseña debe de contener por lo menos 6 caracters' }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, passwordError: '' }));
    }
    // ...

    try {
      const response = await axios.get(`http://localhost:8080/userByEmail/${formData.email}`);
      if (response.status === 200) {
        setErrors((prevErrors) => ({ ...prevErrors, emailError: 'Este email ya se encuentra registrado' }));
        isValid = false;
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, emailError: '' }));
        isValid = true;
      }
    } catch (error) {

    }

    return isValid;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validate()) {
      try {
        const response = await fetch('http://localhost:8080/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          navigate('/login')
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1B1A17' }}>
        <Grid container component="form" onSubmit={handleRegister} noValidate sx={{ padding: 20, justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Link to={`/`}>
            <img
              src={logo}
              alt="Logo"
            />
          </Link>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ color: theme.palette.primary.main }}> Email </Typography>
            <TextField
              variant='filled'
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ bgcolor: 'white' }}
            />
            {errors.emailError && <Typography variant="caption" color="error">{errors.emailError}</Typography>}
            <Typography variant="body1" sx={{ color: theme.palette.primary.main }}> Contraseña: </Typography>
            <TextField
              variant='filled'
              margin="normal"
              required
              fullWidth
              id="password"
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ bgcolor: 'white' }}
            />
            {errors.passwordError && <Typography variant="caption" color="error">{errors.passwordError}</Typography>}
            <Typography variant="body1" sx={{ color: theme.palette.primary.main }}> Nombre: </Typography>
            <TextField
              variant='filled'
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Nombre"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              sx={{ bgcolor: 'white' }}
            />
            {errors.firstName && <Typography variant="caption" color="error">{errors.firstName}</Typography>}
            <Typography variant="body1" sx={{ color: theme.palette.primary.main }}> Apellido: </Typography>
            <TextField
              variant='filled'
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Apellido"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              sx={{ bgcolor: 'white' }}
            />
            {errors.lastName && <Typography variant="caption" color="error">{errors.lastName}</Typography>}
            <Button type="submit" variant="contained" fullWidth> Confirmar registro </Button>
            {errors.generalError && <Typography variant="caption" color="error">{errors.generalError}</Typography>}
            <Grid container sx={{ paddingTop: 2 }}>
              <Grid item xs>
                <Link to='/login' style={{ color: 'white' }}>
                  {"Ya tengo una cuenta"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={7}
        sx={{
          backgroundImage: `url(${ImagenLogin})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
};

export default RegisterComponent;
