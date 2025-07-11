
import { TextField, Divider, Button } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { User } from '../interfaces/GameInterface';

interface Props {
    userData: User;
    fetchUserData: () => void;
}

const SocialComponent: React.FC<Props> = ({ userData, fetchUserData }) => {

    const [socialInfoEditMode, setSocialInfoEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState<User>({
        ...userData,
        social: { ...userData.social }
    });


    const handleSocialInfoEdit = () => setSocialInfoEditMode(true);

    const handleSocialInfoCancelEdit = () => {
        setSocialInfoEditMode(false);
        setEditedUserData({ ...userData });
    };

    const handleUserDataChange = (field: string, value: string) => {
        setEditedUserData((prev) => ({
            ...prev,
            social: {
                ...prev.social,
                [field]: value,
            },
        }));
    };

    const handleSocialInfoSubmit = async () => {
        try {
            if (!editedUserData.social?.socialId) {
                const newSocial = {
                    ...editedUserData.social,
                };

                const postResponse = await axios.post(
                    `${import.meta.env.VITE_API_URL}/social`,
                    newSocial
                );

                const updatedUser = {
                    ...editedUserData,
                    social: postResponse.data,
                };

                const putResponse = await axios.put(
                    `${import.meta.env.VITE_API_URL}/user/${userData.userId}`,
                    updatedUser
                );

                if (putResponse.status === 200) {
                    setSocialInfoEditMode(false);
                    fetchUserData();
                }
            } else {
                const putResponse = await axios.put(
                    `${import.meta.env.VITE_API_URL}/user/${userData.userId}`,
                    editedUserData
                );

                if (putResponse.status === 200) {
                    setSocialInfoEditMode(false);
                    fetchUserData();
                }
            }
        } catch (error) {
            console.error("Error updating or creating user social info", error);
        }
    };

    useEffect(() => {
        setEditedUserData({ ...userData });
    }, [userData]);

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4 text-white font-['Roboto_Slab','Roboto',sans-serif]">
                Redes sociales
            </h3>
            <div className="space-y-4">
                {[
                    {
                        label: "Discord",
                        icon: "discord",
                        field: "discordTag",
                        value: editedUserData.social?.discordTag,
                        display: userData?.social?.discordTag,
                    },
                    {
                        label: "Steam",
                        icon: "steam",
                        field: "steamUrl",
                        value: editedUserData.social?.steamUrl,
                        display: userData?.social?.steamUrl,
                    },
                    {
                        label: "Twitch",
                        icon: "twitch",
                        field: "twitchUrl",
                        value: editedUserData.social?.twitchUrl,
                        display: userData?.social?.twitchUrl,
                    },
                    {
                        label: "YouTube",
                        icon: "youtube",
                        field: "youtubeUrl",
                        value: editedUserData.social?.youtubeUrl,
                        display: userData?.social?.youtubeUrl,
                    },
                ].map(({ label, icon, field, value, display }) => (
                    <div key={field}>
                        {socialInfoEditMode ? (
                            <TextField
                                label={label + (icon === "discord" ? " Tag" : " URL")}
                                value={value || ''}
                                onChange={(e) => handleUserDataChange(field, e.target.value)}
                                fullWidth
                                className="bg-gray-50 rounded"
                                size="small"
                            />
                        ) : (
                            <div className="text-gray-200 flex items-center gap-2">
                                <img
                                    src={`https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${icon}.svg`}
                                    alt={label}
                                    className="w-5 h-5"
                                />
                                <span className="font-medium">{label}:</span>{" "}
                                {display ? display : <span className="text-gray-500">No hay datos</span>}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Divider />

            {socialInfoEditMode ? (
                <div className="flex gap-4 justify-end mt-4">
                    <Button variant="contained" onClick={handleSocialInfoSubmit} className="bg-blue-600 font-bold">
                        Aceptar
                    </Button>
                    <Button variant="outlined" onClick={handleSocialInfoCancelEdit}>
                        Cancelar
                    </Button>
                </div>
            ) : (
                <div className="flex justify-center mt-4">
                    <Button variant="contained" onClick={handleSocialInfoEdit} className="bg-blue-600 font-bold">
                        Editar
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SocialComponent;
