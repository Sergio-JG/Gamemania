import { useCallback, useContext, useEffect, useState } from 'react';
import { Avatar, Button, Divider } from '@mui/material';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { CartContext } from '../components/CartContext';
import CartItem, { CreditCard, User } from '../interfaces/GameInterface';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TermsDialog from '../components/dialog/TermsDialog';

const BuyPlatform = () => {

    const { cart, getTotalPrice } = useContext(CartContext);
    const [userData, setUserData] = useState<User | null>(null);
    const [termsOpen, setTermsOpen] = useState(false);
    const [creditCardData, setCreditCardData] = useState<CreditCard>({} as CreditCard);

    const fetchUserData = useCallback(async () => {
        try {
            const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${userId}`);
            if (response.status === 200) {
                setUserData(response.data);
            }
        } catch (error) {
            console.error('ERROR fetching user data:', error);
        }
    }, []);

    const fetchCardData = useCallback(async (userId: string) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/creditCard/user/${userId}`);
            if (res.data) setCreditCardData(res.data);
        } catch (error) {
            console.error("Error fetching credit card data:", error);
            setCreditCardData({} as CreditCard);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    useEffect(() => {
        if (userData?.userId) {
            fetchCardData(userData.userId);
        }
    }, [userData, fetchCardData]);

    const generateSaleData = (cart: CartItem[]) => {
        const userId = userData?.userId || '';
        const saleDate = new Date().toISOString().split('T')[0];
        const saleDetail = cart.map((item) => ({
            gameId: item.gameId,
            quantity: item.quantity,
            subtotal: item.price,
        }));
        return { userId, saleDate, saleDetail };
    };

    const updateStocks = async (cart: CartItem[]) => {
        cart.forEach(async (cartItem: CartItem) => {
            const newStock = cartItem.stock - cartItem.quantity;
            cartItem.stock = newStock;
            try {
                await fetch(`${import.meta.env.VITE_API_URL}/${cartItem?.gameId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cartItem),
                });
            } catch (error) {
                console.error('Error updating stock:', error);
            }
        });
    };

    const navigate = useNavigate();

    const handleConfirmSale = async () => {
        updateStocks(cart);
        const saleData = generateSaleData(cart);
        console.log(saleData)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/sale`, saleData, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 201) {
                navigate("/profile");
            } else {
                console.error('Failed to confirm sale');
            }
        } catch (error) {
            console.error('Error confirming sale:', error);
        }
    };

    const maskCard = (num?: string) =>
        num ? num.replace(/\d{12}(\d{4})/, '**** **** **** $1') : 'No hay datos';

    return (
        <>
            <Header />
            <div className="mx-auto px-2 sm:px-8 md:px-24 lg:px-32 py-8 bg-neutral-800 min-h-screen">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT: User Info & Payment */}
                    <div className="rounded-2xl shadow-lg p-8 flex-1 border-2 border-yellow-400 bg-[#18181b] min-w-0 transition-shadow duration-200 hover:shadow-yellow-400/40">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-yellow-400">
                            Confirmación de compra
                        </h2>

                        {/* Address */}
                        <div className="mb-10">
                            <h3 className="text-xl font-semibold mb-4 text-white">Dirección de envío</h3>
                            <div className="bg-neutral-700 rounded-xl p-4 border border-yellow-300 mb-4 flex flex-col gap-2">
                                {userData?.address ? (
                                    <>
                                        <div><b className="text-yellow-400">Calle:</b> {userData.address.street}</div>
                                        <div><b className="text-yellow-400">Ciudad:</b> {userData.address.city}</div>
                                        <div><b className="text-yellow-400">Estado:</b> {userData.address.state}</div>
                                        <div><b className="text-yellow-400">Código Postal:</b> {userData.address.postalCode}</div>
                                        <div><b className="text-yellow-400">País:</b> {userData.address.country}</div>
                                    </>
                                ) : (
                                    <div className="text-red-400">No hay dirección disponible</div>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <Button variant="outlined" component={Link} to="/profile" className="border-yellow-400 text-yellow-400 hover:bg-yellow-50">
                                    Cambiar dirección
                                </Button>
                            </div>
                        </div>

                        {/* Tarjeta de crédito */}
                        <div className="mb-10">
                            <h3 className="text-xl font-semibold mb-4 text-white">Tarjeta de crédito</h3>
                            <div className="bg-neutral-700 rounded-xl p-4 border border-yellow-300 mb-4 flex flex-col gap-2">
                                {creditCardData?.cardNumber ? (
                                    <>
                                        <div><b className="text-yellow-400">Número:</b> {maskCard(creditCardData.cardNumber)}</div>
                                        <div><b className="text-yellow-400">Titular:</b> {creditCardData.cardHolderName}</div>
                                        <div><b className="text-yellow-400">Expira:</b> {creditCardData.expirationDate}</div>
                                        <div><b className="text-yellow-400">CVV:</b> ***</div>
                                        <div><b className="text-yellow-400">Dirección facturación:</b> {creditCardData.billingAddress}</div>
                                    </>
                                ) : (
                                    <div className="text-red-400">No hay tarjeta de crédito disponible</div>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <Button variant="outlined" component={Link} to="/profile" className="border-yellow-400 text-yellow-400 hover:bg-yellow-50">
                                    Cambiar tarjeta
                                </Button>
                            </div>
                        </div>

                        {/* Confirmación */}
                        <div className="flex flex-col gap-4">
                            <div className="text-xs text-gray-400 mb-2">
                                Al confirmar la compra aceptas los{' '}
                                <span className="underline text-yellow-400 cursor-pointer" onClick={() => setTermsOpen(true)}>
                                    términos y condiciones
                                </span>.
                            </div>
                            <TermsDialog open={termsOpen} onClose={() => setTermsOpen(false)} />
                            <div className="flex gap-4">
                                <Button variant="contained" color="warning" href="/" className="bg-yellow-400 text-black font-bold hover:bg-yellow-500 w-1/2">
                                    Cancelar compra
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleConfirmSale}
                                    disabled={!creditCardData?.cardNumber || !userData?.address || cart.length === 0}
                                    className="bg-yellow-400 text-black font-bold hover:bg-yellow-500 w-1/2"
                                >
                                    Confirmar compra
                                </Button>
                            </div>
                            {(!creditCardData?.cardNumber || !userData?.address) && (
                                <div className="text-red-400 text-center mt-2">
                                    Se necesita una tarjeta de crédito y una dirección de facturación para comprar.
                                    <Button variant="contained" component={Link} to="/profile" className="bg-yellow-400 text-black font-bold hover:bg-yellow-500 mt-2">
                                        Ir al perfil
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Carrito */}
                    <div className="rounded-2xl shadow-lg p-8 flex-1 border-2 border-yellow-400 bg-[#18181b] min-w-0 transition-shadow duration-200 hover:shadow-yellow-400/40">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-yellow-400">
                            Carrito de compra
                        </h2>
                        <div className="space-y-4">
                            {cart.length > 0 ? (
                                cart.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-neutral-700 rounded-lg p-4 border border-yellow-300">
                                        <Avatar src={`${import.meta.env.VITE_GAME_IMAGES_URL || ''}${item.image}`} />
                                        <div className="flex-1">
                                            <div className="font-semibold text-yellow-200">{item.title}</div>
                                            <div className="text-gray-300 text-sm">Cantidad: {item.quantity}</div>
                                        </div>
                                        <div className="font-bold text-yellow-400 text-lg">€{item.price}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-400 text-center">El carrito está vacío.</div>
                            )}
                        </div>
                        <Divider className="my-6" />
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-lg font-semibold text-white">Total:</span>
                            <span className="text-2xl font-bold text-yellow-400">€{getTotalPrice().toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BuyPlatform;
