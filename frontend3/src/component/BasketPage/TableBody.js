import React from "react";
import { useDispatch } from "react-redux";
import { addToBasketAction } from "../../redux/actions/basketActions";

function TableBody({ food, index }) {
  const dispatch = useDispatch();
  return (
    <tr key={food._id}>
      <td className="border border-slate-500 p-2">{index + 1}</td>
      <td className="border border-slate-500 p-2">{food.name}</td>
      <td className="border border-slate-500 p-2 flex flex-col justify-center items-center">
        <button
          className="bg-green-400 text-white px-2 rounded-md"
          onClick={() => dispatch(addToBasketAction(food, food.qty + 1))}
        >
          +
        </button>
        <p className="my-1">{food.qty}</p>
        <button
          className="bg-red-400 text-white px-2 rounded-md"
          onClick={() => dispatch(addToBasketAction(food, food.qty - 1))}
        >
          -
        </button>
      </td>
      <td className="border border-slate-500 p-2">
        {food.fee.toLocaleString()} ت
      </td>
    </tr>
  );
}

export default TableBody;
