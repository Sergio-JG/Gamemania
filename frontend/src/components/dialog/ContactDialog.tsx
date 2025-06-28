import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface ContactDialogProps {
    open: boolean;
    onClose: () => void;
}

const ContactDialog: React.FC<ContactDialogProps> = ({ open, onClose }) => (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-neutral-900 font-['Roboto_Slab','Roboto',sans-serif] text-yellow-400 font-bold">
            Contacto
        </DialogTitle>
        <DialogContent dividers className="bg-neutral-800 text-gray-200 font-['Roboto',sans-serif]">
            <p className="mb-4">
                ¿Tienes alguna pregunta o problema? ¡Estamos aquí para ayudarte!
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Email: <a href="mailto:soporte@gamemania.com" className="text-yellow-400 underline">soporte@gamemania.com</a></li>
                <li>Teléfono: <span className="text-yellow-400">+34 900 123 456</span></li>
                <li>Horario: Lunes a Viernes, 9:00 - 18:00</li>
            </ul>
        </DialogContent>
        <DialogActions className="bg-neutral-900">
            <Button onClick={onClose} className="bg-yellow-400 text-black font-bold hover:bg-yellow-500">
                Cerrar
            </Button>
        </DialogActions>
    </Dialog>
);

export default ContactDialog;