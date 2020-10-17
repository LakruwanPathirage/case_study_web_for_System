import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./componets/header";
import EditPrManagement from "./componets/editprmangement";
import PrManagementAndQuatations from "./componets/prmanagement";
import SupplierAndQuatations from "./componets/suppliersandquatations";
import Home from "./componets/Home";

import "./css/custom.css";
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
            <div className="container topnavigation">
              <a className="navbar-brand" href="#">
                GSTD Constructions
              </a>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNav"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item p-1">
                    <Link to={"/"} className="nav-Link">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item p-1">
                    <Link to={"/createPrManagementAndQuatations"}>PR</Link>
                  </li>

                  <li className="nav-item p-1">
                    <Link to={"/supplierandquatations"}>
                      Supplier & Quatations
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route
              exact
              path="/createPrManagementAndQuatations"
              component={PrManagementAndQuatations}
            />

            <Route
              exact
              path="/editPrManagementAndQuatation/:id"
              component={EditPrManagement}
            />

            <Route
              exact
              path="/supplierandquatations"
              component={SupplierAndQuatations}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
