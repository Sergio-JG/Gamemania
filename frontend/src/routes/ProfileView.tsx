import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Divider } from '@mui/material';
import { CreditCard, User, Sale, Social, Address } from '../interfaces/GameInterface';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const Profile: React.FC = () => {

  {/* SALE */ }

  const [saleData, setSaleData] = useState<Sale[]>([]);

  const fetchSaleData = async () => {
    try {
      const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/sale/byUser/${userId}`);
      const result: Sale[] = response.data;
      setSaleData(result);
    } catch (error) {
      //console.error('ERROR fetching data:', error);
    }
  };

  {/* USER DATA */ }

  const [userData, setUserData] = useState<User>({} as User);
  const [editedUserData, setEditedUserData] = useState({} as User);
  const [personalInfoEditMode, setPersonalInfoEditMode] = useState(false);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${userId}`);
      const result = response.data;
      if (!personalInfoEditMode) {
        setUserData(result[0]);
        setEditedUserData(result[0]);

        if (result[0].address) {
          setEditedAddressData(result[0].address);
        }

        if (result[0].social) {
          setEditedSocialData(result[0].social);
        }

        if (result[0].creditCard) {
          setEditedCreditCardData(result[0].creditCard);
        }
      }
    } catch (error) {
      console.error('ERROR fetching personal info:', error);
    }
  };

  const handleUserDataChange = (field: string, value: string) => {
    if (editedUserData) {
      setEditedUserData({
        ...editedUserData,
        [field]: value,
      });
    }
  };

  const handlePersonalInfoSubmit = async () => {

    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';

    editedUserData.userId = userId;
    editedUserData.address = editedAddressData;
    editedUserData.social = editedSocialData;
    //editedUserData.creditCard = editedCreditCardData;

    if (validateData()) {
      try {
        const response = await axios.post(`http://localhost:8080/user`, editedUserData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status == 200) {
          console.log("CORRECTO")
        }
      } catch (error) {
        console.error('ERROR submitting data:', error);
      }
      try {
        const response = await axios.put(`${userId}/user/${userId}`, editedUserData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status == 200) {
          console.log("CORRECTO")
          fetchUserData();
          setPersonalInfoEditMode(false);
          setCreditCardEditMode(false);
          setAddressEditMode(false);
          setSocialEditMode(false);
        }
      } catch (error) {
        console.error('ERROR submitting data:', error);
      }
    }
  };
  const handlePersonalInfoEdit = () => {
    setPersonalInfoEditMode(true);
  };
  const handlePersonalInfoCancelEdit = () => {
    setPersonalInfoEditMode(false);
  };

  {/* SALE PAGINATION */ }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  const totalPages = Math.ceil(saleData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = saleData.slice(indexOfFirstItem, indexOfLastItem);

  {/* ADDRESS */ }

  const [addressEditMode, setAddressEditMode] = useState(false);
  const [editedAddressData, setEditedAddressData] = useState({} as Address);

  const handleAddressDataChange = (field: string, value: string) => {
    if (editedAddressData) {
      setEditedAddressData({
        ...editedAddressData,
        [field]: value,
      });
    }
  };

  const handleAddressDataEdit = () => {
    setAddressEditMode(true);
  };
  const handleAddressDataCancelEdit = () => {
    setAddressEditMode(false);
  };

  {/* SOCIALS */ }

  const [socialEditMode, setSocialEditMode] = useState(false);
  const [editedSocialData, setEditedSocialData] = useState({} as Social);

  const handleSocialDataChange = (field: string, value: string) => {
    if (editedSocialData) {
      setEditedSocialData({
        ...editedSocialData,
        [field]: value,
      });
    }
  };

  const handleSocialDataEdit = () => {
    setSocialEditMode(true);
  };
  const handleSocialCancelEdit = () => {
    setSocialEditMode(false);
  };

  {/* CREDIT CARD */ }

  const [editedCreditCardData, setEditedCreditCardData] = useState<CreditCard>({} as CreditCard);
  const [creditCardEditMode, setCreditCardEditMode] = useState(false);

  const handleCreditCardDataChange = (field: string, value: string) => {
    if (editedCreditCardData) {
      setEditedCreditCardData({
        ...editedCreditCardData,
        [field]: value,
      });
    }
  };

  const handleCreditCardSubmit = async () => {

    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
    editedCreditCardData.userId = userId;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/creditCard`, editedCreditCardData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status == 200) {
        setCreditCardEditMode(false);
        fetchUserData();
        console.log("CORRECTO")
      }
    } catch (error) {
      setCreditCardEditMode(false);
      fetchUserData();
      console.error('ERROR submitting data:', error);
    }

    setCreditCardEditMode(false);
    fetchUserData();

  };

  const handleCreditCardEdit = () => {
    setCreditCardEditMode(true);
  };
  const handleCreditCardCancelEdit = () => {
    setCreditCardEditMode(false);
    fetchUserData();
  };

  {/* VALIDATION */ }

  const [errors, SetErrors] = useState({
    generalError: '',
    emailError: '',
  });

  const validateData = () => {

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    let isValid = true;

    if (editedUserData.firstName.trim() === '') {
      isValid = false;
    }

    { /* EMAIL ERROR */ }

    if (editedUserData.email.trim() === '') {
      isValid = false;
      SetErrors((prevErrors) => ({
        ...prevErrors,
        emailError: 'El email no puede estar vacio',
      }));
    } else if (!editedUserData.email.match(emailRegex)) {
      isValid = false;
      SetErrors((prevErrors) => ({
        ...prevErrors,
        emailError: 'La sintaxis del email no es válida',
      }));
    }

    return isValid;
  };

  {/* GENERAL */ }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchUserData(); fetchSaleData(); }, []);

  return (
    <>
      <Header />
      <div className="mx-auto px-2 sm:px-8 md:px-24 lg:px-32 py-8 bg-neutral-800 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* User Profile Card */}
          <div className="rounded-2xl shadow-lg p-8 flex-1 border border-gray-700 bg-[#18181b] min-w-0">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-white font-['Roboto_Slab','Roboto',sans-serif] tracking-tight">
              Perfil de usuario
            </h2>
            {/* USER */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 text-white font-['Roboto_Slab','Roboto',sans-serif]">Información personal</h3>
              <div className="space-y-4">
                {[
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
                ].map(({ label, field, value, display, error }) => (
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
              <Divider className="my-6" />
              <div className="flex justify-center gap-4 mt-4">
                {personalInfoEditMode ? (
                  <>
                    <Button variant="contained" onClick={handlePersonalInfoSubmit} className="bg-blue-600 font-bold">Aceptar</Button>
                    <Button variant="outlined" onClick={handlePersonalInfoCancelEdit}>Cancelar</Button>
                  </>
                ) : (
                  <Button variant="contained" onClick={handlePersonalInfoEdit} className="bg-blue-600 font-bold">Editar</Button>
                )}
              </div>
            </div>
            {/* SOCIAL */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 text-white font-['Roboto_Slab','Roboto',sans-serif]">Redes sociales</h3>
              <div className="space-y-4">
                <div>
                  {socialEditMode ? (
                    <TextField
                      label="Discord Tag"
                      value={editedSocialData.discordTag}
                      onChange={(e) => handleSocialDataChange('discordTag', e.target.value)}
                      fullWidth
                      className="bg-gray-50 rounded"
                      size="small"
                    />
                  ) : (
                    <div className="text-gray-200 flex items-center gap-2">
                      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/discord.svg" alt="Discord" className="w-5 h-5" />
                      <span className="font-medium">Discord:</span>{" "}
                      {userData?.social?.discordTag ? (
                        userData?.social?.discordTag
                      ) : (
                        <span className="text-gray-500">No hay datos</span>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  {socialEditMode ? (
                    <TextField
                      label="Steam URL"
                      value={editedSocialData.steamUrl}
                      onChange={(e) => handleSocialDataChange('steamUrl', e.target.value)}
                      fullWidth
                      className="bg-gray-50 rounded"
                      size="small"
                    />
                  ) : (
                    <div className="text-gray-200 flex items-center gap-2">
                      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/steam.svg" alt="Steam" className="w-5 h-5" />
                      <span className="font-medium">Steam:</span>{" "}
                      {userData?.social?.steamUrl ? (
                        userData?.social?.steamUrl
                      ) : (
                        <span className="text-gray-500">No hay datos</span>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  {socialEditMode ? (
                    <TextField
                      label="Twitch URL"
                      value={editedSocialData.twitchUrl}
                      onChange={(e) => handleSocialDataChange('twitchUrl', e.target.value)}
                      fullWidth
                      className="bg-gray-50 rounded"
                      size="small"
                    />
                  ) : (
                    <div className="text-gray-200 flex items-center gap-2">
                      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitch.svg" alt="Twitch" className="w-5 h-5" />
                      <span className="font-medium">Twitch:</span>{" "}
                      {userData?.social?.twitchUrl ? (
                        userData?.social?.twitchUrl
                      ) : (
                        <span className="text-gray-500">No hay datos</span>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  {socialEditMode ? (
                    <TextField
                      label="YouTube URL"
                      value={editedSocialData.youtubeUrl}
                      onChange={(e) => handleSocialDataChange('youtubeUrl', e.target.value)}
                      fullWidth
                      className="bg-gray-50 rounded"
                      size="small"
                    />
                  ) : (
                    <div className="text-gray-200 flex items-center gap-2">
                      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg" alt="YouTube" className="w-5 h-5" />
                      <span className="font-medium">YouTube:</span>{" "}
                      {userData?.social?.youtubeUrl ? (
                        userData?.social?.youtubeUrl
                      ) : (
                        <span className="text-gray-500">No hay datos</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Divider className="my-6" />
              {socialEditMode ? (
                <div className="flex gap-4 justify-end mt-4">
                  <Button variant="contained" onClick={handlePersonalInfoSubmit} className="bg-blue-600 font-bold">Aceptar</Button>
                  <Button variant="outlined" onClick={handleSocialCancelEdit}>Cancelar</Button>
                </div>
              ) : (
                <div className="flex justify-center mt-4">
                  <Button variant="contained" onClick={handleSocialDataEdit} className="bg-blue-600 font-bold">Editar</Button>
                </div>
              )}
            </div>
            {/* ADDRESS */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 text-white font-['Roboto_Slab','Roboto',sans-serif]">Dirección</h3>
              <div className="space-y-4">
                <div>
                  {addressEditMode ? (
                    <TextField
                      label="Ciudad"
                      value={editedUserData?.address?.city}
                      onChange={(e) => handleAddressDataChange('city', e.target.value)}
                      fullWidth
                      className="bg-gray-50 rounded"
                      size="small"
                    />
                  ) : (
                    <div className="text-gray-200">
                      <span className="font-medium">Ciudad:</span>{" "}
                      {userData?.address?.city ? (
                        userData?.address?.city
                      ) : (
                        <span className="text-gray-500">No hay datos</span>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  {addressEditMode ? (
                    <TextField
                      label="País"
                      value={editedUserData?.address?.country}
                      onChange={(e) => handleAddressDataChange('country', e.target.value)}
                      fullWidth
                      className="bg-gray-50 rounded"
                      size="small"
                    />
                  ) : (
                    <div className="text-gray-200">
                      <span className="font-medium">País:</span>{" "}
                      {userData?.address?.country ? (
                        userData?.address?.country
                      ) : (
                        <span className="text-gray-500">No hay datos</span>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  {addressEditMode ? (
                    <TextField
                      label="Código postal"
                      value={editedUserData?.address?.postalCode}
                      onChange={(e) => handleAddressDataChange('postalCode', e.target.value)}
                      fullWidth
                      className="bg-gray-50 rounded"
                      size="small"
                    />
                  ) : (
                    <div className="text-gray-200">
                      <span className="font-medium">Código postal:</span>{" "}
                      {userData?.address?.postalCode ? (
                        userData?.address?.postalCode
                      ) : (
                        <span className="text-gray-500">No hay datos</span>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  {addressEditMode ? (
                    <TextField
                      label="Estado"
                      value={editedUserData?.address?.state}
                      onChange={(e) => handleAddressDataChange('state', e.target.value)}
                      fullWidth
                      className="bg-gray-50 rounded"
                      size="small"
                    />
                  ) : (
                    <div className="text-gray-200">
                      <span className="font-medium">Provincia:</span>{" "}
                      {userData?.address?.state ? (
                        userData?.address?.state
                      ) : (
                        <span className="text-gray-500">No hay datos</span>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  {addressEditMode ? (
                    <TextField
                      label="Dirección"
                      value={editedUserData?.address?.streetAddress}
                      onChange={(e) => handleAddressDataChange('streetAddress', e.target.value)}
                      fullWidth
                      className="bg-gray-50 rounded"
                      size="small"
                    />
                  ) : (
                    <div className="text-gray-200">
                      <span className="font-medium">Dirección:</span>{" "}
                      {userData?.address?.streetAddress ? (
                        userData?.address?.streetAddress
                      ) : (
                        <span className="text-gray-500">No hay datos</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Divider className="my-6" />
              {addressEditMode ? (
                <div className="flex gap-4 justify-end mt-4">
                  <Button variant="contained" onClick={handlePersonalInfoSubmit} className="bg-blue-600 font-bold">Aceptar</Button>
                  <Button variant="outlined" onClick={handleAddressDataCancelEdit}>Cancelar</Button>
                </div>
              ) : (
                <div className="flex justify-center mt-4">
                  <Button variant="contained" onClick={handleAddressDataEdit} className="bg-blue-600 font-bold">Editar</Button>
                </div>
              )}
            </div>
            {/* CREDIT CARD */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white font-['Roboto_Slab','Roboto',sans-serif]">Tarjeta de crédito</h3>
              {!creditCardEditMode ? (
                <div className="space-y-4">
                  {userData?.creditCard?.length > 0 ? (
                    userData?.creditCard?.map((card: CreditCard, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 shadow mb-2">
                        <div className="font-semibold text-lg mb-2 font-['Roboto_Slab','Roboto',sans-serif]">Tarjeta {index + 1}:</div>
                        <div className="text-gray-700">Número: {card.cardNumber ? card.cardNumber : <span className="text-gray-500">No hay datos</span>}</div>
                        <div className="text-gray-700">Titular: {card.cardHolderName ? card.cardHolderName : <span className="text-gray-500">No hay datos</span>}</div>
                        <div className="text-gray-700">Fecha de expiración: {card.expirationDate ? card.expirationDate : <span className="text-gray-500">No hay datos</span>}</div>
                        <div className="text-gray-700">CVV: {card.cvv ? card.cvv : <span className="text-gray-500">No hay datos</span>}</div>
                        <div className="text-gray-700">Dirección de facturación: {card.billingAddress ? card.billingAddress : <span className="text-gray-500">No hay datos</span>}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No hay datos de tarjetas de crédito</div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <TextField
                    label="Dirección de facturación"
                    value={editedCreditCardData.billingAddress}
                    onChange={(e) => handleCreditCardDataChange('billingAddress', e.target.value)}
                    fullWidth
                    className="bg-gray-50 rounded"
                    size="small"
                  />
                  <TextField
                    label="Nombre del titular"
                    value={editedCreditCardData.cardHolderName}
                    onChange={(e) => handleCreditCardDataChange('cardHolderName', e.target.value)}
                    fullWidth
                    className="bg-gray-50 rounded"
                    size="small"
                  />
                  <TextField
                    label="Número de la tarjeta"
                    value={editedCreditCardData.cardNumber}
                    onChange={(e) => handleCreditCardDataChange('cardNumber', e.target.value)}
                    fullWidth
                    className="bg-gray-50 rounded"
                    size="small"
                  />
                  <TextField
                    label="CVV"
                    value={editedCreditCardData.cvv}
                    onChange={(e) => handleCreditCardDataChange('cvv', e.target.value)}
                    fullWidth
                    className="bg-gray-50 rounded"
                    size="small"
                  />
                  <TextField
                    type="date"
                    label="Fecha de expiración"
                    value={editedCreditCardData.expirationDate}
                    onChange={(e) => handleCreditCardDataChange('expirationDate', e.target.value)}
                    fullWidth
                    className="bg-gray-50 rounded"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              )}
              {creditCardEditMode ? (
                <div className="flex gap-4 justify-end mt-4">
                  <Button variant="contained" onClick={handleCreditCardSubmit} className="bg-blue-600 font-bold">Aceptar</Button>
                  <Button variant="outlined" onClick={handleCreditCardCancelEdit}>Cancelar</Button>
                </div>
              ) : (
                <div className="flex justify-center mt-4">
                  <Button variant="contained" onClick={handleCreditCardEdit} className="bg-blue-600 font-bold">Añadir</Button>
                </div>
              )}
            </div>
          </div>
          {/* Purchases Card */}
          <div className="bg-[#18181b] rounded-2xl shadow-lg p-8 flex-1 min-w-0 border border-gray-700">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-white font-['Roboto_Slab','Roboto',sans-serif] tracking-tight">
              Mis compras
            </h2>
            <div className="space-y-6">
              {currentItems.map((sale, index) => (
                <div key={index} className="mb-4">
                  <div className="text-xl font-semibold mb-2 text-white font-['Roboto_Slab','Roboto',sans-serif]">
                    COMPRA: {new Date(sale.saleDate).toLocaleDateString()}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {sale?.saleDetail?.map((saleDetail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="border border-gray-700 rounded-lg p-4 min-w-[200px] flex-1 bg-neutral-700"
                      >
                        <div className="font-semibold text-white">{saleDetail.gameName}</div>
                        <div className="text-gray-300 text-sm">Cantidad: {saleDetail.quantity}</div>
                        <div className="text-gray-300 text-sm">Precio unitario: {saleDetail.unitPrice}</div>
                        <div className="text-gray-300 text-sm">Subtotal: {saleDetail.subtotal}</div>
                      </div>
                    ))}
                  </div>
                  <Divider className="my-4" />
                </div>
              ))}
            </div>
            {saleData.length > 0 ? (
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="bg-blue-600 font-bold"
                >
                  Anterior
                </Button>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="bg-blue-600 font-bold"
                >
                  Siguiente
                </Button>
              </div>
            ) : (
              <div className="flex justify-center mt-6">
                <span className="text-red-400 font-semibold">No hay compras disponibles</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Profile;