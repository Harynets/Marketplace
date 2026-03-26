"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Reviews from "./components/Reviews";
import Specifications from "./components/Specifications";
import Description from "./components/Description";
import ProductCarousel from "./components/ProductCarousel";
import MainInfo from "./components/MainInfo";
import ProductNavigation from "./components/ProductNavigation";

function Product() {
    const params = useParams<{ productId: string }>();

    const productId = Number(params.productId);

    const [data, setData] = useState<ProductInterface>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/product_retrieve/${productId}?format=json`)
            .then((res) => {
                if (res.status === 404) {
                    return null;
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.error("Error:", err);
            });
    }, [productId]);

    if (isLoading) {
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

    if (isNaN(productId) || data == null) {
        notFound();
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ width: { md: "70%", xs: "94%" } }}>
                <ProductNavigation />
                <Box sx={{ display: "flex", flexWrap: { sm: "wrap", md: "nowrap" }, flexDirection: { sm: "row", xs: "column" } }}>
                    <ProductCarousel images={data.images} />
                    <MainInfo data={data} />
                </Box>

                <Description description={data.description} />
                <Specifications specifications={data.specifications} />
                <Reviews reviews={data.reviews} />
            </Box>
        </Box>
    );
}

export default Product;
