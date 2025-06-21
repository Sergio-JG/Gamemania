import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, TextField, Modal, Typography, Grid, MenuItem, } from '@mui/material';
import { Game, Genre, Platform } from '../interfaces/GameInterface';
import axios from 'axios';

type OpenGameFormProps = {
    open: boolean;
    onClose: () => void;
};

const CreateGameForm = ({ open, onClose }: OpenGameFormProps) => {

    const API_URL = 'http://localhost:8080/game';

    const API_URL_GENRES = 'http://localhost:8080/genre';
    const [genres, setGenres] = useState<Genre[]>([]);

    const API_URL_PLATFORMS = 'http://localhost:8080/platform';
    const [platforms, setPlatforms] = useState<Platform[]>([]);

    // const [errors, setErrors] = React.useState({
    //     title: '',
    //     price: 0,
    //     description: '',
    //     releaseDate: '',
    //     stock: 0,
    //     genres: [],
    //     platforms: [],
    // });

    const [formData, setFormData] = useState<Game>({
        title: '',
        price: 0,
        description: '',
        releaseDate: '',
        stock: 0,
        genres: [],
        numberOfSales: 0,
        platforms: [],
    });

    useEffect(() => {

        const fetchGenres = async () => {
            try {
                const response = await axios.get(API_URL_GENRES);
                setGenres(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchPlatforms = async () => {
            try {
                const response = await axios.get(API_URL_PLATFORMS);
                setPlatforms(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGenres();
        fetchPlatforms();
        setFormData({ title: '', price: 0, description: '', releaseDate: '', stock: 0, numberOfSales: 0, genres: [], platforms: [], });

    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleGenresChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatedFormData = (formData: any) => {
        const formDataCopy = { ...formData };

        formDataCopy.genres = formData.genres.map((genreId: string) => {
            return genres.find((genre) => genre.genreId === genreId);
        });
        formDataCopy.platforms = formData.platforms.map((platformId: string) => {
            return platforms.find((platform) => platform.platformId === platformId);
        });

        return formDataCopy;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const formattedData = formatedFormData(formData);
        console.log(formattedData)

        try {
            const response = await axios.post(API_URL, formattedData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid component="form" onSubmit={handleSubmit} noValidate sx={{ border: 'solid', bgcolor: 'white' }}>
                <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                    <Typography variant='h3' sx={{ padding: 3 }}> Añadir juego nuevo </Typography>
                    <Typography> Titulo </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="title"
                        fullWidth
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Typography> Precio </Typography>
                    <TextField
                        type='number'
                        margin="normal"
                        required
                        id="price"
                        fullWidth
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Typography> Descripcion </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="description"
                        fullWidth
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Typography> Fecha de lanzamiento </Typography>
                    <TextField
                        type='date'
                        margin="normal"
                        required
                        id="releaseDate"
                        fullWidth
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Typography> Stock </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="stock"
                        fullWidth
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Typography> Género </Typography>
                    <TextField
                        select
                        margin="normal"
                        required
                        id="genres"
                        fullWidth
                        name="genres"
                        value={formData.genres}
                        onChange={handleGenresChange}
                        SelectProps={{
                            multiple: true,
                        }}
                        sx={{ bgcolor: 'white', width: 400 }}
                    >
                        {genres.map((genre) => (
                            <MenuItem key={genre.genreId} value={genre.genreId}>{genre.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Typography> Plataformas </Typography>
                    <TextField
                        select
                        margin="normal"
                        required
                        id="platforms"
                        fullWidth
                        name="platforms"
                        value={formData.platforms}
                        onChange={handleChange}
                        SelectProps={{
                            multiple: true,
                        }}
                        sx={{ bgcolor: 'white', width: 400 }}
                    >
                        {platforms.map((platform) => (
                            <MenuItem key={platform.platformId} value={platform.platformId}>
                                {platform.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Grid justifyContent={'space-evenly'} paddingTop={2}>
                        <Button color='success' type="submit" variant="contained" sx={{ mx: 5 }}> Añadir </Button>
                        <Button color='error' onClick={onClose} variant="contained" sx={{ mx: 5 }}> Cancelar </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal >
    );
};

export default CreateGameForm;

