import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material"
import { User } from "../../interfaces/GameInterface"

type CreditCardDialogProps = {
    open: boolean;
    onClose: () => void;
    selectedUser: User | null;
};

const CreditCardDialog = ({ open, onClose, selectedUser }: CreditCardDialogProps) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle> Tarjeta de credito </DialogTitle>
            <DialogContent>
                {selectedUser && selectedUser.creditCard?.map((creditCard) => (
                    <div key={creditCard.creditCardId}>
                        <Typography variant="subtitle1">{creditCard.userId}</Typography>
                        <Typography variant="subtitle1">{creditCard.billingAddress}</Typography>
                        <Typography variant="subtitle1">{creditCard.cardHolderName}</Typography>
                        <Typography variant="subtitle1">{creditCard.cardNumber}</Typography>
                        <Typography variant="subtitle1">{creditCard.cvv}</Typography>
                        <Typography variant="subtitle1">{creditCard.expirationDate}</Typography>
                    </div>
                ))}
            </DialogContent>
        </Dialog>
    )
}
export default CreditCardDialog
