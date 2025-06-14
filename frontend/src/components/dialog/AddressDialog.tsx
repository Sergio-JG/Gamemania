import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material"
import { User } from "../../interfaces/GameInterface"

interface AddressDialogProps {
    open: boolean;
    onClose: () => void;
    selectedUser: User | null;
}

const AddressDialog: React.FC<AddressDialogProps> = React.memo(({ open, onClose, selectedUser }) => {

    if (!selectedUser) {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle> Address </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1">No address available.</Typography>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle> Address </DialogTitle>
            <DialogContent>
                <div>
                    <Typography variant="subtitle1" key={selectedUser.userId}> {selectedUser.address?.addressId} </Typography>
                    <Typography variant="subtitle1" key={selectedUser.userId}> {selectedUser.address?.city} </Typography>
                    <Typography variant="subtitle1" key={selectedUser.userId}> {selectedUser.address?.country} </Typography>
                    <Typography variant="subtitle1" key={selectedUser.userId}> {selectedUser.address?.postalCode} </Typography>
                    <Typography variant="subtitle1" key={selectedUser.userId}> {selectedUser.address?.state} </Typography>
                    <Typography variant="subtitle1" key={selectedUser.userId}> {selectedUser.address?.streetAddress} </Typography>
                </div>
            </DialogContent>
        </Dialog >
    );
});

export default AddressDialog;