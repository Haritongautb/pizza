import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

// I. Типизация Props - Пример
/* 
    const Categories: React.FC<CategoriesValuesTypes> = ({value, onChangeCategory}) => {

    }

*/

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


