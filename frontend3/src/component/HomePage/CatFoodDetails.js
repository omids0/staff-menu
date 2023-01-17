import React from "react";
import { useDispatch } from "react-redux";
import CartIcone from "../CartIcone";
import { addToBasketAction } from "../../redux/actions/basketActions";
import { getThreeDigitNum } from "../../tools/threeDigit";
import { useSelector } from "react-redux";

function CatFoodDetails({ food }) {
  const { basketItems } = useSelector((state) => state.addToBasketReducer);
  const foodItem = basketItems.find((item) => item._id === food._id && item);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row justify-between my-2 min-h-[7rem] ">
      <div className="p-4 rounded-r-lg bg-gradient-to-r from-slate-100 to-red-50 w-full flex flex-col justify-between">
        <p className="text-sm font-bold text-gray-800 flex-wrap">{food.name}</p>
        <p className="mt-2 text-gray-400 text-sm">
          {food.price.toLocaleString()} تومان
        </p>
      </div>
      <div className="bg-gray-100 text-white p-4 flex flex-col justify-center items-center sm:min-w-[9rem] min-w-[8rem] rounded-l-lg">
        {foodItem?.qty > 0 ? (
          <div className="flex flex-row text-2xl w-full justify-between">
            <button
              className="bg-green-500 px-2.5 rounded-full"
              onClick={() =>
                dispatch(addToBasketAction(food, foodItem.qty + 1))
              }
            >
              +
            </button>
            <p className="mx-2 text-gray-900">{foodItem.qty}</p>
            <button
              className="bg-red-600 px-2.5 rounded-full"
              onClick={() =>
                dispatch(addToBasketAction(food, foodItem.qty - 1))
              }
            >
              -
            </button>
          </div>
        ) : (
          <button onClick={() => dispatch(addToBasketAction(food, 1))}>
            <CartIcone />
          </button>
        )}
        {foodItem?.qty > 0 && (
          <p className="mt-4 text-sm text-gray-500 font-bold">
            {getThreeDigitNum(food.price * foodItem.qty)} تومان
          </p>
        )}
      </div>
    </div>
  );
}

export default CatFoodDetails;
