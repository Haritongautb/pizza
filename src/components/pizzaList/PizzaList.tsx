import React from "react";
import { Link } from "react-router-dom";
import {PizzaBlock, PizzaSkeleton} from "../";

import PizzasProps from "./pizzaListTypes";
import { PizzasTypes } from "./pizzaListTypes";

export const PizzaList: React.FC<PizzasProps> = ({ pizzas, status }) => {

    const renderElements = (arr: undefined[] | {}[]) =>
        arr.map((item: PizzasTypes, index: number) => status === "loaded" ? <Link to={`/pizza/${item.id}`} key={item.title}><PizzaBlock {...item} /></Link> : <PizzaSkeleton key={`skeleton_pizza_${index}`} />);

    const elements = status === "loaded" ? renderElements(pizzas) : renderElements([...Array(8)]);

    // II. способ сортировки, если сервер не будет сортировать, то можно и на строне клиента сделать сортировку, то нужно тогда пробросить sorting из Home
    /*     const sortedPizzas = () => {
            if (isLoading) {
                return null;
            }
            switch (sorting) {
                case "rating": {
                    return pizzas.sort((a, b) => b.rating - a.rating)
                }
                case "price": {
                    return pizzas.sort((a, b) => b.price - a.price)
                }
                default:
                    return pizzas;
            }
        }
     
        const elements = isLoading ? renderElements([...Array(8)]) : category ? renderElements(sortedPizzas().filter(item => Number(item.category) === Number(category))) : renderElements(sortedPizzas()); */


    return (
        <div className="content__items">
            {
                elements
            }
        </div>
    )
}