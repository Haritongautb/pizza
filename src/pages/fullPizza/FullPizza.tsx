import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { pizzaTypes } from "./fullPizzaTypes";

const categories: string[] = ['мясные', 'вегетарианские', 'гриль', 'острые', 'закрытые'];

// React.FC - значит на выходе получаем функциональный компонент - Functional Component - пишем во всех компонентах
const FullPizza: React.FC = () => {
    const { idPizza } = useParams();
    const [pizza, setPizza] = React.useState<pizzaTypes>(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`https://64ca2176b2980cec85c2ec03.mockapi.io/items/${idPizza}`)
                setPizza(data);
            } catch (error) {
                alert(error);
                navigate("/");
            }
        })()
        // незачем писать в параметрах useEffect [idPizza] - поскольку эта страница все равно каждый раз будет загружаться 1 раз и делать запрос 1 раз запрос
    }, [])

    return (
        <div className="container">
            {

                pizza ?
                    <>
                        <img src={pizza.imageUrl} alt="Pizza" />
                        <h2>{pizza.title}</h2>
                        <div>{categories[pizza.category]}</div>
                        <h4>{pizza.price} P</h4>
                    </> :
                    <>"Loading contents..."</>

            }
        </div>
    )
}

export default FullPizza;