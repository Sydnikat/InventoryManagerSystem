import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { RootState } from "./store/rootReducer";
import { useSelector } from "react-redux";
import SupplierHome from "./components/SupplierHome";
import ManagerHome from "./components/ManagerHome";

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            user === undefined ? (
              <Redirect to="/signin" />
            ) : user.roles.includes("MANAGER") ? (
              <Redirect to="/stockManager" />
            ) : user.roles.includes("SUPPLIER") ? (
              <Redirect to="/supplies" />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route
          path="/supplies"
          render={() =>
            user !== undefined && user.roles.includes("SUPPLIER") ? (
              <SupplierHome />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        <Route
          path="/stockManager"
          render={() =>
            user !== undefined && user.roles.includes("MANAGER") ? (
              <ManagerHome />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
