import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

interface Props {
    isAddToCartDialogOpen: boolean;
    setIsAddToCartDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddToCartDialog({ isAddToCartDialogOpen, setIsAddToCartDialogOpen }: Props) {
    const handleClose = () => {
        setIsAddToCartDialogOpen(false);
    };

    return (
        <Dialog open={isAddToCartDialogOpen} onClose={handleClose}>
            <DialogTitle>Товар успішно додано до кошика!</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ textAlign: "justify" }}>
                    Ви можете перейти до кошика, щоб оформити замовлення, або продовжити покупки.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="main" href="/">
                    На головну
                </Button>
                <Button color="main" href="/cart">
                    До кошика
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddToCartDialog;
