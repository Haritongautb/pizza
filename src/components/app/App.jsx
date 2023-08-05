import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import {
  Header,
} from "../";

import {
  Home,
  Cart,
  NotFound
} from "../../pages";

import "./app.scss";

function App() {

  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
