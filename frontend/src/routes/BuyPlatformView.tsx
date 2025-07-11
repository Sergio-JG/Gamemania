import { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Divider } from '@mui/material';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { CartContext } from '../components/CartContext';
import CartItem, { User } from '../interfaces/GameInterface';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TermsDialog from '../components/dialog/TermsDialog';

const BuyPlatform = () => {

    const { cart, getTotalPrice } = useContext(CartContext);
    const [userData, setUserData] = useState<User | null>(null);
    const [termsOpen, setTermsOpen] = useState(false);

    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${userId}`);
            if (response.status === 200) {
                setUserData(response.data[0]);
            }
        } catch (error) {
            console.error('ERROR fetching user data:', error);
        }
    };

    useEffect(() => { fetchUserData(); }, []);

    const generateSaleData = (cart: CartItem[]) => {
        const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
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
        try {
            const response = await axios.post('http://localhost:8080/sale', saleData, {
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

    // Helper for masking card number
    const maskCard = (num?: string) =>
        num ? num.replace(/\d{12}(\d{4})/, '**** **** **** $1') : 'No hay datos';

    return (
        <>
            <Header />
            <div className="mx-auto px-2 sm:px-8 md:px-24 lg:px-32 py-8 bg-neutral-800 min-h-screen">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT: User Info & Payment */}
                    <div className="rounded-2xl shadow-lg p-8 flex-1 border-2 border-yellow-400 bg-[#18181b] min-w-0 transition-shadow duration-200 hover:shadow-yellow-400/40">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-yellow-400 font-['Roboto_Slab','Roboto',sans-serif] tracking-tight drop-shadow">
                            Confirmación de compra
                        </h2>
                        {/* Shipping Address */}
                        <div className="mb-10">
                            <h3 className="text-xl font-semibold mb-4 text-white font-['Roboto_Slab','Roboto',sans-serif]">Dirección de envío</h3>
                            <div className="bg-neutral-700 rounded-xl p-4 border border-yellow-300 mb-4 flex flex-col gap-2">
                                {userData?.address ? (
                                    <>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <span className="font-semibold text-yellow-400">Calle:</span>
                                            <span className="text-gray-200">{userData.address.street}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <span className="font-semibold text-yellow-400">Ciudad:</span>
                                            <span className="text-gray-200">{userData.address.city}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <span className="font-semibold text-yellow-400">Estado:</span>
                                            <span className="text-gray-200">{userData.address.state}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <span className="font-semibold text-yellow-400">Código Postal:</span>
                                            <span className="text-gray-200">{userData.address.postalCode}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <span className="font-semibold text-yellow-400">País:</span>
                                            <span className="text-gray-200">{userData.address.country}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-red-400">No hay dirección disponible</div>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    to="/profile"
                                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-50"
                                >
                                    Cambiar dirección
                                </Button>
                            </div>
                        </div>
                        {/* Credit Card */}
                        <div className="mb-10">
                            <h3 className="text-xl font-semibold mb-4 text-white font-['Roboto_Slab','Roboto',sans-serif]">Tarjeta de crédito</h3>
                            <div className="bg-neutral-700  rounded-xl p-4 border border-yellow-300 mb-4 flex flex-col gap-2">
                                {userData?.creditCard ? (
                                    <>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <span className="font-semibold text-yellow-700">Número:</span>
                                            <span className="text-gray-700">{maskCard(userData.creditCard.cardNumber)}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <span className="font-semibold text-yellow-700">Titular:</span>
                                            <span className="text-gray-700">{userData.creditCard.cardHolderName}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <span className="font-semibold text-yellow-700">Expira:</span>
                                            <span className="text-gray-700">{userData.creditCard.expirationDate}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <span className="font-semibold text-yellow-700">CVV:</span>
                                            <span className="text-gray-700">***</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <span className="font-semibold text-yellow-700">Dirección de facturación:</span>
                                            <span className="text-gray-700">{userData.creditCard.billingAddress}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-red-400">No hay tarjeta de crédito disponible</div>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    to="/profile"
                                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-50"
                                >
                                    Cambiar tarjeta
                                </Button>
                            </div>
                        </div>
                        {/* Extra: Order Summary */}
                        <div className="mb-10">
                            <h3 className="text-xl font-semibold mb-4 text-white font-['Roboto_Slab','Roboto',sans-serif]">Resumen del pedido</h3>
                            <div className="bg-neutral-700 rounded-xl p-4 border border-yellow-300 mb-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-gray-200">
                                        <span>Subtotal:</span>
                                        <span>€{getTotalPrice().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-200">
                                        <span>Envío:</span>
                                        <span>Gratis</span>
                                    </div>
                                    <div className="flex justify-between text-yellow-400 font-bold text-lg mt-2">
                                        <span>Total:</span>
                                        <span>€{getTotalPrice().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Extra: Terms and Confirm */}
                        <div className="flex flex-col gap-4">
                            <div className="text-xs text-gray-400 mb-2">
                                Al confirmar la compra aceptas los{' '}
                                <span
                                    className="underline text-yellow-400 cursor-pointer"
                                    onClick={() => setTermsOpen(true)}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setTermsOpen(true); }}
                                >
                                    términos y condiciones
                                </span>.
                            </div>
                            {/* Terms and Conditions Dialog */}
                            <TermsDialog open={termsOpen} onClose={() => setTermsOpen(false)} />
                            <div className="flex gap-4">
                                <Button
                                    variant="contained"
                                    color="warning"
                                    href="/"
                                    className="bg-yellow-400 text-black font-bold hover:bg-yellow-500 w-1/2"
                                >
                                    Cancelar compra
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleConfirmSale}
                                    disabled={
                                        !userData?.creditCard ||
                                        !userData?.address ||
                                        cart.length === 0
                                    }
                                    className="bg-yellow-400 text-black font-bold hover:bg-yellow-500 w-1/2"
                                >
                                    Confirmar compra
                                </Button>
                            </div>
                            {(!userData?.creditCard || !userData?.address) && (
                                <div className="text-red-400 text-center mt-2">
                                    Se necesita una tarjeta de crédito y una dirección de facturación para comprar.
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        style={{ marginInlineStart: 10 }}
                                        to="/profile"
                                        className="bg-yellow-400 text-black font-bold hover:bg-yellow-500 mt-2"
                                    >
                                        Ir al perfil
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* RIGHT: Cart */}
                    <div className="rounded-2xl shadow-lg p-8 flex-1 border-2 border-yellow-400 bg-[#18181b] min-w-0 transition-shadow duration-200 hover:shadow-yellow-400/40">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-yellow-400 font-['Roboto_Slab','Roboto',sans-serif] tracking-tight drop-shadow">
                            Carrito de compra
                        </h2>
                        <div className="space-y-4">
                            {cart && cart.length > 0 ? (
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



