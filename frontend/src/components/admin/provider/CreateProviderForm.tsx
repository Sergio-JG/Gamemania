import React, { ChangeEvent, useState } from 'react';
import { Modal, TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { Provider } from '../../../interfaces/GameInterface';

type OpenProviderFormProps = {
    open: boolean;
    onClose: () => void;
};

const CreateProviderForm = ({ open, onClose }: OpenProviderFormProps) => {

    const [formData, setFormData] = useState<Provider>({
        name: '',
        address: '',
        phone: '',
        email: '',
        account: null,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(import.meta.env.VITE_API_URL + '/provider', formData);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid component="form" onSubmit={handleSubmit} noValidate sx={{ border: 'solid', bgcolor: 'white' }}>
                <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                    <Typography variant='h3' sx={{ padding: 3 }}> Añadir un nuevo proveedor </Typography>
                    <Typography> Nombre </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="name"
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Typography> Direccion </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="address"
                        fullWidth
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Typography> Teléfono </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="phone"
                        fullWidth
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Typography> Correo electrónico </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="email"
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Grid justifyContent={'space-evenly'} paddingTop={2}>
                        <Button color='success' type="submit" variant="contained" sx={{ mx: 5 }}> Añadir </Button>
                        <Button color='error' onClick={onClose} variant="contained" sx={{ mx: 5 }}> Cancelar </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal >
    );
};

export default CreateProviderForm;
