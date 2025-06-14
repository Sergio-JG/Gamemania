import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material"
import { User } from "../../interfaces/GameInterface"

type SocialDialogProps = {
    open: boolean;
    onClose: () => void;
    selectedUser: User | null;
};

const SocialDialog = ({ open, onClose, selectedUser }: SocialDialogProps) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle> Redes sociales </DialogTitle>
            <DialogContent>
                {selectedUser && (
                    <div>
                        <Typography variant="subtitle1">{selectedUser.social?.socialId}</Typography>
                        <Typography variant="subtitle1">{selectedUser.social?.discordTag}</Typography>
                        <Typography variant="subtitle1">{selectedUser.social?.steamUrl}</Typography>
                        <Typography variant="subtitle1">{selectedUser.social?.twitchUrl}</Typography>
                        <Typography variant="subtitle1">{selectedUser.social?.youtubeUrl}</Typography>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
export default SocialDialog
