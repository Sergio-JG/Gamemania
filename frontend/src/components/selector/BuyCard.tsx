import { SelectChangeEvent, FormControl, Select, MenuItem, Typography, Button, Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import CartItem, { Game, Platform } from "../../interfaces/GameInterface";
import { ShoppingBasket } from "@mui/icons-material";
import { CartContext } from "../CartContext";

interface BuyCardProps {
    game: Game;
}

const BuyCard: React.FC<BuyCardProps> = ({ game }) => {

    const [selectedPlatform, setSelectedPlatform] = useState<Platform>(game.platforms[0] || 'default');

    const { addToCart } = useContext(CartContext);

    const gameToCartItem = (game: Game): CartItem => {
        return {
            gameId: game.gameId ?? "",
            title: game.title,
            price: game.price,
            discountedPrice: game.discountedPrice ?? 0,
            quantity: 0,
            image: game.image,
            platform: selectedPlatform,
            stock: game.stock,
            discount: game.discount ?? 0,
        };
    }

    function handleChange(event: SelectChangeEvent<string>): void {
        const platformName = event.target.value;
        const selectedPlatform = game.platforms.find(platform => platform.name === platformName);
        if (selectedPlatform) {
            setSelectedPlatform(selectedPlatform);
        }
    }

    return (
        <Grid
            container
            spacing={2}
            sx={{
                border: 'solid 0.5px gray',
                borderRadius: 3,
                p: { xs: 2, md: 3 },
                my: 2,
                background: 'rgb(41, 41, 31)',
                alignItems: 'center',
                maxWidth: '100%',
                mx: 'auto',
            }}
        >
            <Grid item xs={12}>
                <Typography color="white" variant="h5" fontWeight={600} gutterBottom>
                    Adquirir por: <span style={{ color: '#ffd700' }}>{game.price}€</span>
                </Typography>
            </Grid>
            {game.platforms.length > 0 ? (
                <Grid item xs={12} sm={5}>
                    <Typography color="white" variant="body1" gutterBottom>
                        Plataformas disponibles:
                    </Typography>
                    <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                        <Select
                            id="platform-select"
                            value={selectedPlatform.name}
                            onChange={handleChange}
                            label="Platform"
                            sx={{
                                background: '#222',
                                color: 'white',
                                borderRadius: 1,
                                '.MuiSvgIcon-root': { color: 'white' },
                            }}
                        >
                            {game.platforms.map((platform) => (
                                <MenuItem key={platform.platformId} value={platform.name}>
                                    {platform.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            ) : (
                <Grid item xs={12} sm={5}>
                    <Typography color="white" variant="body1" gutterBottom>
                        No hay plataformas disponibles para este juego.
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12} sm={7} display="flex" alignItems="center" justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        minWidth: 180,
                        fontWeight: 600,
                        py: 1.2,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        boxShadow: 2,
                    }}
                    onClick={() => game && addToCart(gameToCartItem(game))}
                    endIcon={<ShoppingBasket />}
                    disabled={game.platforms.length === 0}
                >
                    Añadir a la cesta
                </Button>
            </Grid>
        </Grid>
    );
};

export default BuyCard;