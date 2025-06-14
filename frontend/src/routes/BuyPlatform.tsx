import { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../components/CartContext';
import CartItem, { User } from '../interfaces/GameInterface';
import { ArrowRight } from '@mui/icons-material';
import defaultPic from '../images/default.jpg';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BuyPlatform = () => {

    const { cart, getTotalPrice } = useContext(CartContext);
    const [userData, setUserData] = useState<User | null>(null);

    // const [saleData, setSaleData] = useState<Sale>({} as Sale);
    // const [saleDetailData, setSaleDetailData] = useState<SaleDetail>({} as SaleDetail);

    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
            console.log
            const response = await axios.get(`http://localhost:8080/user/${userId}`);
            if (response.status == 200) {
                setUserData(response.data[0]);
                console.log(userData)
            }
        } catch (error) {
            console.error('ERROR submitting data:', error);
        }
    }

    useEffect(() => { fetchUserData() }, []);

    const generateSaleData = (cart: CartItem[]) => {
        const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
        const saleDate = new Date().toISOString().split('T')[0];

        const saleDetail = cart.map((item) => ({
            gameId: item.gameId,
            quantity: item.quantity,
            subtotal: item.price,
        }));

        return {
            userId,
            saleDate,
            saleDetail,
        };
    };

    const updateStocks = async (cart: CartItem[]) => {

        const API_URL = 'http://localhost:8080/game';
        console.log(cart);

        cart.forEach(async (cartItem: CartItem) => {
            console.log(cartItem)
            const newStock = cartItem.stock - cartItem.quantity;
            cartItem.stock = newStock;
            try {
                const response = await fetch(`${API_URL}/${cartItem?.gameId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cartItem),
                });

                if (response.ok) {
                    console.log("update")
                }

            } catch (error) {
                console.error('Error updating stock:', error);
            }
        });
    }

    const navigate = useNavigate();

    const handleConfirmSale = async () => {

        updateStocks(cart);
        let saleData = generateSaleData(cart);
        try {
            const response = await axios.post('http://localhost:8080/sale', saleData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                navigate("/profile");
                console.log('Confirmado');
            } else {
                console.error('Failed to confirm sale');
            }
        } catch (error) {
            console.error('Error confirming sale:', error);
        }
    };

    return (
        <>
            <Header />
            <Grid container sx={{ minHeight: '60vh' }}>
                <Grid item xs={12} sm={6} md={7}>
                    <Grid direction="column" alignItems="center" justifyContent="center" style={{ width: '100%', padding: 20, margin: 20 }}>
                        <Grid item display='flex' alignItems="center" justifyContent="left" margin='25px'>
                            <Typography variant="h3"> Confirmación de compra </Typography>
                        </Grid>
                        {userData && (
                            <>
                                <Box border={1} borderRadius={4} borderColor="grey.400" marginBottom={2}>
                                    {userData && userData.address ? (
                                        <><Grid container style={{ textAlign: 'left', margin: '20px' }}>
                                            <Typography variant="h5">Dirección de envio</Typography>
                                            <Button variant="outlined" /* onClick={handleChangeAddress} */ style={{ marginLeft: '20px' }}>
                                                Cambiar dirección
                                            </Button>
                                        </Grid><Grid container style={{ textAlign: 'left', margin: '30px' }}>
                                                <List>
                                                    <ListItem>
                                                        <ArrowRight style={{ color: 'black' }}></ArrowRight>
                                                        <Typography variant="body1">Street: {userData.address.streetAddress}</Typography>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ArrowRight style={{ color: 'black' }}></ArrowRight>
                                                        <Typography variant="body1">City: {userData.address.city}</Typography>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ArrowRight style={{ color: 'black' }}></ArrowRight>
                                                        <Typography variant="body1">State: {userData.address.state}</Typography>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ArrowRight style={{ color: 'black' }}></ArrowRight>
                                                        <Typography variant="body1">Postal Code: {userData.address.postalCode}</Typography>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ArrowRight style={{ color: 'black' }}></ArrowRight>
                                                        <Typography variant="body1">Country: {userData.address.country}</Typography>
                                                    </ListItem>
                                                </List>
                                            </Grid></>
                                    ) : (
                                        <Grid padding={5}>
                                            <Typography>No hay dirección disponible</Typography>
                                        </Grid>
                                    )}
                                </Box>
                                <Box border={1} borderRadius={4} borderColor="grey.400" marginBottom={2}>
                                    {userData && userData.creditCard.length > 0 ? (
                                        <>
                                            <Grid container style={{ textAlign: 'left', margin: '20px' }}>
                                                <Typography variant="h5"> Tarjeta de crédito </Typography>
                                                <Button variant="outlined" /* onClick={handleChangeAddress} */ style={{ marginLeft: '20px' }}> Cambiar tarjeta </Button>
                                            </Grid>
                                            <Grid container style={{ textAlign: 'left', margin: '30px' }}>
                                                <List>
                                                    <ListItem>
                                                        <ArrowRight style={{ color: 'black' }} />
                                                        <Typography variant="body1">Card Number: {userData.creditCard[0].cardNumber}</Typography>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ArrowRight style={{ color: 'black' }}></ArrowRight>
                                                        <Typography variant="body1">Cardholder Name: {userData.creditCard[0].cardHolderName}</Typography>
                                                    </ListItem >
                                                    <ListItem>
                                                        <ArrowRight style={{ color: 'black' }}></ArrowRight>
                                                        <Typography variant="body1">Expiration Date: {userData.creditCard[0].expirationDate}</Typography>
                                                    </ListItem >
                                                    <ListItem>
                                                        <ArrowRight style={{ color: 'black' }}></ArrowRight>
                                                        <Typography variant="body1">CVV: {userData.creditCard[0].cvv}</Typography>
                                                    </ListItem >
                                                    <ListItem>
                                                        <ArrowRight style={{ color: 'black' }}></ArrowRight>
                                                        <Typography variant="body1">Billing Address: {userData.creditCard[0].billingAddress}</Typography>
                                                    </ListItem >
                                                </List >
                                            </Grid>
                                        </>
                                    ) : (
                                        <Grid padding={5}>
                                            <Typography>No hay tarjeta de crédito disponible</Typography>
                                        </Grid>
                                    )}
                                </Box>
                            </>
                        )}
                    </Grid >
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Grid direction="column" alignItems="center" justifyContent="center" style={{ height: '85.8%', width: '100%', padding: 20, margin: 20 }}>
                        <Grid item display='flex' alignItems="center" justifyContent="left" margin='25px'>
                            <Typography variant="h3"> Carrito de compra </Typography>
                        </Grid>
                        {cart && (
                            <>
                                <List sx={{ flexGrow: 1 }}>
                                    {cart.map((item, index) => (
                                        <div key={index}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={defaultPic} />
                                                </ListItemAvatar>
                                                <ListItemText primary={item.title} />
                                                <Typography variant="h6">{`$${item.price}`}</Typography>
                                                <Typography variant="body1">{`(${item.quantity})`}</Typography>
                                            </ListItem>
                                        </div>
                                    ))}
                                </List><Divider /><Grid container justifyContent="space-between" padding={2}>
                                    <Grid item xs={6}>
                                        <h3>Subtotal:</h3>
                                    </Grid>
                                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                        <h3>${getTotalPrice().toFixed(2)}</h3>
                                    </Grid>
                                </Grid>
                                <Grid item container alignItems="center" justifyContent="space-between">
                                    {userData && userData.creditCard.length > 0 && userData.address ? (
                                        <><Button variant="contained" color="warning" href="/" style={{ width: '40%' }}>
                                            Cancelar compra
                                        </Button><Button variant="contained" onClick={handleConfirmSale} style={{ width: '40%' }}>
                                                Confirmar compra
                                            </Button></>
                                    ) : (
                                        <>
                                            <Grid item container alignItems="center" justifyContent="center">
                                                <Typography color="red" variant='body2'> Se necesita una tarjeta de crédito y una dirección de facturacion para comprar </Typography>
                                                <Button variant="contained" component={Link} to="/profile" style={{ margin: 20, width: '40%' }}>IR AL PERFIL</Button>
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </>
                        )}
                    </Grid >
                </Grid>
            </Grid >
            <Footer />
        </>
    );
};

export default BuyPlatform;



