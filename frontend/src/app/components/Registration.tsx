import { Alert, Box, Button, TextField } from "@mui/material";
import { Field, FieldProps, Form, Formik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import { registrationValidationSchema } from "../schemas/registrationValidationSchema";
import { login } from "../../../utils/auth";

interface Props {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setIsAuthenticated: Dispatch<SetStateAction<boolean | null>>;
}

function Registration({ setOpen, setIsAuthenticated }: Props) {
    const [alertError, setAlertError] = useState<string>("");
    return (
        <Box>
            {alertError ? (
                <Alert sx={{ marginY: "14px" }} severity="error">
                    {alertError}
                </Alert>
            ) : null}
            <Formik
                initialValues={{ first_name: "", last_name: "", email: "", password: "" }}
                validationSchema={registrationValidationSchema}
                validateOnChange={false}
                onSubmit={async (values, { setSubmitting }) => {
                    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/`, {
                        method: "POST",
                        credentials: "include",
                        body: JSON.stringify({
                            first_name: values.first_name,
                            last_name: values.last_name,
                            email: values.email,
                            password: values.password,
                        }),
                        headers: {
                            "Content-type": "application/json",
                        },
                    });

                    if (response.status === 201) {
                        login(values.email, values.password);
                        setOpen(false);
                        setIsAuthenticated(true);
                    } else {
                        setAlertError("Помилка при реєстрації");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form style={{ display: "flex", flexDirection: "column" }}>
                        <Box sx={{ marginBottom: "20px" }}>
                            <Field name="first_name">
                                {({ field, meta }: FieldProps) => (
                                    <TextField
                                        {...field}
                                        onFocus={() => {
                                            if (alertError) {
                                                setAlertError("");
                                            }
                                        }}
                                        type="text"
                                        label="Ім'я"
                                        error={meta.touched && Boolean(meta.error)}
                                        helperText={meta.touched && meta.error}
                                        fullWidth
                                    />
                                )}
                            </Field>
                        </Box>
                        <Box sx={{ marginBottom: "20px" }}>
                            <Field name="last_name">
                                {({ field, meta }: FieldProps) => (
                                    <TextField
                                        {...field}
                                        onFocus={() => {
                                            if (alertError) {
                                                setAlertError("");
                                            }
                                        }}
                                        type="text"
                                        label="Прізвище"
                                        error={meta.touched && Boolean(meta.error)}
                                        helperText={meta.touched && meta.error}
                                        fullWidth
                                    />
                                )}
                            </Field>
                        </Box>
                        <Box sx={{ marginBottom: "20px" }}>
                            <Field name="email">
                                {({ field, meta }: FieldProps) => (
                                    <TextField
                                        {...field}
                                        onFocus={() => {
                                            if (alertError) {
                                                setAlertError("");
                                            }
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
                                            if (alertError) {
                                                setAlertError("");
                                            }
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
                        <Button sx={{ color: "white" }} type="submit" variant="contained" color="main" disabled={isSubmitting}>
                            Зареєструватися
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default Registration;
