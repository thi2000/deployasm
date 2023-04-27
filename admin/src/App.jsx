import "./App.css";
import "./css/custom.css";
import "./css/style.default.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Footer from "./Share/Footer/Footer";
import Header from "./Share/Header/Header";
import Home from "./Home/Home";
import Addproduct from "./Product/addproduct";
import UpdateProduct from "./Product/updateproduct";

import Cart from "./Cart/Cart";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />{" "}
          <Route exact path="/add" component={Addproduct} />{" "}
          <Route exact path="/update/:id" component={UpdateProduct} />{" "}
          <Route path="/signin" component={SignIn} />{" "}
          <Route path="/signup" component={SignUp} />{" "}
        </Switch>{" "}
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
