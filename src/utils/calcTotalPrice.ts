import { CartItem } from "../redux/slices/cart/types"

export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((current, next) => {
        return (current + (next.count * next.price))
    }, 0)
}