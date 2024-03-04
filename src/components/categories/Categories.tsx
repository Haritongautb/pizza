import React from "react";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";
import { useSelector } from "react-redux";

import { CategoriesProps, CategoriesValuesTypes } from "./categoriesTypes";
import { selectFilter } from "../../redux/slices/filter/selectors";

// I. Типизация Props - Пример
/* 
    const Categories: React.FC<CategoriesValuesTypes> = ({value, onChangeCategory}) => {

    }
*/
const categories: CategoriesValuesTypes[] = [
    { "id": "all", "title": "все" },
    { "id": "meat", "title": "мясные" },
    { "id": "vegan", "title": "вегетарианский" },
    { "id": "grill", "title": "гриль" },
    { "id": "spicy", "title": "острые" },
    { "id": "closed", "title": "закрытые" }
];

// React.memo - нужен для того, чтобы предотвратить лишние перерисовки, если у нас пропсы не изменились или нам не потребутся, чтобы он перерисовывался
export const Categories: React.FC<CategoriesProps> = React.memo(({onChangeCategory, getCategories}) => {
    // Данный хук из библиотеки ahooks используется, чтобы проверить из-за чего рендерится компонент, он проверяет и следит только за пропсами и все!!!!
    useWhyDidYouUpdate('Categories', {onChangeCategory, getCategories});
    // Проверяем если есть функция getCategories - то вызываем его
    getCategories?.();
    
    const { categoryId } = useSelector(selectFilter);

    const renderElements = (arr: CategoriesValuesTypes[]) => arr.map((item: CategoriesValuesTypes, index: number) => <li
        key={item.id}
        onClick={() => onChangeCategory(index)}
        className={index === categoryId ? "active" : ""}>
        {item.title}
    </li>)

    const elements = renderElements(categories);
    return (
        <div className="categories">
            <ul>
                {
                    elements
                }
            </ul>
        </div>
    )
})

