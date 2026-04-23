"use client";

import { purchaseDetailsSchema } from "@/app/schemas/purchaseDetailsSchema";
import { Box, Button, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";

function PurchaseDetails() {
    const initalValues = {
        first_name: "",
        last_name: "",
        patronymic: "",
        address: "",
        comment: "",
    };

    return (
        <Box sx={{ width: "65%" }}>
            <Formik
                initialValues={initalValues}
                validationSchema={purchaseDetailsSchema}
                onSubmit={(values) => {
                    fetch("http://localhost:8000/create_order/", {
                        method: "POST",
                        credentials: "include",
                        body: JSON.stringify({
                            shipping_address: values.address,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data);
                        })
                        .catch((error) => console.error("Помилка:", error));
                }}
            >
                {({ errors, isValid, touched, dirty }) => (
                    <Form style={{ display: "flex", flexDirection: "column" }}>
                        <Field
                            style={{ marginBottom: "12px" }}
                            name="first_name"
                            type="text"
                            as={TextField}
                            variant="outlined"
                            label="Ім'я"
                            error={Boolean(errors.first_name) && Boolean(touched.first_name)}
                            helperText={Boolean(touched.first_name) && errors.first_name}
                        />

                        <Field
                            style={{ marginBottom: "12px" }}
                            name="last_name"
                            type="text"
                            as={TextField}
                            variant="outlined"
                            label="Прізвище"
                            error={Boolean(errors.last_name) && Boolean(touched.last_name)}
                            helperText={Boolean(touched.last_name) && errors.last_name}
                        />

                        <Field
                            style={{ marginBottom: "12px" }}
                            name="patronymic"
                            type="text"
                            as={TextField}
                            variant="outlined"
                            label="По батькові"
                            error={Boolean(errors.patronymic) && Boolean(touched.patronymic)}
                            helperText={Boolean(touched.patronymic) && errors.patronymic}
                        />

                        <Field
                            style={{ marginBottom: "12px" }}
                            name="address"
                            type="text"
                            as={TextField}
                            variant="outlined"
                            label="Відділення пошти або домашня адреса"
                            error={Boolean(errors.address) && Boolean(touched.address)}
                            helperText={Boolean(touched.address) && errors.address}
                        />

                        <Field
                            style={{ marginBottom: "12px" }}
                            name="comment"
                            type="text"
                            as={TextField}
                            variant="outlined"
                            label="Коментар до замовлення"
                            error={Boolean(errors.comment) && Boolean(touched.comment)}
                            helperText={Boolean(touched.comment) && errors.comment}
                        />

                        <Button
                            sx={{ color: "white" }}
                            type="submit"
                            variant="contained"
                            color="main"
                            size="large"
                            disabled={!isValid || !dirty}
                        >
                            Підтвердити замовлення
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default PurchaseDetails;
