import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Rating, Grid, Pagination, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { Game, Genre, Platform, Provider, Review } from '../../interfaces/GameInterface';
import HeaderAdmin from '../../components/HeaderAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import CreateGameForm from '../../components/CreateGameForm';
import DescriptionDialog from '../../components/DescriptionDialog';
import axios from 'axios';

const API_URL = 'http://localhost:8080/game';
const API_URL_PROVIDERS = 'http://localhost:8080/provider';
const API_URL_PURCHASE = 'http://localhost:8080/purchase';

const GameManage: React.FC = () => {

    const fetchGames = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }
            const gameData = await response.json();
            setGames(gameData);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    const fetchProviders = async () => {
        try {
            const response = await fetch(API_URL_PROVIDERS);
            if (!response.ok) {
                throw new Error('Failed to fetch proveedores');
            }
            const providersData = await response.json();
            setProviders(providersData);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    useEffect(() => { fetchGames(); fetchProviders(); }, []);

    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

    const [selectedDescription, setSelectedDescription] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [quantityBought, setQuantityBought] = useState(1);

    const [openChangePriceDialog, setOpenChangePriceDialog] = useState(false);
    const [price, setPrice] = useState(0);

    {/* COMPRA */ }
    const handleOpenDialog = (game: Game) => {
        setSelectedGame(game);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedGame(null);
        setQuantityBought(0);
    };

    const handlePurchase = async () => {

        const purchaseData = {
            providerId: selectedProvider?.providerId || "",
            purchaseDate: new Date(),
            purchaseDetail: [
                {
                    gameId: selectedGame?.gameId || "",
                    quantity: quantityBought,
                    subtotal: selectedGame?.price !== undefined ? selectedGame.price * quantityBought : 0,
                },
            ],
        };

        const newStock = selectedGame?.stock ? selectedGame.stock + quantityBought : quantityBought;
        if (selectedGame) {
            selectedGame.stock = newStock as number;
        }

        try {
            const response = await fetch(`${API_URL}/${selectedGame?.gameId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedGame),
            });

            if (response.ok) {
                console.log("update")
            }

        } catch (error) {
            console.error('Error updating stock:', error);
        }

        try {
            const response = await fetch(API_URL_PURCHASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchaseData),
            });

            if (response.ok) {
                console.log("Purchase created successfully");
            } else {
                console.error("Failed to create purchase");
            }
        } catch (error) {
            console.error('Error creating purchase:', error);
        }

        handleCloseDialog();
    };

    {/* MODIFICAR PRECIO */ }

    const handleOpenPriceDialog = (game: Game) => {
        setSelectedGame(game);
        setOpenChangePriceDialog(true);
    };

    const handleClosePriceDialog = () => {
        fetchGames();
        setOpenChangePriceDialog(false);
        setSelectedGame(null);
        setPrice(0);

    };

    const handleChangePrice = async () => {

        if (selectedGame) {
            selectedGame.price = price;
        }

        try {
            const response = await fetch(`${API_URL}/${selectedGame?.gameId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedGame),
            });

            if (response.ok) {
                setOpenChangePriceDialog(false);
                alert("se ha modificado con exito el precio")
            }

        } catch (error) {
            console.error('Error updating stock:', error);
        }
    };

    {/* COMPRAR */ }

    function handleProviderChange(event: any): void {
        const { value } = event.target;
        const selectedProvider = providers.find((provider: Provider) => provider.providerId === value);
        setSelectedProvider(selectedProvider || null);
    }

    const handleFormOpen = () => {
        setOpen(true);
    };

    const handleFormClose = () => {
        setOpen(false);
        fetchGames();
    };

    {/* ELIMINACION */ }

    function handleElimination(game: Game): void {
        axios.delete(API_URL + "/" + game.gameId)
            .then(response => {
                alert('Eliminado con exito' + response.data);
            })
            .catch(() => {
                alert('No se pueden eliminar juegos asociados a compras o ventas');
            });
    }

    {/* PLATFORMS */ }

    const [openPlatformDialog, setOpenPlatformDialog] = useState(false);

    const handleOpenPlatformDialog = (game: Game) => {
        setSelectedGame(game);
        setOpenPlatformDialog(true);
    };

    const handleClosePlatformDialog = () => {
        setOpenPlatformDialog(false);
        fetchGames();
    };

    {/* GENRES */ }

    const [openGenreDialog, setOpenGenreDialog] = useState(false);

    const handleOpenGenreDialog = (game: Game) => {
        setSelectedGame(game);
        setOpenGenreDialog(true);
    };

    const handleCloseGenreDialog = () => {
        setOpenGenreDialog(false);
        fetchGames();
    };

    {/* REVIEWS */ }

    const [openReviewDialog, setOpenReviewDialog] = useState(false);

    const handleOpenReviewDialog = (game: Game) => {
        setSelectedGame(game);
        setOpenReviewDialog(true);
    };

    const handleCloseReviewDialog = () => {
        setOpenReviewDialog(false);
        fetchGames();
    };

    return (
        <div>
            <HeaderAdmin />
            <Grid container justifyContent={'center'} paddingY={4}>
                <Typography variant='h3'> Gestión de juegos </Typography>
            </Grid>
            <Grid paddingX={5}>
                <TableContainer component={Paper} sx={{ minHeight: '60.5vh' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Título</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Fecha de salida</TableCell>
                                <TableCell>Nº de ventas</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Puntuación</TableCell>
                                <TableCell>Plataforma</TableCell>
                                <TableCell>Género</TableCell>
                                <TableCell>Reseñas</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {games
                                .slice((page - 1) * 6, page * 6)
                                .map((game: Game) => (
                                    <TableRow key={game.gameId}>
                                        <TableCell>{game.title}</TableCell>
                                        <TableCell sx={{ width: 90 }}>{game.price} € </TableCell>
                                        <TableCell onClick={() => setSelectedDescription(game.description)}>
                                            {game.description.length > 20 ? `${game.description.slice(0, 20)}...` : game.description}
                                        </TableCell>
                                        <TableCell>{game.releaseDate}</TableCell>
                                        <TableCell>{game.numberOfSales}</TableCell>
                                        <TableCell sx={{ width: 90 }}>{game.stock}</TableCell>
                                        <TableCell>
                                            <Rating
                                                name={`score - ${game.gameId}`}
                                                value={game.totalScore}
                                                precision={0.5}
                                                readOnly
                                            />
                                        </TableCell>
                                        {game.platforms.length > 0 ? (
                                            <TableCell onClick={() => handleOpenPlatformDialog(game)}>plataformas</TableCell>
                                        ) : (
                                            <TableCell> No hay plataformas </TableCell>
                                        )}
                                        {game.genres.length > 0 ? (
                                            <TableCell onClick={() => handleOpenGenreDialog(game)}>géneros</TableCell>
                                        ) : (
                                            <TableCell> No hay plataformas </TableCell>
                                        )}
                                        {game.reviews && game.reviews?.length > 0 ? (
                                            <TableCell onClick={() => handleOpenReviewDialog(game)}>reseñas</TableCell>
                                        ) : (
                                            <TableCell> No hay reseñas </TableCell>
                                        )}
                                        <TableCell>
                                            <Button onClick={() => handleOpenDialog(game)} variant="contained" color="primary">
                                                Comprar
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleOpenPriceDialog(game)} variant="contained" color="secondary">
                                                Modificar
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleElimination(game)} variant="contained" color="error">
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container justifyContent="space-evenly" margin={3} height={40}>
                    <Grid item>
                        <Pagination
                            count={Math.ceil(games.length / 6)}
                            page={page}
                            onChange={(_event, value) => setPage(value)}
                        />
                    </Grid>
                    <Grid item>
                        <Button onClick={handleFormOpen} variant="contained" color="success"> Crear </Button>
                    </Grid>
                </Grid>

            </Grid>
            <FooterAdmin />
            <DescriptionDialog description={selectedDescription} onClose={() => setSelectedDescription(null)} />
            <CreateGameForm open={open} onClose={handleFormClose} />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Comprar {selectedGame?.title}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='filled'
                                label="Cantidad"
                                type="number"
                                value={quantityBought}
                                onChange={(e) => setQuantityBought(Number(e.target.value))}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                variant='filled'
                                label="Proveedor"
                                value={selectedProvider?.providerId}
                                onChange={handleProviderChange}
                                fullWidth
                            >
                                {providers.map((provider: Provider) => (
                                    <MenuItem key={provider.providerId} value={provider.providerId}>
                                        {provider.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="error" variant='contained'>
                        Cancelar
                    </Button>
                    <Button onClick={handlePurchase} color="success" variant='contained'>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openChangePriceDialog} onClose={handleClosePriceDialog}>
                <DialogTitle>Modificar precio {selectedGame?.title}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='filled'
                                label="Precio"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePriceDialog} color="error" variant='contained'>
                        Cancelar
                    </Button>
                    <Button onClick={handleChangePrice} color="success" variant='contained'>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* PLATFORMS */}
            <Dialog open={openPlatformDialog} onClose={handleClosePlatformDialog}>
                <DialogTitle> Plataformas </DialogTitle>
                <DialogContent>
                    <div>
                        {selectedGame?.platforms.map((platform: Platform) => (
                            <Typography key={platform.platformId} variant="subtitle1">{platform.name}</Typography>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {/* GENRES */}
            <Dialog open={openGenreDialog} onClose={handleCloseGenreDialog}>
                <DialogTitle> Géneros </DialogTitle>
                <DialogContent>
                    <div>
                        {selectedGame?.genres.map((genre: Genre) => (
                            <Typography key={genre.genreId} variant="subtitle1">{genre.name}</Typography>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {/* REVIEW */}
            <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog}>
                <DialogTitle> Reseñas </DialogTitle>
                <DialogContent>
                    <div>
                        {selectedGame?.reviews && selectedGame?.reviews.map((review: Review) => (
                            <Typography key={review.reviewId} variant="subtitle1">{review.score}: {review.comment}</Typography>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default GameManage;

