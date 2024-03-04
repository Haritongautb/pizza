import { RootState } from "../../store";

// Создание селекторов - чтобы каждый раз не писать const {что-то} = useSelector(state => state.что-то)
export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)
// 