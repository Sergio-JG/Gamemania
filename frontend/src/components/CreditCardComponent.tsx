import { TextField, Divider, Button } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { User } from '../interfaces/GameInterface';

interface Props {
    userData: User;
    fetchUserData: () => void;
}

const CreditCardComponent: React.FC<Props> = ({ userData, fetchUserData }) => {
    const [cardInfoEditMode, setCardInfoEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState<User>({
        ...userData,
        creditCard: { ...userData.creditCard }
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleCardInfoEdit = () => setCardInfoEditMode(true);

    const handleCardInfoCancelEdit = () => {
        setCardInfoEditMode(false);
        setEditedUserData({ ...userData });
        setErrors({});
    };

    const handleCardDataChange = (field: string, value: string) => {
        setEditedUserData((prev) => ({
            ...prev,
            creditCard: {
                ...prev.creditCard,
                [field]: value,
            },
        }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        const card = editedUserData.creditCard;

        if (!card?.cardNumber || !/^\d{16}$/.test(card.cardNumber)) {
            newErrors.cardNumber = "El número debe tener 16 dígitos";
        }

        if (!card?.cardHolderName || card.cardHolderName.trim() === "") {
            newErrors.cardHolderName = "El nombre del titular es obligatorio";
        }

        if (
            !card?.expirationDate ||
            !/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expirationDate)
        ) {
            newErrors.expirationDate = "Formato inválido. Usa MM/YY";
        }

        if (!card?.cvv || !/^\d{3,4}$/.test(card.cvv)) {
            newErrors.cvv = "El CVV debe tener 3 o 4 dígitos";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCardInfoSubmit = async () => {

        if (!validate()) return;
        try {
            console.log("Submitting credit card data:", editedUserData);
            if (!editedUserData.creditCard?.creditCardId) {

                const newCard = { ...editedUserData.creditCard };
                editedUserData.creditCard.userId = userData.userId;

                const postResponse = await axios.post(
                    `${import.meta.env.VITE_API_URL}/creditCard`,
                    newCard
                );

                const updatedUser = {
                    ...editedUserData,
                    creditCard: postResponse.data,
                };

                const putResponse = await axios.put(
                    `${import.meta.env.VITE_API_URL}/user/${userData.userId}`,
                    updatedUser
                );

                if (putResponse.status === 200) {
                    setCardInfoEditMode(false);
                    fetchUserData();
                }
            } else {
                const putResponse = await axios.put(
                    `${import.meta.env.VITE_API_URL}/user/${userData.userId}`,
                    editedUserData
                );

                if (putResponse.status === 200) {
                    setCardInfoEditMode(false);
                    fetchUserData();
                }
            }
        } catch (error) {
            console.error("Error updating credit card", error);
        }
    };

    useEffect(() => {
        setEditedUserData({ ...userData });
        setErrors({});
    }, [userData]);

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Tarjeta de Crédito</h3>
            <div className="space-y-4 py-4">
                {([
                    {
                        label: "Número de Tarjeta",
                        field: "cardNumber",
                        value: editedUserData?.creditCard?.cardNumber,
                        display: userData?.creditCard?.cardNumber,
                    },
                    {
                        label: "Titular",
                        field: "cardHolderName",
                        value: editedUserData?.creditCard?.cardHolderName,
                        display: userData?.creditCard?.cardHolderName,
                    },
                    {
                        label: "Fecha de Expiración",
                        field: "expirationDate",
                        value: editedUserData?.creditCard?.expirationDate,
                        display: userData?.creditCard?.expirationDate,
                    },
                    {
                        label: "CVV",
                        field: "cvv",
                        value: editedUserData?.creditCard?.cvv,
                        display: userData?.creditCard?.cvv,
                    },
                ]).map(({ label, field, value, display }) => (
                    <div key={field}>
                        {cardInfoEditMode ? (
                            <>
                                <TextField
                                    label={label}
                                    value={value || ""}
                                    onChange={(e) => handleCardDataChange(field, e.target.value)}
                                    fullWidth
                                    className="bg-gray-50 rounded"
                                    size="small"
                                    error={Boolean(errors[field])}
                                    helperText={errors[field]}
                                />
                            </>
                        ) : (
                            <div className="text-gray-200">
                                <span className="font-medium">{label}:</span>{" "}
                                {display ? display : <span className="text-gray-500">No hay datos</span>}
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
