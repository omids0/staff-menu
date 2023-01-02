import { BrowserRouter, Route, Switch } from "react-router-dom";
import BasketPage from "./component/BasketPage";
import HomePage from "./component/HomePage/index";
import MyOrder from "./component/MyOrders";
import PageNotFound from "./component/PageNotFound";
import PendingOrders from "./component/pendingOrder";
import ManageCustomers from "./component/ManageCustomers";
import AdminPage from "./component/AdminPage";

function App() {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/basket" component={BasketPage} exact />
        <Route path="/my_orders" component={MyOrder} exact />
        <Route path="/pending_orders" component={PendingOrders} exact />
        <Route path="/manage_customers" component={ManageCustomers} exact />
        <Route path="/manager" component={AdminPage} exact />
        <Route component={PageNotFound} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
