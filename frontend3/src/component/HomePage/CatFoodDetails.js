import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CartIcone from "../CartIcone";
import { addToBasketAction } from "../../redux/actions/basketActions";
import { getThreeDigitNum } from "../../tools/threeDigit";

function CatFoodDetails({ food }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(addToBasketAction(food, count));
  }, [count]);

  return (
    <div className="flex flex-row justify-between my-2">
      <div className="p-2 rounded-r-lg bg-gradient-to-r from-slate-100 to-red-50 w-full flex flex-col justify-between">
        <p>{food.name}</p>
        <p className="mt-2 text-gray-500">
          {food.price.toLocaleString()} تومان
        </p>
      </div>
      <div className="bg-red-600 text-white p-2 flex flex-col justify-center items-center sm:min-w-[9rem] min-w-[8rem] rounded-l-lg">
        {count > 0 ? (
          <div className="flex flex-row text-2xl w-full justify-between">
            <button
              className="bg-green-500 px-2 rounded-full"
              onClick={() => setCount(count + 1)}
            >
              +
            </button>
            <p className="mx-2">{count}</p>
            <button
              className="bg-red-800 px-2 rounded-full"
              onClick={() => setCount(count - 1)}
            >
              -
            </button>
          </div>
        ) : (
          <button onClick={() => setCount(1)}>
            <CartIcone />
          </button>
        )}
        {count > 0 && (
          <p className="mt-4 text-xl text-gray-100 font-bold">
            {getThreeDigitNum(food.price * count)}
          </p>
        )}
      </div>
    </div>
  );
}

export default CatFoodDetails;
