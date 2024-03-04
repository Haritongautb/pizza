import { RootState } from "../../store";

// Создание селекторов - чтобы каждый раз не писать const {что-то} = useSelector(state => state.что-то)
export const selectPizzas = (state: RootState) => state.pizzas;
// 