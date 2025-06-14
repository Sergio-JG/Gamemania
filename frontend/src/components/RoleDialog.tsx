import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material"
import { User } from "../interfaces/GameInterface"

type RoleDialogProps = {
    open: boolean;
    onClose: () => void;
    selectedUser: User | null;
};

const RoleDialog = ({ open, onClose, selectedUser }: RoleDialogProps) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle> Address </DialogTitle>
            <DialogContent>
                {selectedUser && (
                    <div>
                        <Typography variant="subtitle1"> ID: {selectedUser.role?.roleId}</Typography>
                        <Typography variant="subtitle1"> Nombre: {selectedUser.role?.name}</Typography>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
export default RoleDialog
