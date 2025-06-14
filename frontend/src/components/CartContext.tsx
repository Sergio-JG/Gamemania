import { Avatar, Button, Divider, Drawer, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '../interfaces/GameInterface';
import { Remove, ShoppingBag } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { truncateText } from '../utils/utils';

export const CartContext = createContext<{
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    isCartOpen: boolean;
    addToCart: (game: CartItem) => void;
    removeFromCart: (gameId: string) => void;
    toggleCart: () => void;
    getTotalPrice: () => number;
    totalItemsInCart: number;
}>({
    cart: [],
    setCart: () => { },
    isCartOpen: false,
    addToCart: () => { },
    removeFromCart: () => { },
    toggleCart: () => { },
    getTotalPrice: () => 0,
    totalItemsInCart: 0,
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cart, setCart] = useState<CartItem[]>(cartFromLocalStorage);
    const [drawerHeight, setDrawerHeight] = useState<number>(300);
    const [isCartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();

    const saveCartToLocalStorage = (cartData: CartItem[]) => {
        localStorage.setItem('cart', JSON.stringify(cartData));
    };

    const removeFromCart = (gameId: string) => {
        const updatedCart = cart.filter((item) => item.gameId !== gameId);
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
        if (updatedCart.length === 0) {
            setDrawerHeight(300)
        }
    };

    const addToCart = (game: CartItem) => {

        const existingGame = cart.find((item) => item.gameId === game.gameId);

        if (existingGame) {
            const updatedCart = cart.map((item) =>
                item.gameId === game.gameId ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(updatedCart);
            saveCartToLocalStorage(updatedCart);
        } else {
            const newCart = [...cart, { ...game, quantity: 1 }];
            setCart(newCart);
            saveCartToLocalStorage(newCart);
        }

        if (cart.length === 0) {
            setDrawerHeight(drawerHeight + 150);
        } else if (!existingGame) {
            setDrawerHeight(drawerHeight + 80);
        }
    };

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        saveCartToLocalStorage(cart);
    }, [cart]);

    const getTotalPrice = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const getDiscountedPrice = () => {
        console.log(cart);
        return cart.reduce((acc, item) => acc + item.discountedPrice, 0);
    };

    const getPrice = () => {
        return cart.reduce((acc, item) => acc + item.price, 0);
    }

    const toggleCart = () => {
        setCartOpen((prevIsCartOpen) => !prevIsCartOpen);
    };

    const handleNavigation = () => {
        toggleCart()
        const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
        if (userId) {
            navigate('/buyPlatform');
        } else {
            navigate('/login');
        }

    };

    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                isCartOpen,
                addToCart,
                removeFromCart,
                toggleCart,
                getTotalPrice,
                totalItemsInCart,
            }}
        >
            {children}
            <Drawer open={isCartOpen} onClose={toggleCart} anchor='right' PaperProps={{
                sx: {
                    width: 560,
                    background: 'rgb(41, 41, 41)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: `${drawerHeight}px`,
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    borderLeft: 'solid 0.5px gray',
                    borderBottom: 'solid gray',
                    borderBottomLeftRadius: 15,
                },
            }}
            >

                <Typography alignSelf='center' variant='h3' color={'white'} padding={3}>Mi cesta ({cart.length})</Typography>

                <Divider />

                {cart.length > 0 ? (
                    <>
                        <Grid>

                            <List sx={{ paddingY: 3 }}>
                                {cart.map((item, index) => (
                                    <Grid key={index}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={item.image} />
                                            </ListItemAvatar>
                                            <ListItemText primary={truncateText(item.title, 30)} />
                                            <ListItemText primary={item.platform.name} />
                                            <Typography variant="h5">{`${item.price}€ `}</Typography>
                                            <Typography paddingX={2} variant="h6"> x{item.quantity}</Typography>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                style={{
                                                    borderRadius: '50%',
                                                    minWidth: 'unset',
                                                    minHeight: 'unset',
                                                    padding: '0',
                                                }}
                                                onClick={() => removeFromCart(item.gameId)}
                                            >
                                                <Remove />
                                            </Button>
                                        </ListItem>
                                    </Grid>
                                ))}
                            </List>

                            <Divider />

                        </Grid>
                    </>
                ) : (
                    <Grid container sx={{ paddingTop: 6, alignContent: 'center', justifyContent: 'center' }}>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" color="white" padding={2}> Añade objetos al carro </Typography>
                        </Grid>
                    </Grid>
                )};
                {cart.length > 0 && (
                    <Grid item sx={{ marginTop: 'auto', paddingBottom: 2, paddingX: 2 }}>
                        <Grid item display={'flex'} justifyContent={'space-between'} xs={6}>
                            <Typography color='white' variant='h5'>Precio oficial: </Typography>
                            <Typography paddingInlineEnd={9} color='white' variant='h5'>{getPrice().toFixed(2)}€</Typography>
                        </Grid>
                        <Grid item display={'flex'} paddingY={2} justifyContent={'space-between'} xs={6}>
                            <Typography color='white' variant='h5'>Precio rebajado: </Typography>
                            <Typography paddingInlineEnd={9} color='white' variant='h5'>{getDiscountedPrice().toFixed(2)}€</Typography>
                        </Grid>
                        <Grid item display={'flex'} justifyContent={'space-between'} xs={6}>
                            <Typography color='white' variant='h5'>Subtotal: </Typography>
                            <Typography paddingInlineEnd={9} color='white' variant='h5'>{getTotalPrice().toFixed(2)}€</Typography>
                        </Grid>
                        <Button fullWidth variant="contained" endIcon={<ShoppingBag />} onClick={handleNavigation}> Confirmar Compra </Button>
                    </Grid>
                )}
            </Drawer>
        </CartContext.Provider >
    );
}

export const useCartContext = () => {
    return useContext(CartContext);
};