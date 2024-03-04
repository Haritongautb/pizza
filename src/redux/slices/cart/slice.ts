import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { CartSliceState, CartItem } from "./types";

const initialState: CartSliceState = {
    items: getCartFromLS().data,
    typesName: ["тонкое", "традиционное"],
    totalPrice: getCartFromLS().totalPrice,
    
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // I. Первый вариант
        /*         addItem: (state, action) => {
                    state.items.push(action.payload)
                    state.totalPrice = Number(state.items.reduce((current, next) => current + Number(next.price), 0));
                },
                removeItem: (state, action) => {
                    state.items.filter(item => Number(item.id) !== Number(action.payload))
                },
                clearItems: (state) => {
                    state.items = [];
                } */
        // II. Второй вариант - более оптимизированный 
        addItem: (state, action: PayloadAction<CartItem>) => {
            // Мой вариант
            /*             if (!state.items.find(item => Number(item.id) === Number(action.payload.id))) {
                            state.items = [...state.items, { ...action.payload, count: 1 }];
                        } else {
                            state.items = [...state.items.map(item => { 
                                if (Number(item.id) === Number(action.payload.id)) {
                                    return { ...item, count: item.count + 1 }
                                }
                                return item;
                            })]
                        } */

            // I. Мой метод, чтобы в корзине были разные карточки, если пиццы отличались размерами или типами, чтобы не было подсчета одних и тех же пицц, в то время как у них разные типы и размеры, а название такое же. Связано с cartSlice в методе addItem(); и PizzaBlock
            /*             const findItem = state.items.find(item => item.title === action.payload.title && item.type === state.typesName[action.payload.type] && Number(item.size === Number(action.payload.size)));
                        if (findItem) {
                            if (findItem.type !== state.typesName[action.payload.type] || findItem.size !== action.payload.size) {
                                state.items.push({
                                    ...action.payload,
                                    count: 1,
                                    type: state.typesName[action.payload.type]
                                })
                            } else {
                                findItem.count++;
                            }
                        } else {
                            state.items.push({
                                ...action.payload,
                                count: 1,
                                type: state.typesName[action.payload.type]
                            })
                        }
                        state.totalPrice = state.items.reduce((current, next) => {
                            return (current + (next.count * next.price))
                        }, 0) */

            // Вариант чувака
            const findItem = state.items.find(item => item.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                    type: state.typesName[action.payload.type]
                })
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem: (state, action: PayloadAction<{id: string}>) => {
            const findItem = state.items.find(item => Number(item.id) === Number(action.payload.id));

            findItem.count === 1 ? state.items = state.items.filter(item => Number(item.id) !== Number(action.payload.id)) : findItem.count--;

            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(obj => Number(obj.id) !== Number(action.payload))
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
        // Мои методы
        /*         
        removeItem: (state, action) => {
                    if (Number(action.payload.count) === 1) {
                        state.items = state.items.filter(item => Number(item.id) !== Number(action.payload.id))
                    } else {
                        state.items = state.items.map(item => {
                            if (Number(item.id) === Number(action.payload.id)) {
                                return { ...item, count: item.count - 1 }
                            }
                            return item;
                        })
                    }
                    state.totalPrice = state.items.reduce((current, next) => {
                        return (current + (next.count * next.price))
                    }, 0)
                },
        removeItemByButton: (state, action) => {
                    state.items = state.items.filter(item => Number(item.id) !== Number(action.payload.id))
                    state.totalPrice = state.items.reduce((current, next) => {
                        return (current + (next.count * next.price))
                    }, 0)
                },
        clearItems: (state) => {
                    state.items = [];
                    state.totalPrice = state.items.reduce((current, next) => {
                        return (current + (next.count * next.price))
                    }, 0)
                } 
            */
        // Методы чувака

    }
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;