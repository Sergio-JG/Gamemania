import { Dialog, DialogTitle, DialogContent } from '@mui/material';

const DescriptionDialog: React.FC<{ description: string | null; onClose: () => void }> = ({ description, onClose }) => {
    return (
        <Dialog open={Boolean(description)} onClose={onClose}>
            <DialogTitle>Description</DialogTitle>
            <DialogContent>{description}</DialogContent>
        </Dialog>
    );
};

export default DescriptionDialog;