import axios from 'axios';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Typography, useTheme, Button } from '@mui/material';

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
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setErrors((prevErrors) => ({ ...prevErrors, emailError: '' }));
      } else {
        console.error('Error checking email:', error);
        setErrors((prevErrors) => ({ ...prevErrors, generalError: 'Error al verificar el email' }));
        isValid = false;
      }
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
        const response = await fetch(import.meta.env.VITE_API_URL + '/user/register', {
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
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#1B1A17] py-8 px-4 md:px-12">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md space-y-4"
          noValidate
        >
          <Link to={`/`} className="flex justify-center mb-4">
            <img src={logo} alt="Logo" className="h-16" />
          </Link>
          <div>
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
              InputProps={{ className: 'bg-white rounded' }}
            />
            {errors.emailError && <Typography variant="caption" color="error">{errors.emailError}</Typography>}
          </div>
          <div>
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
              InputProps={{ className: 'bg-white rounded' }}
            />
            {errors.passwordError && <Typography variant="caption" color="error">{errors.passwordError}</Typography>}
          </div>
          <div>
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
              InputProps={{ className: 'bg-white rounded' }}
            />
            {errors.firstName && <Typography variant="caption" color="error">{errors.firstName}</Typography>}
          </div>
          <div>
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
              InputProps={{ className: 'bg-white rounded' }}
            />
            {errors.lastName && <Typography variant="caption" color="error">{errors.lastName}</Typography>}
          </div>
          <Button type="submit" variant="contained" fullWidth className="!mt-4"> Confirmar registro </Button>
          {errors.generalError && <Typography variant="caption" color="error">{errors.generalError}</Typography>}
          <div className="flex justify-end pt-2">
            <Link to='/login' className="text-white underline">
              {"Ya tengo una cuenta"}
            </Link>
          </div>
        </form>
      </div>
      {/* Right Side - Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${ImagenLogin})` }}
      />
    </div>
  );
};

export default RegisterComponent;
