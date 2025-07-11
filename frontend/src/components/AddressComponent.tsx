import { TextField, Divider, Button } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { User } from '../interfaces/GameInterface';

interface Props {
    userData: User;
    fetchUserData: () => void;
}

const AddressComponent: React.FC<Props> = ({ userData, fetchUserData }) => {

    const [addressInfoEditMode, setAddressInfoEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState<User>({
        ...userData,
        address: { ...userData.address }
    });

    const handleAddressInfoEdit = () => setAddressInfoEditMode(true);
    const handleAddressInfoCancelEdit = () => {
        setAddressInfoEditMode(false);
        setEditedUserData({ ...userData });
    };

    const handleAddressDataChange = (field: string, value: string) => {
        setEditedUserData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value,
            },
        }));
    };

    const handleAddressInfoSubmit = async () => {
        try {
            console.log("Submitting address data:", editedUserData);
            if (!editedUserData.address?.addressId) {

                const newAddress = {
                    ...editedUserData.address,
                };

                const postResponse = await axios.post(
                    `${import.meta.env.VITE_API_URL}/address`,
                    newAddress
                );
                const updatedUser = {
                    ...editedUserData,
                    address: postResponse.data,
                };

                const putResponse = await axios.put(
                    `${import.meta.env.VITE_API_URL}/user/${userData.userId}`,
                    updatedUser
                );

                if (putResponse.status === 200) {
                    setAddressInfoEditMode(false);
                    fetchUserData();
                }
            } else {
                const putResponse = await axios.put(
                    `${import.meta.env.VITE_API_URL}/user/${userData.userId}`,
                    editedUserData
                );

                if (putResponse.status === 200) {
                    setAddressInfoEditMode(false);
                    fetchUserData();
                }
            }
        } catch (error) {
            console.error("Error updating address", error);
        }
    };

    useEffect(() => {
        setEditedUserData({ ...userData });
    }, [userData]);

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Dirección</h3>
            <div className="space-y-4 py-4">
                {([
                    {
                        label: "Calle",
                        field: "street",
                        value: editedUserData?.address?.street,
                        display: userData?.address?.street,
                    },
                    {
                        label: "Ciudad",
                        field: "city",
                        value: editedUserData?.address?.city,
                        display: userData?.address?.city,
                    },
                    {
                        label: "Provincia",
                        field: "state",
                        value: editedUserData?.address?.state,
                        display: userData?.address?.state,
                    },
                    {
                        label: "Código Postal",
                        field: "postalCode",
                        value: editedUserData?.address?.postalCode,
                        display: userData?.address?.postalCode,
                    },
                    {
                        label: "País",
                        field: "country",
                        value: editedUserData?.address?.country,
                        display: userData?.address?.country,
                    },
                ]).map(({ label, field, value, display }) => (
                    <div key={field}>
                        {addressInfoEditMode ? (
                            <>
                                <TextField
                                    label={label}
                                    value={value}
                                    onChange={(e) => handleAddressDataChange(field, e.target.value)}
                                    fullWidth
                                    className="bg-gray-50 rounded"
                                    size="small"
                                />
                                {/* {field === "email" && error && (
                                    <div className="text-xs text-red-500 mt-1">
                                        <span></span>
                                    </div>
                                )} */}
                            </>
                        ) : (
                            <div className="text-gray-200">
                                <span className="font-medium">{label}:</span>{" "}
                                {display ? (
                                    display
                                ) : (
                                    <span className="text-gray-500">No hay datos</span>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <Divider />
            {addressInfoEditMode ? (
                <div className="flex gap-4 justify-end mt-4">
                    <Button variant="contained" onClick={handleAddressInfoSubmit} className="bg-blue-600 font-bold">Aceptar</Button>
                    <Button variant="outlined" onClick={handleAddressInfoCancelEdit}>Cancelar</Button>
                </div>
            ) : (
                <div className="flex justify-center mt-4">
                    <Button variant="contained" onClick={handleAddressInfoEdit} className="bg-blue-600 font-bold">Editar</Button>
                </div>
            )}
        </div>
    );
};

export default AddressComponent;
