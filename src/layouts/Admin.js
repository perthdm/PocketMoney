import React, { useEffect, useRef, useState } from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

function Dashboard(props) {
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [activeColor, setActiveColor] = useState("info");
  const mainPanel = useRef();
  const location = useLocation();
  var ps;

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });

  useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  const handleActiveClick = (color) => {
    setActiveColor(color);
  };

  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        // activeColor={activeColor}
        activeColor={"info"}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
          <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
        <Footer fluid />
      </div>
      <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      />
    </div>
  );
}

export default Dashboard;
