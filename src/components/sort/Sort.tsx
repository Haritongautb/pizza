import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SortPropertyEnum, SortTypeItems } from "../../redux/slices/filter/types";
import { selectFilter } from "../../redux/slices/filter/selectors";
import { setSortType } from "../../redux/slices/filter/slice";


// Если создаем Типа внтури самого используемого файла
// type SortValuesItems = {
//     id: string;
//     title: string;
// }

// I. Как указать массив объектов в TS
// {}[] - означает массив объектов
export const sortValues: SortTypeItems[] = [
    { "id": SortPropertyEnum.RATING_DESC, "title": "по популярности (DESC)" },
    { "id": SortPropertyEnum.RATING_ASC, "title": "по популярности (ASC)" },
    { "id": SortPropertyEnum.PRICE_DESC, "title": "по цене (DESC)" },
    { "id": SortPropertyEnum.PRICE_ASC, "title": "по цене (ASC)" },
    { "id": SortPropertyEnum.TITLE_DESC, "title": "по алфавиту (DESC)" },
    { "id": SortPropertyEnum.TITLE_ASC, "title": "по алфавиту (ASC)" }
]


export const Sort: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const { sortType } = useSelector(selectFilter);
    const sortRef = React.useRef<HTMLDivElement>(null);

    const [open, setIsOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        /* I. Почему не написали event: React.MouseEvent(HTMLBodyElement) 
        Здесь globalThis.MouseEvent - потому что слушатель вешается на документ.body, а не на реакт элемент, поэтому здесь не пишем 
        event: React.MouseEvent(HTMLBodyElement) 
        */
        const onHandleClickOutside = (event: globalThis.MouseEvent) => {
            // в composePath хранится массив элементов event
            if (!event.composedPath().includes(sortRef.current)) {
                setIsOpen(false);
            }
        }
        document.body.addEventListener("click", onHandleClickOutside);

        // чтобы когда компонент Sort удалялся из react, то вместе с этим компонентом удалился и слушатель, иначе при повторном render будет навешено куча слушателей и так постоянно будет при удалении и затем при вмонтировании снова в DOM будет снова повешено повторный слушатель
        return () => {
            document.body.removeEventListener("click", onHandleClickOutside);
        }
    }, [])

    const onHandleClick = (active: SortTypeItems) => {
        dispatch(setSortType(active));
        setIsOpen((open: boolean) => !open);
    }

    const renderElements = (arr: SortTypeItems[]) => arr.map((item: SortTypeItems) => <li
        key={item.id}
        className={sortType.id === item.id ? "active" : ""}
        onClick={() => onHandleClick(item)}
    >
        {item.title}
    </li>)

    const elements = open ? renderElements(sortValues) : null;
    const sortedValue = React.useMemo(() => {
        for (let i = 0; i < sortValues.length; i++) {
            if (sortValues[i].id === sortType.id) {
                return sortValues[i].title;
            }
        }
    }, [sortType]);


    return (
        <div
            ref={sortRef}
            className="sort">
            <div
                className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setIsOpen((open: boolean) => !open)}>
                    {
                        sortedValue
                    }
                </span>
            </div>
            {
                open &&
                <div className="sort__popup">
                    <ul>
                        {
                            elements
                        }
                    </ul>
                </div>
            }
        </div >
    )
}) 
