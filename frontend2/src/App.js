import React from "react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import PageNotFound from "./components/PageNotFound";

export default function App() {
  const userloged = useSelector((state) => state.loginUserReducer.userLoged);

  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route component={PageNotFound} exact />
      </Switch>
    </BrowserRouter>
  );
}
