
export type PizzasTypes = {
    id: string;
    category: number;
    imageUrl: string;
    price: number;
    rating: number;
    sizes: number[];
    title: string;
    types: number[];
}

type PizzasProps = {
    pizzas: PizzasTypes[],
    status: string;

}

export default PizzasProps;