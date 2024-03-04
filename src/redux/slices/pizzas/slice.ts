import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchPizzasArgs, Pizza, PizzaSliceState, Status } from "./types";

 
const initialState: PizzaSliceState = {
    items: [],
    pizzasStatusLoading: Status.WAITING
}

// I. Бизнес логика - это запросы на back, и затем что мы хотим с этим сделать. Вот зачем мы должны перенести эту функцию в redux, чтобы в будущем если нужно сделать запрос и получить данные не нужно было ставить весь этот код в другом файле, а просто импортировать эту функцию из redux
export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
    "pizza/fetchPizzas",
    // II. thunkApi - это объект, он расширяет возможности createAsyncThunk. Почитай об этом, ьакже благодаря ему мы можем вызвать здесь dispatch!!!! и сделать проверку как в data.length (к примеру проверить массив, который придет к нам из сервера, если он пустой мы можем передать его как rejected и вызвать компонент NotFoundBlock). Там есть еще многие полезные вещи.
    async (params, thunkApi) => {
        try{
            const { currentPage, _searchValue, _category, _sortBy, _order } = params;
            console.log(_category);
            // I. Этот чувак сортирует на сервере, то есть в mockAPI, етсь такие запросы для сортировки.
            // categoryId - это category в каждом item массива items. sortBy=sortType.id - сортировка по rating или по price или по title
            // То есть category это каждая кнопка Все, Мясные, Вегетарианская, Гриль, Острые, Закрытые 
            //  Мы говорим запросу верни мне все пиццы по категории номер category и отсортируй их по rating или по price или по title
            // sortType.id.replace("-", "") - чтобы не было минуса в запросе
            // Минус нужен, чтобы мы понимали делать запрос по убыванию или по возврастанию
            // sortType.id.includes("-") - сортировка по убыванию или по возрастанию
            const {data} = await axios.get<Pizza[]>(`https://64ca2176b2980cec85c2ec03.mockapi.io/items?page=${currentPage}&limit=4&${_searchValue}${_category}&sortBy=${_sortBy}&order=${_order}`)

            if (data.length === 0) {
                return thunkApi.rejectWithValue("Пиццы пустые!!");
            }
    
            return thunkApi.fulfillWithValue(data);
        } catch(error){
            const {message} = error;
            return thunkApi.rejectWithValue(message as string);
        }

    }
)

const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<Pizza[]>) => {
            state.items = action.payload;
        }
    },
    /*     extrareducers на самом деле похоже reducers на улучшения, но он был создан для обработки большего количества параметров, ОСОБЕННО ДРУГИХ ДЕЙСТВИЙ (НАПРИМЕР, СГЕНЕРИРОВАННЫХ В ДРУГИХ СЛАЙСАХ ИЛИ ДЕЙСТВИЙ, СДЕЛАННЫХ createAction или createAsyncThunk). Одним словом Все, что вы можете отправить в redux */
    // II. Это создано, чтобы писать с TS, то есть использование builder
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, state => {
                state.pizzasStatusLoading = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
                state.items = action.payload;
                state.pizzasStatusLoading = Status.LOADED;
            })
            .addCase(fetchPizzas.rejected, state => { 
                state.pizzasStatusLoading = Status.ERROR;
                state.items = [];
            })
            .addDefaultCase(() => { })
    },
    
    // II. Это создано, чтобы не использовать TS, то есть не используем builder как сверху
/*     extraReducers: {
        [fetchPizza.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizza.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizza.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        }
    } */
})


export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;