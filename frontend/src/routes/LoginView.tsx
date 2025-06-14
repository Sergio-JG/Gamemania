import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import logo from '../images/logo.png';
import ImagenLogin from '../images/loginimage.jpg';
import { Typography, useTheme } from '@mui/material';
import { useState } from 'react';

const LoginView: React.FC = () => {

  const theme = useTheme();

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
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

    if (!formData.email || !formData.password) {
      setErrors((prevErrors) => ({ ...prevErrors, generalError: 'Todos los campos son obligatorios' }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, generalError: '' }));
    }
    return isValid;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validate()) {
      try {
        const response = await fetch('http://localhost:8080/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {

          const data = await response.json();

          if (rememberMe) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('role', data.role);
          } else {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('userId', data.userId);
            sessionStorage.setItem('role', data.role);
          }

          if (data.role === 'Admin')
            navigate("/dashboard/user");
          else {
            navigate("/");
          }

        } else {
          setErrors((prevErrors) => ({ ...prevErrors, generalError: 'Credenciales incorrectas' }));
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1B1A17' }}>
        <Grid container component="form" onSubmit={handleLogin} noValidate sx={{ padding: 20, justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Link to={`/`}>
            <img
              src={logo}
              alt="Logo"
            />
          </Link>
          <TextField
            variant='filled'
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ bgcolor: 'white' }}
          />
          {errors.emailError && <Typography variant="caption" color="error">{errors.emailError}</Typography>}
          <TextField
            variant='filled'
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ bgcolor: 'white' }}
          />
          {errors.passwordError && <Typography variant="caption" color="error">{errors.passwordError}</Typography>}
          <Grid container sx={{ justifyContent: 'left' }}>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} value="remember" color="primary" sx={{ color: theme.palette.primary.main }} />}
              label="Remember me"
              sx={{ color: theme.palette.primary.main }}
            />
          </Grid>
          <Grid container sx={{ justifyContent: 'left' }}>
            {errors.generalError && <Typography variant="caption" color="error">{errors.generalError}</Typography>}
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Iniciar sesión </Button>
          <Grid container sx={{ paddingTop: 2 }}>
            <Grid item xs>
              <Link to='/register' style={{ color: 'white' }}>
                {"¿No tienes una cuenta?"}
              </Link>
            </Grid>
            <Grid item >
              <Link to='/register' style={{ color: 'white' }}>
                {"¿Has olvidado la contraseña?"}
              </Link>
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

    </Grid >
  );

};

export default LoginView;

