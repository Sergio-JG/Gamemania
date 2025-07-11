import { Button, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../interfaces/GameInterface";
import axios from "axios";

interface Props {
    userData: User;
    fetchUserData: () => void;
}

const PersonalInfo: React.FC<Props> = ({ userData, fetchUserData }) => {

    const [personalInfoEditMode, setPersonalInfoEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState<User>({ ...userData });
    const [errors, setErrors] = useState<{ emailError?: string }>({});

    const handlePersonalInfoEdit = () => setPersonalInfoEditMode(true);

    const handlePersonalInfoCancelEdit = () => {
        setPersonalInfoEditMode(false);
        setEditedUserData({ ...userData });
        setErrors({});
    };

    const handleUserDataChange = (field: string, value: string) => {
        setEditedUserData({
            ...editedUserData,
            [field]: value,
        });
    };

    const handlePersonalInfoSubmit = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/user/${userData.userId}`, editedUserData
            );
            if (response.status == 200) {
                setPersonalInfoEditMode(false);
                fetchUserData();
            }
        } catch (error) {
            console.error("Error updating user data", error);
        }
    };

    useEffect(() => {
        setEditedUserData({ ...userData });
    }, [userData]);

    return (
        <>
            {/* Personal Info */}
            <div className="p-5">
                <h3 className="my-2 text-xl font-semibold text-white font-['Roboto_Slab','Roboto',sans-serif]">
                    Información personal
                </h3>
                <Divider />
                <div className="space-y-4 py-4">
                    {([
                        {
                            label: "Nombre",
                            field: "firstName",
                            value: editedUserData?.firstName,
                            display: userData?.firstName,
                        },
                        {
                            label: "Apellido",
                            field: "lastName",
                            value: editedUserData?.lastName,
                            display: userData?.lastName,
                        },
                        {
                            label: "Correo electrónico",
                            field: "email",
                            value: editedUserData?.email,
                            display: userData?.email,
                            error: errors.emailError,
                        },
                    ]).map(({ label, field, value, display, error }) => (
                        <div key={field}>
                            {personalInfoEditMode ? (
                                <>
                                    <TextField
                                        label={label}
                                        value={value}
                                        onChange={(e) => handleUserDataChange(field, e.target.value)}
                                        fullWidth
                                        className="bg-gray-50 rounded"
                                        size="small"
                                    />
                                    {field === "email" && error && (
                                        <div className="text-xs text-red-500 mt-1">
                                            <span>{error}</span>
                                        </div>
                                    )}
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
                <div className="flex justify-center gap-4 mt-4">
                    {personalInfoEditMode ? (
                        <>
                            <Button
                                variant="contained"
                                onClick={handlePersonalInfoSubmit}
                                className="bg-blue-600 font-bold"
                            >
                                Aceptar
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handlePersonalInfoCancelEdit}
                            >
                                Cancelar
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handlePersonalInfoEdit}
                            className="bg-blue-600 font-bold"
                        >
                            Editar
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default PersonalInfo;
