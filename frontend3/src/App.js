import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./component/HomePage/index";
import PageNotFound from "./component/PageNotFound";

function App() {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route component={PageNotFound} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
