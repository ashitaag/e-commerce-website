import React, {Component} from 'react';
import Header from "./Component/header";
import Home from "./Component/Home";
import history from "./Component/history";
import Product from "./Component/Product";
import SignIn from "./Component/SignIn";
import Signup from "./Component/Signup";
import SignOut from "./Component/SignOut";
import Cart from "./Component/Cart";
import {ReactSession} from 'react-client-session';
import {BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends Component {
    render() {
        const data = ReactSession.get("username");

        return (
            <div >
            <Router history={history}>
            <Switch>
                <Route path="/SignIn" exact component={SignIn} />
                <Route path="/Product" component={Product} />
                <Route path="/Signup" component={Signup} />
                <Route path="/SignOut" component={SignOut} />
                <Route path="/Cart" component={Cart} />
                <Route path="/" component={Home} />
            </Switch>
            </Router></div>
        );
    }
}

export default App;