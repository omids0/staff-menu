import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { addToBasketReducer } from "./reducers/basketReducer";
import {
  addNewCustomerReducer,
  editCustomerReducer,
  findCustomerByIdReducer,
  findCustomerReducer,
  getAllCustomersReducer,
  removeCustomerReducer,
} from "./reducers/customersReducer";
import {
  addFoodToMenuReducer,
  editFoodReducer,
  getAllFoodsReducer,
  getFoodReducer,
  removeFoodReducer,
} from "./reducers/foodReducers";
import {
  addNewOrderReducer,
  editOrderReducer,
  findOrderReducer,
  getAllOrdersReducer,
  getAllSendingOrdersReducer,
  sentOrderReducer,
  userOrdersReducer,
} from "./reducers/ordersReducers";
import {
  addUserReducer,
  deleteUserReducer,
  editUserReducer,
  getAllUsersReducer,
  loginUserReducer,
  updateUserReducer,
} from "./reducers/usersReducer";

const finalReducers = combineReducers({
  addFoodToMenuReducer: addFoodToMenuReducer,
  getAllFoodsReducer: getAllFoodsReducer,
  removeFoodReducer: removeFoodReducer,
  editFoodReducer: editFoodReducer,
  addToBasketReducer: addToBasketReducer,
  addUserReducer: addUserReducer,
  getAllUsersReducer: getAllUsersReducer,
  editUserReducer: editUserReducer,
  updateUserReducer: updateUserReducer,
  deleteUserReducer: deleteUserReducer,
  loginUserReducer: loginUserReducer,
  addNewCustomerReducer: addNewCustomerReducer,
  findCustomerByIdReducer: findCustomerByIdReducer,
  getAllCustomersReducer: getAllCustomersReducer,
  removeCustomerReducer: removeCustomerReducer,
  editCustomerReducer: editCustomerReducer,
  addNewOrderReducer: addNewOrderReducer,
  userOrdersReducer: userOrdersReducer,
  editOrderReducer: editOrderReducer,
  sentOrderReducer: sentOrderReducer,
  findOrderReducer: findOrderReducer,
  getAllSendingOrdersReducer: getAllSendingOrdersReducer,
  getAllOrdersReducer: getAllOrdersReducer,
  getFoodReducer: getFoodReducer,
  findCustomerReducer: findCustomerReducer,
});

const basket = localStorage.getItem("basketN")
  ? JSON.parse(localStorage.getItem("basketN"))
  : [];
const userlogedin = localStorage.getItem("userlogedin")
  ? JSON.parse(localStorage.getItem("userlogedin"))
  : null;

const initialState = {
  addToBasketReducer: { basketItems: basket },
  loginUserReducer: { userLoged: userlogedin },
};

const composeEnhancer = composeWithDevTools({});

const store = createStore(
  finalReducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
