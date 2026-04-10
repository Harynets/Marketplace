import { CartItemInterface } from "./CartItemInterface";

export interface CartInterface {
    full_price: string;
    cart_items: CartItemInterface[];
}
