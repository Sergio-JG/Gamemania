import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface FaqDialogProps {
    open: boolean;
    onClose: () => void;
}

const FaqDialog: React.FC<FaqDialogProps> = ({ open, onClose }) => (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle className="bg-neutral-900 font-['Roboto_Slab','Roboto',sans-serif] text-yellow-400 font-bold">
            Preguntas Frecuentes
        </DialogTitle>
        <DialogContent dividers className="bg-neutral-800 text-gray-200 font-['Roboto',sans-serif]">
            <ul className="list-disc pl-6 mb-4">
                <li>
                    <span className="font-bold text-yellow-400">¿Cómo recibo mis juegos?</span>
                    <br />
                    Recibirás acceso inmediato a tus juegos en tu perfil tras la confirmación del pago.
                </li>
                <li className="mt-2">
                    <span className="font-bold text-yellow-400">¿Puedo devolver un juego?</span>
                    <br />
                    No, los productos digitales no tienen devolución una vez entregados.
                </li>
                <li className="mt-2">
                    <span className="font-bold text-yellow-400">¿Qué métodos de pago aceptan?</span>
                    <br />
                    Aceptamos tarjetas de crédito y débito.
                </li>
                <li className="mt-2">
                    <span className="font-bold text-yellow-400">¿Cómo contacto con soporte?</span>
                    <br />
                    Puedes escribirnos a <a href="mailto:soporte@gamemania.com" className="text-yellow-400 underline">soporte@gamemania.com</a>.
                </li>
            </ul>
        </DialogContent>
        <DialogActions className="bg-neutral-900">
            <Button onClick={onClose} className="bg-yellow-400 text-black font-bold hover:bg-yellow-500">
                Cerrar
            </Button>
        </DialogActions>
    </Dialog>
);

export default FaqDialog;