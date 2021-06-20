import "./App.css";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Signin from "./containers/Signin";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, isUserLoggedIn ,getInitialData } from "./actions";
import { useEffect } from "react";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";
import Page from "./containers/NewPage"

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData())
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/page" component={Page}/>
        <PrivateRoute path="/category" component={Category}/>
        <PrivateRoute path="/products" component={Products}/>
        <PrivateRoute path="/orders" component={Orders}/>

        <Route  path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
