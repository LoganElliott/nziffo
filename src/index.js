import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactGA.initialize("UA-120783237-1");

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="*" component={App} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
