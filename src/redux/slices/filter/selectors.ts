import { RootState } from "../../store";

// Содание селекторов - чтобы каждый раз не писать const {что-то} = useSelector(state => state.что-то)
export const selectFilter = (state: RootState) => state.filter;
// 