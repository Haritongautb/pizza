import React from "react";
import { Link } from 'react-router-dom';
import img from "../../assets/img/empty-cart.png";
export const CartEmpty: React.FC = () => {
    return (
        <div className="cart cart--empty">
            <h2>Корзина пустая</h2>
            <p>
                Вероятней всего, вы не заказывали ещё пиццу.<br />
                Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={img} alt="Empty cart" />
            <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
    )
}
