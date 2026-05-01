import { CartItemInterface } from "./CartItemInterface";

export interface CartInterface {
    total_price: string;
    cart_items: CartItemInterface[];
}
