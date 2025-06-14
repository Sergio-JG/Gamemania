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
        <>
            <Grid sx={{ border: 'solid 0.5px gray', borderRadius: 5, padding: 2, marginY: 2, background: 'rgb(41, 41, 31)' }}>
                <Typography color='white' variant="h4" gutterBottom> Adquirir por: {game.price}€ </Typography>
                <Grid container>
                    <Grid item xs={2} container sx={{ justifyContent: 'start', alignContent: 'center' }}>
                        <Typography color={'white'} variant="body1" gutterBottom>
                            Plataformas disponibles:
                        </Typography>
                    </Grid>
                    <Grid item xs={2} container sx={{ justifyContent: 'center', alignContent: 'center' }}>
                        <FormControl variant="standard">
                            <Select
                                sx={{ width: 150 }}
                                id="platform-select"
                                value={selectedPlatform.name}
                                onChange={handleChange}
                                label="Platform"
                                fullWidth
                            >
                                {game.platforms.map((platform) => (
                                    <MenuItem key={platform.platformId} value={platform.name}>
                                        {platform.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8} container sx={{ justifyContent: 'center', alignContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => game && addToCart(gameToCartItem(game))}
                            endIcon={<ShoppingBasket />}
                        >
                            Añadir a la cesta
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

        </>
    );
};

export default BuyCard;