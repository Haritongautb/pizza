import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PizzaBlockTypesProps from "./pizzaBlockTypes";
import { selectCartItemById } from "../../redux/slices/cart/selectors";
import { CartItem } from "../../redux/slices/cart/types";
import { addItem } from "../../redux/slices/cart/slice";

// II.
// React.FC<PizzaBlockTypesProps> - Здесь мы говорим, что наш компонент - это функциональный компонент, который принимает еще на входе какие-то пропсы с типами
export const PizzaBlock: React.FC<PizzaBlockTypesProps> = ({ id, title, price, imageUrl, sizes, types }) => {
    const [activeType, setActiveType] = useState<number>(types[0]);
    const [activeSize, setActiveSize] = useState<number>(sizes[0]);

    const dispatch = useDispatch();
    // либо так
    const cartItem = useSelector(selectCartItemById(id));

    // либо так, но тогда в cartSlice должно быть это 
    /*     export const selectCartItemById = (id, state) => state.cart.items.find(obj => Number(obj.id) === Number(id)) */
    // const cartItem = useSelector(state => selectCartItemById(id, state))

    // I. Мой метод, чтобы в корзине были разные карточик, если пиццы отличались размерами или типами, чтобы не было подсчета одних и тех же пицц, в то время как у них разные типы и размеры, а название такое же. Связано с cartSlice в методе addItem(); и PizzaBlock
    /*     const items = useSelector(state => state.cart.items);
        console.log(items);
        const cartItems = items.filter(item => item.title === title); */
    const onClickAdd = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const item: CartItem = {
            id,
            title,
            price,
            imageUrl,
            type: activeType,
            size: activeSize,
            count: 0,
        }
        dispatch(addItem(item));
    }

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt={`Pizza image ${title}`}
                />
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            types.map(type => <li
                                key={type}
                                className={activeType === type ? "active" : ""}
                                onClick={(event) => {
                                    event.preventDefault();
                                    setActiveType(type)
                                }}
                            >
                                {type ? "традиционное" : "тонкое"}
                            </li>)
                        }
                    </ul>
                    <ul>
                        {
                            sizes.map(item => <li
                                key={item}
                                onClick={(event) => {
                                    event.preventDefault();
                                    setActiveSize(item)
                                }}
                                className={activeSize === item ? "active" : ""}
                            >
                                {item} см.
                            </li>)
                        }
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <div
                        onClick={onClickAdd}
                        className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>

                        <i>{
                            // I. Мой метод, чтобы в корзине были разные карточик, если пиццы отличались размерами или типами, чтобы не было подсчета одних и тех же пицц, в то время как у них разные типы и размеры, а название такое же. Связано с cartSlice в методе addItem(); и PizzaBlock
                            // cartItems.reduce((current, next) => current + next.count, 0)

                            // метод чувака простой подсчет и все
                            cartItem?.count
                        }</i>
                    </div>
                </div>
            </div>
        </div>

    )
}