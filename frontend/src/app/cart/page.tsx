"use client";
import { Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CartInterface } from "../types/CartInterface";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import CartList from "./components/CartList";

function Cart() {
    const [data, setData] = useState<CartInterface>();

    const context = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const cartRetrieve = (retry = false) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart_retrieve/`, {
                method: "GET",
                credentials: "include",

                headers: {
                    "Content-type": "application/json",
                },
            })
                .then((res) => {
                    if (res.status === 401 && retry) {
                        context.checkAuth().then(() => {
                            cartRetrieve();
                        });
                        return;
                    }
                    return res.json();
                })
                .then((data) => {
                    if (!data) return;
                    setData(data);
                });
        };
        cartRetrieve(true);
    }, []);

    useEffect(() => {
        if (context.isAuthenticated === false) {
            context.checkAuth().then(() => {
                router.replace("/");
            });
        }
    }, [context.isAuthenticated]);

    if (context.isAuthenticated === null) {
        return (
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress size={60} color="success" />
                <Typography variant="h5" sx={{ margin: "16px" }}>
                    Завантаження
                </Typography>
            </Box>
        );
    }

    if (!data) {
        return;
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Paper variant="outlined" sx={{ width: "70%", padding: "20px" }}>
                <Typography variant="h5" sx={{ marginBottom: "30px" }}>
                    Кошик
                </Typography>

                {data.cart_items?.length > 0 ? (
                    <>
                        <CartList data={data} setData={setData} />
                        <Grid container spacing={2} sx={{ marginTop: "54px" }}>
                            <Grid size={6}>
                                <Button sx={{ color: "white" }} href="/purchase" color="main" variant="contained">
                                    Оформити замовлення
                                </Button>
                            </Grid>
                            <Grid size={6} sx={{ display: "flex", justifyContent: "end" }}>
                                <Typography variant="h5">Загальна сума: {Number(data.total_price).toFixed(2)} ₴</Typography>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <Typography variant="h5">Кошик пустий. Час це виправити!</Typography>
                )}
            </Paper>
        </Box>
    );
}

export default Cart;
