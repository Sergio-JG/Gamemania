import { TextField, Divider, Button } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { CreditCard, User } from '../interfaces/GameInterface';

interface Props {
    userData: User;
    fetchUserData: () => void;
}

const CreditCardComponent: React.FC<Props> = ({ userData, fetchUserData }) => {

    const [cardInfoEditMode, setCardInfoEditMode] = useState(false);
    const [creditCardData, setCreditCardData] = useState<CreditCard>({} as CreditCard);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleCardDataChange = (field: string, value: string) => {
        setCreditCardData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };
    const handleCardInfoEdit = () => setCardInfoEditMode(true);
    const handleCardInfoCancelEdit = () => {
        fetchCardData();
        setCardInfoEditMode(false);
        setErrors({});
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        const card = creditCardData;

        if (!card.cardNumber || !/^\d{16}$/.test(card.cardNumber)) {
            newErrors.cardNumber = "El número debe tener 16 dígitos";
        }
        if (!card.cardHolderName?.trim()) {
            newErrors.cardHolderName = "El nombre del titular es obligatorio";
        }
        if (!card.expirationDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expirationDate)) {
            newErrors.expirationDate = "Formato inválido. Usa MM/YY";
        }
        if (!card.cvv || !/^\d{3,4}$/.test(card.cvv)) {
            newErrors.cvv = "El CVV debe tener 3 o 4 dígitos";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCardInfoSubmit = async () => {
        if (!validate()) return;
        try {
            if (creditCardData.creditCardId) {
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/creditCard/${creditCardData.creditCardId}`,
                    { ...creditCardData, userId: userData.userId }
                );
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/creditCard`, {
                    ...creditCardData,
                    userId: userData.userId,
                });
            }

            setCardInfoEditMode(false);
            fetchCardData();
            fetchUserData();
        } catch (error) {
            console.error("Error saving credit card:", error);
        }
    };

    const fetchCardData = async () => {
        try {
            const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/creditCard/user/${userId}`);
            if (res.data) setCreditCardData(res.data);
        } catch (error) {
            console.error("Error fetching credit card data:", error);
            setCreditCardData({} as CreditCard);
        }
    };


    useEffect(() => {
        fetchCardData();
        fetchUserData();
    }, []);

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Tarjeta de Crédito</h3>
            <div className="space-y-4 py-4">
                {([
                    { label: "Número de Tarjeta", field: "cardNumber" },
                    { label: "Titular", field: "cardHolderName" },
                    { label: "Fecha de Expiración", field: "expirationDate" },
                    { label: "CVV", field: "cvv" },
                    { label: "Dirección de Facturación", field: "billingAddress" },
                ] as const).map(({ label, field }) => (
                    <div key={field}>
                        {cardInfoEditMode ? (
                            <TextField
                                label={label}
                                value={creditCardData?.[field] || ""}
                                onChange={(e) => handleCardDataChange(field, e.target.value)}
                                fullWidth
                                className="bg-gray-50 rounded"
                                size="small"
                                error={Boolean(errors[field])}
                                helperText={errors[field]}
                            />
                        ) : (
                            <div className="text-gray-200">
                                <span className="font-medium">{label}:</span>{" "}
                                {creditCardData?.[field] || <span className="text-gray-500">No hay datos</span>}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <Divider />
            {cardInfoEditMode ? (
                <div className="flex gap-4 justify-end mt-4">
                    <Button variant="contained" onClick={handleCardInfoSubmit} className="bg-blue-600 font-bold">
                        Aceptar
                    </Button>
                    <Button variant="outlined" onClick={handleCardInfoCancelEdit}>
                        Cancelar
                    </Button>
                </div>
            ) : (
                <div className="flex justify-center mt-4">
                    <Button variant="contained" onClick={handleCardInfoEdit} className="bg-blue-600 font-bold">
                        Editar
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CreditCardComponent;
