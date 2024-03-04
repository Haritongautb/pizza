// type - может быть ли объектом и обычным const для TS - пример type CartItem = string[]; а interface - это всегда объект CartSliceState {}
export type CartItem = {
    id: string;
    title?: string;
    price?: number;
    imageUrl?: string;
    type?: string | number;
    size?: number;
    // знак ? - значит, что у элемента, который принимает тип CartItem может не быть данное свойство, а если у элемента его нет, то никакой ошибки не будет.
    count?: number;
}

/* 
interface - это всегда объект {}. Негласное правило, когда типизируют state - используют interface или если это вложенный данные (то есть большое количество данных, которых нужно типизировать вложенных друг в друга) 
*/
export interface CartSliceState {
    totalPrice: number,
    items: CartItem[];
    typesName: string[];
}