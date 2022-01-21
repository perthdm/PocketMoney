import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "antd/dist/antd.css";
import "assets/scss/style-antd.scss";
import "assets/scss/style-general.scss";
import AdminLayout from "layouts/Admin.js";
import UILogin from "views/Auth/UILogin";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/login"
        name="Login"
        render={(props) => <UILogin {...props} />}
      />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
