import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";
import QuantityInput from "./QuantityInput";
import { AuthContext } from "@/app/context/AuthContext";
import { CartInterface } from "@/app/types/CartInterface";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItemInterface } from "@/app/types/CartItemInterface";

interface Props {
    item: CartItemInterface;
    setData: React.Dispatch<React.SetStateAction<CartInterface | undefined>>;
    mainImage: string | undefined;
}

function CartItem({ item, setData, mainImage }: Props) {
    const context = useContext(AuthContext);

    const handleDeleteCartItem = (item_id: number, price: number, retry = false) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete_cart_item/`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({
                cart_item_id: item_id,
            }),
            headers: {
                "Content-type": "application/json",
            },
        }).then((res) => {
            if (res.status === 401 && retry) {
                context.checkAuth().then(() => {
                    handleDeleteCartItem(item_id, price);
                });
            }
            if (res.status === 200) {
                setData((data) => {
                    if (!data) return data;
                    return {
                        total_price: (Number(data.total_price) - price * item.quantity).toString(),
                        cart_items: data?.cart_items.filter((item) => {
                            return item.id !== item_id;
                        }),
                    };
                });
            }

            return res.json();
        });
    };

    const price = Number(
        item.product.discount ? Number(item.product.price) * (1 - item.product.discount / 100) : item.product.price,
    );

    return (
        <Paper variant="outlined" sx={{ marginBottom: "16px", padding: "14px" }}>
            <Grid container spacing={20}>
                <Grid size={2}>
                    {mainImage ? (
                        <Link href={`/product/${item.product.id}`}>
                            <Avatar
                                sx={{ height: "160px", width: "160px" }}
                                alt="Фото товару в корзині"
                                src={mainImage}
                                variant="rounded"
                            />
                        </Link>
                    ) : null}
                </Grid>
                <Grid size={7} sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", flexGrow: 1 }}>
                        <Link href={`/product/${item.product.id}`}>
                            <Typography variant="h6">{item.product.name}</Typography>
                        </Link>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Button
                            onClick={() => {
                                handleDeleteCartItem(item.id, price, true);
                            }}
                            color="error"
                            startIcon={<DeleteIcon />}
                        >
                            Видалити
                        </Button>
                        <QuantityInput cartItemId={item.id} quantity={item.quantity} price={price} setData={setData} />
                    </Box>
                </Grid>
                <Grid size={3} sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "end" }}>
                        {item.product.discount ? (
                            <Box sx={{ marginBottom: "14px" }}>
                                <Typography
                                    variant="h6"
                                    fontWeight={"bold"}
                                    color="textSecondary"
                                    sx={{ textDecoration: "line-through", fontSize: "17px" }}
                                >
                                    {item.product.price} ₴
                                </Typography>
                                <Typography variant="h5" fontWeight={"bold"} sx={{ color: "black" }}>
                                    {price.toFixed(2)} ₴
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="h5" fontWeight={"bold"} sx={{ marginBottom: "14px" }}>
                                {price} ₴
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CartItem;
