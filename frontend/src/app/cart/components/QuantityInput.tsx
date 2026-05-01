import { Box, IconButton, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AuthContext } from "@/app/context/AuthContext";
import React from "react";
import { CartInterface } from "@/app/types/CartInterface";

interface Props {
    cartItemId: number;
    quantity: number;
    price: number;
    setData: React.Dispatch<React.SetStateAction<CartInterface | undefined>>;
}

function QuantityInput({ cartItemId, quantity, price, setData }: Props) {
    const [value, setValue] = useState(quantity);

    const context = useContext(AuthContext);

    useEffect(() => {
        const updateCartItem = (retry = false) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/update_cart_item/`, {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify({
                    cart_item_id: cartItemId,
                    quantity: value,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            }).then((res) => {
                if (res.status === 401 && retry) {
                    context.checkAuth().then(() => {
                        updateCartItem();
                    });
                }

                return res.json();
            });
        };
        updateCartItem();
    }, [value]);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <IconButton
                onClick={() => {
                    if (value - 1 > 0) {
                        setData((data) => {
                            if (!data) return data;
                            return {
                                total_price: (Number(data.total_price) - price).toString(),
                                cart_items: data.cart_items.map((item) =>
                                    item.id === cartItemId ? { ...item, quantity: value - 1 } : item,
                                ),
                            };
                        });
                        setValue((value) => {
                            return value - 1;
                        });
                    }
                }}
            >
                <RemoveIcon />
            </IconButton>
            <TextField
                sx={{
                    "& input::-webkit-inner-spin-button": {
                        WebkitAppearance: "none",
                    },
                    "& input": {
                        textAlign: "center",
                    },

                    display: "flex",
                    justifyContent: "center",
                }}
                variant="outlined"
                type="number"
                size="small"
                value={value}
            />
            <IconButton
                onClick={() => {
                    setData((data) => {
                        if (!data) return data;
                        return {
                            total_price: (Number(data.total_price) + price).toString(),
                            cart_items: data.cart_items.map((item) =>
                                item.id === cartItemId ? { ...item, quantity: value + 1 } : item,
                            ),
                        };
                    });
                    setValue((value) => {
                        return value + 1;
                    });
                }}
            >
                <AddIcon />
            </IconButton>
        </Box>
    );
}

export default QuantityInput;
