import React from "react";
import { Outlet } from "react-router-dom";
import {Header} from "../../components";

const MainLayout: React.FC = () => {
    // I. зачем Outlet и зачем мы со0здали MainLayout? 
    // Это скорее для правильной расстановки структуры компонентов
    // Мы создали именно такой порядок, который сейчас стоит в App для того, чтобы выделить тот часть компонентов, который всегда будет на сайте не будет меняться, и тот часть компонентов, которые будут динамическими,
    // В компоненте Outlet теперь поместятся компоненты/компоненты страницы Route, которые будут динамическими, а остальное не будет никогда меняться, но это не отменяет, тот факт, что компоненты, которые никогда не будут меняться не будут заново рендериться
    // То есть вне компонента outlet моджет быть footer и header или aside, это те компоненты, которые никогда не будут меняться и останутся нетронутыми

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Outlet />
            </div>

        </div>
    )
}

export default MainLayout;