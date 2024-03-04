import { CartItem } from "../redux/slices/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";
export const getCartFromLS = () => {
    const data = localStorage.getItem("cart");

    return {
        data: data ? JSON.parse(data) as CartItem[]: [],
        totalPrice: data ? calcTotalPrice(JSON.parse(data)) : 0,
    }
}
