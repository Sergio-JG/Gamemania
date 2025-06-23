import { Drawer } from '@mui/material';
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
            <Drawer
                open={isCartOpen}
                onClose={toggleCart}
                anchor="right"
                PaperProps={{
                    sx: {
                        width: { xs: '100vw', sm: 400, md: 480, lg: 560 },
                        background: '#232323',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                        maxHeight: '100vh',
                        overflowY: 'auto',
                        borderLeft: 'solid 0.5px #bfa600', // darker yellow
                        borderBottom: 'solid #bfa600',
                        borderBottomLeftRadius: 15,
                        p: 0,
                    },
                }}
            >
                <div className="flex flex-col h-full w-full">
                    <div className="flex flex-col items-center py-6 px-4 border-b border-[#bfa600]">
                        <span className="text-2xl sm:text-3xl font-bold text-[#bfa600] tracking-wide">
                            Mi cesta <span className="text-white">({cart.length})</span>
                        </span>
                    </div>
                    {cart.length > 0 ? (
                        <div className="flex-1 overflow-y-auto px-2 py-4">
                            <ul className="space-y-4">
                                {cart.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center rounded-lg shadow p-3 gap-4 bg-[#2d2d2d] border border-[#bfa600]"
                                    >
                                        <img
                                            src={`${import.meta.env.VITE_GAME_IMAGES_URL || ''}${item.image}`}
                                            alt={item.title}
                                            className="rounded object-cover"
                                            style={{
                                                width: 56,
                                                height: 56,
                                                border: '2px solid #bfa600',
                                                marginRight: 12,
                                                background: '#fff',
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold truncate text-white">
                                                {truncateText(item.title, 30)}
                                            </div>
                                            <div className="text-xs text-[#bfa600]">
                                                {item.platform.name}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="font-bold text-[#bfa600]">
                                                    {item.price}€
                                                </span>
                                                <span className="text-sm text-white">
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            className="ml-2 flex items-center justify-center bg-transparent border-none p-1 rounded-full hover:bg-[#bfa600]/20 transition"
                                            onClick={() => removeFromCart(item.gameId)}
                                            aria-label="Eliminar"
                                            title="Eliminar"
                                        >
                                            <Remove sx={{ color: '#bfa600', fontSize: 24 }} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center px-4">
                            <span className="text-lg sm:text-xl font-medium text-center text-white">
                                Añade objetos al carro
                            </span>
                        </div>
                    )}
                    {cart.length > 0 && (
                        <div className="w-full px-4 py-4 border-t border-[#bfa600] bg-[#232323]">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-white">Precio oficial:</span>
                                <span className="font-semibold text-[#bfa600]">{getPrice().toFixed(2)}€</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-white">Precio rebajado:</span>
                                <span className="font-semibold text-[#bfa600]">{getDiscountedPrice().toFixed(2)}€</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-medium text-white">Subtotal:</span>
                                <span className="font-bold text-[#bfa600]">{getTotalPrice().toFixed(2)}€</span>
                            </div>
                            <button
                                className="w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition bg-[#bfa600] text-[#232323] shadow-md hover:bg-[#a88f00]"
                                onClick={handleNavigation}
                            >
                                Confirmar Compra <ShoppingBag sx={{ color: '#232323' }} />
                            </button>
                        </div>
                    )}
                </div>
            </Drawer>
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    return useContext(CartContext);
};