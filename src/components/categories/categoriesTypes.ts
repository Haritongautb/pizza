
export type CategoriesProps = {
    // void - значит ничего не возвращает
    // в аргументе можно писать все, главное написать что-нибудь и написать к какому типа он относится
    onChangeCategory: (index: number) => void;
    // Здесь опциональная проверка значит, что такая функция возможно будет передана или она может быть не передана, что TS не ругался, если в props этой функции не будет
    getCategories?: () => void;
}

export type CategoriesValuesTypes = {
    id: string;
    title: string;
}