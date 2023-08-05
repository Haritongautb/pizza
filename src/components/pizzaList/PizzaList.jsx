import { PizzaBlock, PizzaSkeleton } from "../";


const PizzaList = ({ pizzas, isLoading, category }) => {

    const renderElements = (arr) =>
        arr.map((item, index) => isLoading ? <PizzaSkeleton key={`skeleton_pizza_${index}`} /> : <PizzaBlock key={item.title} {...item} />);

    const elements = isLoading ? renderElements([...Array(8)]) : category ? renderElements(pizzas.filter(item => Number(item.category) === Number(category)))
        : renderElements(pizzas);

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

export default PizzaList;