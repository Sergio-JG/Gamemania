import axios from 'axios';
import { Purchase, PurchaseDetail } from '../../interfaces/GameInterface'
import HeaderAdmin from '../../components/HeaderAdmin';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid, Pagination, Typography, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';
import FooterAdmin from '../../components/FooterAdmin';

const PurchaseManage: React.FC = () => {

    const API_URL = 'http://localhost:8080/purchase';

    const [purchase, setPurchases] = useState<Purchase[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get(API_URL);
                console.log(response.data)
                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching sales:', error);
            }
        };

        fetchSales();
    }, []);

    {/* Purchase DETAILS */ }

    const [openPurchaseDetailsDialog, setOpenPurchaseDetailsDialog] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState<Purchase>();

    const handleOpenPurchaseDetailDialog = (Purchase: Purchase) => {
        setSelectedPurchase(Purchase);
        setOpenPurchaseDetailsDialog(true);
    };

    const handleClosePurchaseDetailDialog = () => {
        setOpenPurchaseDetailsDialog(false);
    };


    return (
        <div>
            <HeaderAdmin />
            <Grid container justifyContent={'center'} paddingY={4}>
                <Typography variant='h3'> Gestión de compras </Typography>
            </Grid>
            <Grid padding={5}>
                <TableContainer component={Paper} sx={{ minHeight: '61vh' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Fecha de realizacion</TableCell>
                                <TableCell>Detalles de compra</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purchase.slice((page - 1) * 9, page * 9).map((purchase: Purchase) => (
                                <TableRow key={purchase.purchaseId}>
                                    <TableCell> {purchase.firstName} {purchase.secondName} </TableCell>
                                    <TableCell> {purchase.purchaseDate} </TableCell>
                                    <TableCell onClick={() => handleOpenPurchaseDetailDialog(purchase)}> Detalle </TableCell>
                                    <TableCell> {purchase.totalAmount} </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <Pagination
                            count={Math.ceil(purchase.length / 9)}
                            page={page}
                            onChange={(_event, value) => setPage(value)}
                        />
                    </Table>
                </TableContainer>
            </Grid>
            <FooterAdmin />
            {/* SALE DETAIL */}
            <Dialog open={openPurchaseDetailsDialog} onClose={handleClosePurchaseDetailDialog}>
                <DialogTitle> Detalles de venta </DialogTitle>
                <DialogContent>
                    <div>
                        {selectedPurchase?.purchaseDetail.map((purchaseDetail: PurchaseDetail) => (
                            <Typography key={purchaseDetail.purchaseDetailId} variant="subtitle1">{purchaseDetail.gameName} : {purchaseDetail.quantity}: {purchaseDetail.subtotal}</Typography>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PurchaseManage;
