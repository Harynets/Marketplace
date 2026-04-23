"use client";

import { useContext, useEffect, useState } from "react";
import PurchaseDetails from "./components/PurchaseDetails";
import { AuthContext } from "../context/AuthContext";
import { CartInterface } from "../types/CartInterface";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ProductsToPurchase from "./components/ProductsToPurchase";
import PurchasePrice from "./components/PurchasePrice";

function Purchase() {
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

    // redirect if no items in cart
    useEffect(() => {
        if (data !== undefined && data.cart_items.length === 0) {
            router.push("/");
        }
    }, [data]);

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

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: "70%" }}>
                    <Typography variant="h5" sx={{ marginBottom: "30px" }}>
                        Оформлення замовлення
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: "70%", display: "flex" }}>
                    <PurchaseDetails />
                    <Box sx={{ width: "35%" }}>
                        <PurchasePrice data={data} />
                        <ProductsToPurchase data={data} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Purchase;
