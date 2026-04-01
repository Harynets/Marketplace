"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Login from "./Login";
import { Backdrop, Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Registration from "./Registration";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setIsAuthenticated: Dispatch<SetStateAction<boolean | null>>;
}

function LoginRegistrationBackdrop({ open, setOpen, setIsAuthenticated }: Props) {
    const [currentForm, setCurrentForm] = useState<"Вхід" | "Реєстрація">("Вхід");
    return (
        <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={open}>
            <Paper sx={{ width: { xl: "20%", lg: "25%", md: "35%", sm: "50%", xs: "80%" }, padding: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <Box sx={{ width: "60%" }}>
                        <Typography variant="h4">{currentForm}</Typography>
                    </Box>
                    <Box sx={{ width: "40%", display: "flex", justifyContent: "end" }}>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Divider sx={{ marginBottom: "25px" }} />
                {currentForm === "Вхід" ? (
                    <Login setOpen={setOpen} setIsAuthenticated={setIsAuthenticated} />
                ) : (
                    <Registration setOpen={setOpen} setIsAuthenticated={setIsAuthenticated} />
                )}
                <Box sx={{ marginTop: "18px" }}>
                    {currentForm === "Вхід" ? (
                        <Typography
                            sx={{ width: "fit-content", cursor: "pointer" }}
                            onClick={() => {
                                setCurrentForm("Реєстрація");
                            }}
                        >
                            Ви не зареєстровані?
                        </Typography>
                    ) : (
                        <Typography
                            sx={{ width: "fit-content", cursor: "pointer" }}
                            onClick={() => {
                                setCurrentForm("Вхід");
                            }}
                        >
                            Вже є акаунт?
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Backdrop>
    );
}

export default LoginRegistrationBackdrop;
