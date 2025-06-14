import { Account, Provider } from '../../interfaces/GameInterface'
import HeaderAdmin from '../../components/HeaderAdmin';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Pagination, Grid, Typography, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';
import CreateProviderForm from '../../components/CreateProviderForm';
import FooterAdmin from '../../components/FooterAdmin';
import axios from 'axios';

const ProviderManage: React.FC = () => {

    const API_URL = 'http://localhost:8080/provider';

    const [providers, setProviders] = useState<[]>([]);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

    const handleFormClose = () => {
        setOpen(false);
        fetchProviders();
    };

    const fetchProviders = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch providers');
            }
            const providersData = await response.json();
            if (validateProvidersData(providersData)) {
                setProviders(providersData);
            } else {
                throw new Error('Invalid providers data');
            }
        } catch (error) {
            console.error('Error fetching providers:', error);
        }
    };

    const validateProvidersData = (data: any) => {
        console.log(data)
        return true;
    };

    useEffect(() => { fetchProviders(); }, []);

    const handleFormOpen = () => {
        setOpen(true);
    };

    {/* ACCOUNT */ }

    const [openAccountDialog, setOpenAccountDialog] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState({} as Provider);

    const handleOpenAccountDialog = (provider: Provider) => {
        setSelectedProvider(provider);
        setOpenAccountDialog(true);
    };

    const handleCloseAccountDialog = () => {
        setOpenAccountDialog(false);
    };

    {/* ELIMINACION */ }

    function handleElimination(provider: Provider): void {
        axios.delete(API_URL + "/" + provider.providerId)
            .then(response => {
                alert('Eliminado con exito' + response.data);
            })
            .catch(() => {
                alert('No se pueden eliminar un provedor asociado a compras o ventas');
            });
    }


    return (
        <div>
            <HeaderAdmin />
            <Grid container justifyContent={'center'} paddingY={4}>
                <Typography variant='h3'> Gestión de proveedores </Typography>
            </Grid>
            <Grid padding={5}>
                <TableContainer component={Paper} sx={{ minHeight: '57.5vh' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Cuenta</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {providers
                                .slice((page - 1) * 9, page * 9)
                                .map((provider: Provider) => (
                                    <TableRow key={provider.providerId}>
                                        <TableCell>{provider.name}</TableCell>
                                        <TableCell>{provider.address}</TableCell>
                                        <TableCell>{provider.phone}</TableCell>
                                        <TableCell>{provider.email}</TableCell>
                                        {provider.account ? (
                                            <TableCell onClick={() => handleOpenAccountDialog(provider)}> Cuenta </TableCell>
                                        ) : (
                                            <TableCell> No hay cuenta </TableCell>
                                        )}
                                        <TableCell>
                                            <Button onClick={() => handleElimination(provider)} variant="contained" color="error">
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                        <Pagination
                            count={Math.ceil(providers.length / 9)}
                            page={page}
                            onChange={(_event, value) => setPage(value)}
                        />
                    </Table>
                </TableContainer>
                <Grid container justifyContent="flex-end" paddingY={2} height={40}>
                    <Button onClick={handleFormOpen} variant="contained" color="success">Crear</Button>
                </Grid>
            </Grid>
            <FooterAdmin />
            <CreateProviderForm open={open} onClose={handleFormClose} />

            {/* ACCOUNT */}
            <Dialog open={openAccountDialog} onClose={handleCloseAccountDialog}>
                <DialogTitle> Datos de la cuenta </DialogTitle>
                <DialogContent>
                    <div>
                        {selectedProvider?.account && Array.isArray(selectedProvider.account) && selectedProvider.account.map((account: Account) => (
                            <Typography key={account.accountId} variant="subtitle1">{account.accountHolderName}: {account.accountBalance}</Typography>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default ProviderManage;
