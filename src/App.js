import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ServiceAdd from "./components/ServiceAdd";
import ServiceList from "./components/ServiceList";
import ServiceFilter from "./components/ServiceFilter";
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Route path="/" exact>
                    <Redirect to="/services/"/>
                </Route>
                <Route path="/services/" exact>
                    <ServiceFilter/>
                    <ServiceList/>
                </Route>
                <Route path="/services/new" exact component={ServiceAdd}/>
                <Route path="/services/:id(\d+)">
                    <ServiceAdd/>
                </Route>
            </div>
        </Router>
    );
}

export default App;
