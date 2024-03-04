import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {Categories, Sort, PizzaList, Pagination} from "../../components";
import { useAppDispatch } from "../../redux/store";
import { selectFilter } from "../../redux/slices/filter/selectors";
import { setCategoryId, setCurrentPage } from "../../redux/slices/filter/slice";
import { selectPizzas } from "../../redux/slices/pizzas/selectors";
import { fetchPizzas } from "../../redux/slices/pizzas/slice";

export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
  };

const Home: React.FC = () => {
    const { categoryId, sortType, currentPage, search } = useSelector(selectFilter);
    const { pizzasStatusLoading } = useSelector(selectPizzas);

    const { items } = useSelector(selectPizzas);
    // const dispatch = useDispatch();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef<boolean>(false);
    const isMounted = React.useRef<boolean>(false);

    // const [isLoading, setIsLoading] = useState(false);
    // const [categoryId, setCategoryId] = useState(0);
    // const [sortType, setSortType] = useState(
    //     { "id": "rating", "title": "по популярности (DESC)" }
    // );

    // III. Для пагинации
    // const [currentPage, setCurrentPage] = useState(1);

    // I. Почему не стоит или даже нельзя использовать useEffect(() => {}, [search]) при наличии подписки на useContext
    //     const { search } = useContext(SearchContext);
    /*     
    I. Будь осторожнее!!! При изменении хотя бы одного состояния в контексте, рендериться будут все комопненты, которые были подписаны на этот контекс (не на свойство). Пример : При изменении stateA - ComponentA и ComponentB - будут рендериться снова, хотя ComponentB не подписан на stateA
        AppContext value={{stateA, stateB}}
        <ComponentA />
        <ComponentB /> 
    Вот почему стоит в больших приложениях использовать redux. redux позволяет контролировать render
    */
    // При слежки за value из контекста и при измении этого value - компонент будет рендериться снова и не нужно использовать useEffect и следить за изменениями этого value. В данном случае в value из AppContext мы следим за search и при малейшем изменении этого search наш компонент будет заново ренедриться, потому что мы здесь используем useContext, и это значит, что мы следим за этим переменным search
    /*     const _sortBy = sortType.id.replace('-', '');
        const _order = sortType.id.includes('-') ? 'asc' : 'desc';
        const _category = categoryId > 0 ? `category=${categoryId}` : '';
        const _searchValue = search ? `search=${search}` : ""; */

    // III. парсим - делаем для того, чтобы при при будущем написании в url, url сам подставлял нам адресную строку, если мы раньше были по этому url

    // IV. Все useEffect срабатываются по порядку их написания!!!!!!!!!!!!!!!

    // Если изменили параметры и был первый render 
    // Navigate просто перемешает нас на страницу, который мы указываем в параметре и ничего не рендерит и никак не влияет на запрос. Он просто достает путь запроса и вшивает в url
    // При первом ку render даже если его переменные/зависимые в массиве не поменялись useEffect все равно сработает и поэтому делаем проверку для того, чтобы navigate не вшил путь в url при первом render
    
    // баг при повторной перезагрузки
/*     React.useEffect(() => {
        // Короче проверка, если первого render не было, то в url ничего не нужно писать. navigate вшивает в адресную строчку url (если бы проверки не было, то при первом render в url была бы написана путь запроса, хотя по логике при первом render пользователь заходит впервые и еще ничего не запрашивал)
        if (isMounted.current) {
            console.log("navigateInner")
            const queryString = qs.stringify({
                id: sortType.id,
                categoryId,
                currentPage,
            })
            console.log(queryString);
            // Изменяет в адресной строчке
            navigate(`?${queryString}`);
        }
        // для того, чтобы при первом render в url не было никаких надписей путей, потому что пользователь впервые на главной странице и еще ничего не выбирал
        isMounted.current = true;
    }, [categoryId, sortType, search, currentPage]) */

    // isSearch для того, чтобы не было двойного запроса при первом захода на страницу, то есть при первом render страницы
    // Если был первый render, то проверяем URL-параметры и сохраняем в redux
    // Делаем проверку, для того чтобы при первом render не было два запроса из-за изначального initialState и fetch делает запрос, и затем здесь происходит dispatch и как бы появились новые данные и снова происходит fetch и происходит второй раз перерисовка
    // При первом render window.location.search идет пустота, и if не срабатывает, isSearch - false. Далее срабатывает useEffect fetch. Далее клиент нажимает на любую кнопку на странице, navigate вшивает это в url и при последующем запуске сайта сработает window.location.search, потому что navigate вшил в url и у нас есть адресная строка и далее сработает dispatch и isSearch = true (но из-за того, что остальные useEffect еще не отработали при первом render, react не сделает обновлении useEffect, у которых есть подписка в параметрах на dispatch ), dispatch произошел, но наш useEffect fetch еще не отработал при первом render и поэтому срабатывает useEffect для fetch, но так как isSearch был true fetch не запросит данные для первого render. Далее isSearch - false и при дальнейших нажатиях на остальных кнопок сработает useEffect для fetch
    // баг при повторной перезагрузки
/*     React.useEffect(() => {
        console.log("parse")
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      console.log(params);
      const sort = sortValues.find((obj) => obj.title === params.sortBy);
      console.log(params.category);
      dispatch(
        setFilters({
          search: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sortType: sort || sortValues[0],
        }),
      );
    }
    isMounted.current = true;
    }, []); */

    // - конец парсинга 

    // II. Метод сортировки по search с помощью front end. 
    // const pizzas = search ? items.filter(item => item.title.toLowerCase().includes(search.toLowerCase())) : items;

    // II. Метод сортировик с помощью backend. Мы добавляем search в массив useEffect

    // V. Неважно, если при первом рендере обновились данные в store все равно всу useEffect отработают, и только после отработки все useEffect, те useEffect, у которых в параметрах подписаны на эти изменения будут реагировать на изменения store 

    React.useEffect(() => {
        // Эффект, чтобы при нажатии на других страницах назад, на главной странице сразу проскроллится на вверх. Дело в том, что бразуер сохраняет скролл предыдущих страницах, а так при появлении на главной странице пользователя сразу проскроллит на вверх
        // баг при повторной перезагрузки
/*         window.scrollTo(0, 0)
        console.log(isSearch.current);
        if (!isSearch.current) {
            console.log("fetchinner")
            getPizzas();
        }

        isSearch.current = false; */

        getPizzas();
    }, [categoryId, sortType, search, currentPage])


    const getPizzas = async () => {
        const _sortBy = sortType.id.replace('-', '');
        const _order = sortType.id.includes('-') ? 'asc' : 'desc';
        const _category = categoryId > 0 ? `category=${categoryId}` : '';
        const _searchValue = search ? `search=${search}` : "";
        try {
            // setIsLoading(true);
            dispatch(fetchPizzas({
                _sortBy,
                _order,
                _category,
                _searchValue,
                currentPage
            }));
        } catch (e) {
            alert(`ERROR: ${e.message}`);
        }
    }

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories onChangeCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                pizzasStatusLoading === "error" ?
                    <div className="content__error-info">
                        <h2>Something is wrong</h2>
                        <p>Please reload pizza's page in 1 minut....</p>
                    </div> :
                    <PizzaList
                        pizzas={items}
                        status={pizzasStatusLoading}
                    />
            }

            <Pagination currentPage={currentPage} onHandlePageClick={(page: number) => dispatch(setCurrentPage(page + 1))} />
        </div>
    )
}

export default Home;