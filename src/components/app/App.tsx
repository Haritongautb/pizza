import React, {Suspense} from "react";
import Loadable from "react-loadable"; // Отличие от React.lazy в том, что эта библиотека умеет делать серверный рендеринг
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "../../layouts/mainLayout/MainLayout";

import Home from "../../pages/home/Home";
// Разделение на chunk/lazy loading. Все Страницы должны быть в Suspense
/* import Cart from "../../pages/cart/Cart";
import NotFound from "../../pages/notFound/NotFound";
import FullPizza from "../../pages/fullPizza/FullPizza"; */
// 

import "./app.scss";

// Разделение на chunk/lazy loading. Делаем после всех import. Все Страницы должны быть в Suspense
// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "../../pages/cart/Cart"));
// const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "../../pages/notFound/NotFound"));
// const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ "../../pages/fullPizza/FullPizza"));
// 
const Cart = Loadable({
  loader: () => import("../../pages/cart/Cart"),
  loading: () => <div>Loading...</div>,
});

const NotFound = Loadable({
  loader: () => import("../../pages/notFound/NotFound"),
  loading: () => <div>Loading...</div>,
});

const FullPizza = Loadable({
  loader: () => import("../../pages/fullPizza/FullPizza"),
  loading: () => <div>Loading...</div>,
});

// I. Типизация Props - Пример
/* 
    const Categories: React.FC<CategoriesValuesTypes> = ({value, onChangeCategory}) => {

    }

*/

function App() {

  // I. Мы создали MainLayout для Outlet. Зайди в MainLayout - там объяснение
  // index - значит, что путь будет точно таким же, как и у path element={<MainLayout />}
  /*  
    Все что помещено внутри   <Route path="/" element={<MainLayout />}></Route> - пойдет в компонент <Outlet/> - который находится в файле MainLayout 
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="pizza/:idPizza" element={<FullPizza />} />
      <Route path="*" element={<NotFound />} />
    </Route> 
  */

  return (
    <Router>
      {/* Или так Suspense накрыть */}
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {
            // Или так каждую страницу накрывать Suspense
/*               <>
            
                          <Route 
            path="cart" 
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Cart />
              </Suspense>
            } />
            <Route 
            path="pizza/:idPizza" 
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <FullPizza />
              </Suspense>
            } />
            <Route 
          path="*" 
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          } />
              </> */
          }

          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:idPizza" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      </Suspense>

    </Router>
  );
}

export default App;
