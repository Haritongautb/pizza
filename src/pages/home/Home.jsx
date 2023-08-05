import { useState, useEffect } from "react";
import {
    Categories,
    Sort,
    PizzaList
} from "../../components";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sorting, setSorting] = useState("rating");
    const [category, setCategory] = useState(0);


    useEffect(() => {
        // https://64ca2176b2980cec85c2ec03.mockapi.io/items
        setIsLoading(true);
        fetch(`https://64ca2176b2980cec85c2ec03.mockapi.io/items?sortBy=${sorting}&order=desc`)
            .then(response => response.json())
            .then(data => setItems(items => data))
            .then(() => setIsLoading(false))
        // Если пропишем это здесь, то это не будет ждать fetch и isLoading сразу будет false не ожидая fetch. Произойдет асинхронная операция
        // setIsLoading(false)

        // Эффект, чтобы при нажатии на других страницах назад, на главной странице сразу проскроллится на вверх. Дело в том, что бразуер сохраняет скролл предыдущих страницах, а так при появлении на главной странице пользователя сразу проскроллит на вверх
        window.scrollTo(0, 0)
    }, [sorting])

    const sortPizzas = (index) => {
        setSorting(index);
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    category={category}
                    setCategory={setCategory} />
                <Sort
                    sortPizzas={sortPizzas}
                    sorting={sorting} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <PizzaList
                pizzas={items}
                isLoading={isLoading}
                category={category} />
        </div>
    )
}

export default Home;