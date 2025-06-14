import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Divider } from '@mui/material';
import { CreditCard, User, Sale, Social, Address } from '../interfaces/GameInterface';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile: React.FC = () => {

  {/* SALE */ }

  const [saleData, setSaleData] = useState<Sale[]>([]);

  const fetchSaleData = async () => {
    try {
      const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
      const response = await axios.get(`http://localhost:8080/sale/byUser/${userId}`);
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
      const response = await axios.get(`http://localhost:8080/user/${userId}`);
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
        const response = await axios.put(`http://localhost:8080/user/${userId}`, editedUserData, {
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
      const response = await axios.post(`http://localhost:8080/creditCard`, editedCreditCardData, {
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

  useEffect(() => { fetchUserData(); fetchSaleData(); }, []);

  return (
    <>
      <Header />
      <Grid container justifyContent={'space-evenly'} padding={5}>
        <Grid item xs={12} md={5} border={1} borderRadius={4} borderColor="grey.400" margin={2}>
          <Typography variant="h2" align="center" margin={2}> User Profile </Typography>
          <Grid container padding={2}>

            {/* USER */}

            <Grid item xs={12} sm={12}>
              <Typography variant="h6"> Información personal </Typography>
              <Grid item xs={12} sm={12} paddingY={2}>
                {personalInfoEditMode ? (
                  <TextField
                    label="First Name"
                    value={editedUserData?.firstName}
                    onChange={(e) => handleUserDataChange('firstName', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography>
                    First Name: {userData?.firstName || 'No hay datos'}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} paddingY={2}>
                {personalInfoEditMode ? (
                  <TextField
                    label="Last Name"
                    value={editedUserData?.lastName}
                    onChange={(e) => handleUserDataChange('lastName', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography>
                    Last Name: {userData?.lastName || 'No hay datos'}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} paddingY={2}>
                {personalInfoEditMode ? (
                  <><TextField
                    label="Email"
                    value={editedUserData?.email}
                    onChange={(e) => handleUserDataChange('email', e.target.value)}
                    fullWidth /><Typography variant='caption' color="error">
                      {errors.emailError && <span>{errors.emailError}</span>}
                    </Typography></>
                ) : (
                  <Typography>
                    Email: {userData?.email || 'No hay datos'}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} paddingY={2}>
                <Divider />
              </Grid>
            </Grid>
            {personalInfoEditMode ? (
              <Grid container justifyContent="space-between" padding={2}>
                <Grid item>
                  <Button variant="contained" onClick={handlePersonalInfoSubmit}>Aceptar</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handlePersonalInfoCancelEdit}>Cancelar</Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container justifyContent="center" padding={3}>
                <Grid item>
                  <Button variant="contained" onClick={handlePersonalInfoEdit}> Editar </Button>
                </Grid>
              </Grid>
            )}

            {/* SOCIAL */}

            <Grid item xs={12} sm={12}>
              <Typography variant="h6">Social Media</Typography>
              <Grid item xs={12} sm={12} paddingY={2}>
                {socialEditMode ? (
                  <TextField
                    label="Discord Tag"
                    value={editedSocialData.discordTag}
                    onChange={(e) => handleSocialDataChange('discordTag', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography>
                    Discord Tag: {userData?.social?.discordTag || 'No hay datos'}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} paddingY={2}>
                {socialEditMode ? (
                  <TextField
                    label="Steam URL"
                    value={editedSocialData.steamUrl}
                    onChange={(e) => handleSocialDataChange('steamUrl', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography>
                    Steam URL: {userData?.social?.steamUrl || 'No hay datos'}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} paddingY={2}>
                {socialEditMode ? (
                  <TextField
                    label="Twitch URL"
                    value={editedSocialData.twitchUrl}
                    onChange={(e) => handleSocialDataChange('twitchUrl', e.target.value)}
                    fullWidth
                  />
                ) : (<Typography>
                  Twitch URL: {userData?.social?.twitchUrl || 'No hay datos'}
                </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} paddingY={2}>
                {socialEditMode ? (
                  <TextField
                    label="YouTube URL"
                    value={editedSocialData.youtubeUrl}
                    onChange={(e) => handleSocialDataChange('youtubeUrl', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography>
                    YouTube URL: {userData?.social?.youtubeUrl || 'No hay datos'}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} paddingY={2}>
                <Divider />
              </Grid>
            </Grid>
            {socialEditMode ? (
              <Grid container justifyContent="space-between" padding={2}>
                <Grid item>
                  <Button variant="contained" onClick={handlePersonalInfoSubmit}>Aceptar</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleSocialCancelEdit}>Cancelar</Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container justifyContent="center" padding={3}>
                <Grid item>
                  <Button variant="contained" onClick={handleSocialDataEdit}> Editar </Button>
                </Grid>
              </Grid>
            )}

            {/* ADDRESS */}

            <Grid item xs={12} sm={12}>
              <Typography variant="h6">Address Information</Typography>
              <Grid item xs={12} sm={12} paddingY={2}>
                {addressEditMode ? (
                  <TextField
                    label="Ciudad"
                    value={editedUserData?.address?.city}
                    onChange={(e) => handleAddressDataChange('city', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography>
                    City: {userData?.address?.city || 'No hay datos'}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} paddingY={2}>
                {addressEditMode ? (
                  <TextField
                    label="Pais"
                    value={editedUserData?.address?.country}
                    onChange={(e) => handleAddressDataChange('country', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography>
                    Country: {userData?.address?.country || 'No hay datos'}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} paddingY={2}>
                {addressEditMode ? (
                  <TextField
                    label="Codigo postal"
                    value={editedUserData?.address?.postalCode}
                    onChange={(e) => handleAddressDataChange('postalCode', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography>
                    Postal Code: {userData?.address?.postalCode || 'No hay datos'}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} paddingY={2}>
                {addressEditMode ? (
                  <TextField
                    label="Estado"
                    value={editedUserData?.address?.state}
                    onChange={(e) => handleAddressDataChange('state', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography>
                    State: {userData?.address?.state || 'No hay datos'}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} paddingY={2}>
                {addressEditMode ? (
                  <TextField
                    label="Direccion de facturacion"
                    value={editedUserData?.address?.streetAddress}
                    onChange={(e) => handleAddressDataChange('streetAddress', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography>
                    Street Address: {userData?.address?.streetAddress || 'No hay datos'}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} paddingY={2}>
                <Divider />
              </Grid>
            </Grid>
            {addressEditMode ? (
              <Grid container justifyContent="space-between" padding={2}>
                <Grid item>
                  <Button variant="contained" onClick={handlePersonalInfoSubmit}>Aceptar</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleAddressDataCancelEdit}>Cancelar</Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container justifyContent="center" padding={3}>
                <Grid item>
                  <Button variant="contained" onClick={handleAddressDataEdit}> Editar </Button>
                </Grid>
              </Grid>
            )}

            {/* CREDIT CARD */}
            <Grid item xs={12} sm={12}>
              <Grid item xs={12} sm={12} paddingY={2}>
                <Typography variant="h6"> Tarjeta de crédito </Typography>
              </Grid>
              {!creditCardEditMode ? (
                <Grid item xs={12} spacing={2}>
                  {userData?.creditCard?.length > 0 ? (
                    userData?.creditCard?.map((card: CreditCard, index: number) => (
                      <Grid item xs={12} key={index}>
                        <Typography variant="h5" paddingY={1}>
                          Credit Card {index + 1}:
                        </Typography>
                        <Typography padding={1}>
                          Card Number: {card.cardNumber || 'No hay datos'}
                        </Typography>
                        <Typography padding={1}>
                          Card Holder Name: {card.cardHolderName || 'No hay datos'}
                        </Typography>
                        <Typography padding={1}>
                          Expiration Date: {card.expirationDate || 'No hay datos'}
                        </Typography>
                        <Typography padding={1}>
                          CVV: {card.cvv || 'No hay datos'}
                        </Typography>
                        <Typography padding={1}>
                          Billing Address: {card.billingAddress || 'No hay datos'}
                        </Typography>
                        <Divider />
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12} sm={12} paddingY={2}>
                      <Typography>No hay datos de tarjetas de crédito</Typography>
                    </Grid>
                  )}
                </Grid>
              ) : (
                <>
                  <Grid item xs={12} paddingY={1}>
                    <TextField
                      label="Dirección de facturación"
                      value={editedCreditCardData.billingAddress}
                      onChange={(e) => handleCreditCardDataChange('billingAddress', e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} paddingY={1}>
                    <TextField
                      label="Nombre del propietario"
                      value={editedCreditCardData.cardHolderName}
                      onChange={(e) => handleCreditCardDataChange('cardHolderName', e.target.value)}
                      fullWidth />
                  </Grid>
                  <Grid item xs={12} paddingY={1}>
                    <TextField
                      label="Número de la tarjeta"
                      value={editedCreditCardData.cardNumber}
                      onChange={(e) => handleCreditCardDataChange('cardNumber', e.target.value)}
                      fullWidth />
                  </Grid>
                  <Grid item xs={12} paddingY={1}>
                    <TextField
                      label="CVV"
                      value={editedCreditCardData.cvv}
                      onChange={(e) => handleCreditCardDataChange('cvv', e.target.value)}
                      fullWidth />
                  </Grid>
                  <Grid item xs={12} paddingY={1}>
                    <TextField
                      type='date'
                      label="Fecha de expiración"
                      value={editedCreditCardData.expirationDate}
                      onChange={(e) => handleCreditCardDataChange('expirationDate', e.target.value)}
                      fullWidth />
                  </Grid>
                </>
              )}
            </Grid>
            {creditCardEditMode ? (
              <Grid container justifyContent="space-between" padding={2}>
                <Grid item>
                  <Button variant="contained" onClick={handleCreditCardSubmit}>Aceptar</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleCreditCardCancelEdit}>Cancelar</Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container justifyContent="center" padding={3}>
                <Grid item>
                  <Button variant="contained" onClick={handleCreditCardEdit}> Añadir </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        {/* COMPRAS */}
        <Grid item xs={12} md={5} border={1} borderRadius={4} borderColor="grey.400" margin={2}>
          <Typography variant="h2" align="center" margin={2}> Mis compras </Typography>
          <Grid container padding={2}>
            {currentItems.map((sale, index) => (
              <Grid item xs={12} sm={12} key={index}>
                <Typography variant='h4'> COMPRA: {new Date(sale.saleDate).toLocaleDateString()}</Typography>
                <Grid container>
                  {sale?.saleDetail?.map((saleDetail, detailIndex) => (
                    <Grid item key={detailIndex} border={2} borderRadius={4} borderColor="grey.400" padding={2} margin={2}>
                      <Typography variant="h6">
                        {saleDetail.gameName}
                      </Typography>
                      <Typography variant="body2">
                        Quantity: {saleDetail.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Unit Price: {saleDetail.unitPrice}
                      </Typography>
                      <Typography variant="body2">
                        Subtotal: {saleDetail.subtotal}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
                <Grid item padding={2}>
                  <Divider />
                </Grid>
              </Grid>
            ))}
          </Grid>
          {saleData.length > 0 ? (
            <Grid item padding={3} display={'flex'} justifyContent={'flex-end'}>
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </Button>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Siguiente
              </Button>
            </Grid>
          ) : (
            <Grid item padding={3} display={'flex'} justifyContent={'center'}>
              <Typography color='error'> No hay compras disponibles</Typography>
            </Grid>
          )}
        </Grid>
      </Grid >
      <Footer />
    </>
  );
}

export default Profile;
