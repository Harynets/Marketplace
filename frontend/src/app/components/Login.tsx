import { Alert, Backdrop, Box, Button, Divider, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Field, FieldProps, Form, Formik } from "formik";
import { loginValidationSchema } from "../schemas/loginValidationSchema";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setIsAuthenticated: Dispatch<SetStateAction<boolean | null>>;
}

function Login({ open, setOpen, setIsAuthenticated }: Props) {
    const [alertError, setAlertError] = useState<string>("");

    return (
        <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={open}>
            <Paper sx={{ width: { xl: "20%", lg: "25%", md: "35%", sm: "50%", xs: "80%" }, padding: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <Box sx={{ width: "60%" }}>
                        <Typography variant="h4">Вхід</Typography>
                    </Box>
                    <Box sx={{ width: "40%", display: "flex", justifyContent: "end" }}>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Divider sx={{ marginBottom: "25px" }} />
                <Box>
                    {alertError ? (
                        <Alert sx={{ marginY: "14px" }} severity="error">
                            {alertError}
                        </Alert>
                    ) : null}
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={loginValidationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/`, {
                                method: "POST",
                                credentials: "include",
                                body: JSON.stringify({
                                    email: values.email,
                                    password: values.password,
                                }),
                                headers: {
                                    "Content-type": "application/json",
                                },
                            });

                            if (response.status === 200) {
                                setOpen(false);
                                setIsAuthenticated(true);
                            } else {
                                setAlertError("Пароль або адреса електронної пошти некоректні");
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form style={{ display: "flex", flexDirection: "column" }}>
                                <Box sx={{ marginBottom: "20px" }}>
                                    <Field name="email">
                                        {({ field, meta }: FieldProps) => (
                                            <TextField
                                                {...field}
                                                onFocus={() => {
                                                    setAlertError("");
                                                }}
                                                type="email"
                                                label="Пошта"
                                                error={meta.touched && Boolean(meta.error)}
                                                helperText={meta.touched && meta.error}
                                                fullWidth
                                            />
                                        )}
                                    </Field>
                                </Box>
                                <Box sx={{ marginBottom: "20px" }}>
                                    <Field name="password">
                                        {({ field, meta }: FieldProps) => (
                                            <TextField
                                                {...field}
                                                onFocus={() => {
                                                    setAlertError("");
                                                }}
                                                type="password"
                                                label="Пароль"
                                                error={meta.touched && Boolean(meta.error)}
                                                helperText={meta.touched && meta.error}
                                                fullWidth
                                            />
                                        )}
                                    </Field>
                                </Box>
                                <Button
                                    sx={{ color: "white" }}
                                    type="submit"
                                    variant="contained"
                                    color="main"
                                    disabled={isSubmitting}
                                >
                                    Увійти
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Paper>
        </Backdrop>
    );
}

export default Login;
