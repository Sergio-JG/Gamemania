import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material"
import { User } from "../../interfaces/GameInterface"

type CreditCardDialogProps = {
    open: boolean;
    onClose: () => void;
    selectedUser: User | null;
};

const CreditCardDialog = ({ open, onClose, selectedUser }: CreditCardDialogProps) => {
    const creditCard = selectedUser?.creditCard;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Tarjeta de crédito</DialogTitle>
            <DialogContent>
                {creditCard ? (
                    <div key={creditCard.creditCardId}>
                        <Typography variant="subtitle1">Usuario: {creditCard.userId}</Typography>
                        <Typography variant="subtitle1">Dirección: {creditCard.billingAddress}</Typography>
                        <Typography variant="subtitle1">Titular: {creditCard.cardHolderName}</Typography>
                        <Typography variant="subtitle1">Número: {creditCard.cardNumber}</Typography>
                        <Typography variant="subtitle1">CVV: {creditCard.cvv}</Typography>
                        <Typography variant="subtitle1">Vencimiento: {creditCard.expirationDate}</Typography>
                    </div>
                ) : (
                    <Typography variant="body2">No se ha encontrado tarjeta de crédito.</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CreditCardDialog;

