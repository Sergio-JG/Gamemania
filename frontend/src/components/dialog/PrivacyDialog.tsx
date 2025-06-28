import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface PrivacyDialogProps {
    open: boolean;
    onClose: () => void;
}

const PrivacyDialog: React.FC<PrivacyDialogProps> = ({ open, onClose }) => (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle className="bg-neutral-900 font-['Roboto_Slab','Roboto',sans-serif] text-yellow-400 font-bold">
            Política de Privacidad
        </DialogTitle>
        <DialogContent dividers className="bg-neutral-800 text-gray-200 font-['Roboto',sans-serif]">
            <p className="mb-4">
                En GameMania, tu privacidad es importante. Tus datos personales solo se usan para procesar tus pedidos y mejorar tu experiencia.
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>No compartimos tus datos con terceros sin tu consentimiento.</li>
                <li>Utilizamos cifrado para proteger tu información de pago.</li>
                <li>Puedes solicitar la eliminación de tus datos en cualquier momento.</li>
            </ul>
            <p>
                Para más detalles, contacta con nuestro equipo de soporte.
            </p>
        </DialogContent>
        <DialogActions className="bg-neutral-900">
            <Button onClick={onClose} className="bg-yellow-400 text-black font-bold hover:bg-yellow-500">
                Cerrar
            </Button>
        </DialogActions>
    </Dialog>
);

export default PrivacyDialog;