import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface TermsDialogProps {
    open: boolean;
    onClose: () => void;
}

const TermsDialog: React.FC<TermsDialogProps> = ({ open, onClose }) => (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle className=" bg-neutral-900 font-['Roboto_Slab','Roboto',sans-serif] text-yellow-400 font-bold">
            Términos y Condiciones
        </DialogTitle>
        <DialogContent dividers className="bg-neutral-800 text-gray-200 font-['Roboto',sans-serif]">
            <p className="mb-4">
                Al realizar una compra en GameMania, aceptas que los productos digitales no tienen devolución una vez entregados.
                Asegúrate de que tus datos personales y de pago sean correctos antes de confirmar la compra.
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>El pago se procesa de forma segura y tus datos están protegidos.</li>
                <li>Recibirás acceso inmediato a tus juegos tras la confirmación del pago.</li>
                <li>Para cualquier problema, contacta con nuestro soporte.</li>
                <li>GameMania se reserva el derecho de cancelar pedidos por actividad sospechosa.</li>
            </ul>
            <p>
                Si tienes dudas, revisa nuestra <a className="text-yellow-400">política de privacidad</a>.
            </p>
        </DialogContent>
        <DialogActions className="bg-neutral-900">
            <Button onClick={onClose} className="bg-yellow-400 text-black font-bold hover:bg-yellow-500">
                Cerrar
            </Button>
        </DialogActions>
    </Dialog>
);

export default TermsDialog;