import { CartInterface } from "@/app/types/CartInterface";
import React from "react";
import CartItem from "./CartItem";

interface Props {
    data: CartInterface;
    setData: React.Dispatch<React.SetStateAction<CartInterface | undefined>>;
}

function CartList({ data, setData }: Props) {
    return (
        <>
            {data.cart_items.map((item) => {
                let mainImage: string | undefined = item.product.images.find((value) => {
                    if (value.is_main_image) {
                        return value;
                    }
                })?.image;

                return <CartItem key={item.id} item={item} setData={setData} mainImage={mainImage} />;
            })}
        </>
    );
}

export default CartList;
