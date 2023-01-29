import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addFoodToMenuAction,
  editFoodAction,
  getAllFoodsAction,
  getFoodAction,
  removeFoodAction,
} from "../../redux/actions/foodAction";
import { getThreeDigitNum } from "../../tools/threeDigit";
import Loading from "../Loading/Loading";
import Modal from "../Modal";
import SomeThingWrong from "../SomeThingWentWrong/SomeThingWrong";

// add modal for "new food" && بررسی

function Foods() {
  const dispatch = useDispatch();

  const { food } = useSelector((state) => state.getFoodReducer);

  const [addNewFood, setAddNewFood] = useState({
    openModal: false,
    foodName: "",
    category: "withrice",
    price: "",
    description: "",
  });

  const [editFood, setEditFood] = useState({
    openModal: false,
    id: "",
    foodName: "",
    category: "withrice",
    price: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getAllFoodsAction());
  }, []);

  useEffect(() => {
    if (food) {
      setEditFood((prev) => ({
        ...prev,
        id: food._id,
        foodName: food.name,
        category: food.category,
        price: food.price,
        description: food.description,
      }));
    }
  }, [food]);

  const { loading, error, foods } = useSelector(
    (state) => state.getAllFoodsReducer
  );

  let rowNum = 1;

  const handleAddNewFood = () => {
    setAddNewFood((prev) => ({
      ...prev,
      openModal: true,
    }));
  };

  const handleCancelEditFood = () => {
    setAddNewFood({
      openModal: false,
      foodName: "",
      category: "withrice",
      price: "",
      description: "",
    });
  };

  const handleSubmitNewFood = () => {
    const food = {
      name: addNewFood.foodName,
      category: addNewFood.category,
      price: addNewFood.price,
      description: addNewFood.description,
    };

    if (addNewFood.foodName && addNewFood.category && addNewFood.price) {
      dispatch(addFoodToMenuAction(food));
    } else {
      alert("لطفا تمامی فیلدها را پر نمایید.");
    }
  };

  const handleToEditFood = (id) => {
    setEditFood((prev) => ({
      ...prev,
      openModal: true,
      id,
    }));
    dispatch(getFoodAction(id));
  };

  const handleCancelFood = () => {
    setEditFood({
      openModal: false,
      id: "",
      foodName: "",
      category: "withrice",
      price: "",
      description: "",
    });
  };

  const handleSubmitEditFood = () => {
    const food = {
      _id: editFood.id,
      name: editFood.foodName,
      category: editFood.category,
      price: editFood.price,
      description: editFood.description,
    };
    if (editFood.foodName && editFood.category && editFood.price) {
      dispatch(editFoodAction(food));
    } else {
      alert("لطفا تمامی فیلدها را پر نمایید.");
    }
  };

  return (
    <div>
      {loading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
      {error && <SomeThingWrong />}
      {foods && !loading && !error && (
        <div className="flex flex-col">
          <div>
            <button
              className="flex flex-row border border-1.5 rounded-md p-2"
              onClick={() => handleAddNewFood()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-green-500 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <p className="text-sm">خوراکی جدید</p>
            </button>
          </div>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                      >
                        نام
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                      >
                        دسته بندی{" "}
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                      >
                        قیمت{" "}
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                      >
                        توضیحات{" "}
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                      >
                        بررسی
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {foods?.map((item) => (
                      <tr
                        className={`${
                          rowNum % 2 ? "bg-gray-200" : "bg-gray-50"
                        } border-b`}
                        key={item._id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {rowNum++}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.category === "withoutrice"
                            ? "خوراک"
                            : item.category === "appetizer"
                            ? "پیش‌غذا"
                            : item.category === "drink"
                            ? "نوشیدنی"
                            : item.category === "withrice" && "چلو"}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {getThreeDigitNum(item.price)} ت
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.description}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-evenly">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-blue-500 cursor-pointer"
                            onClick={() => handleToEditFood(item._id)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-red-500 cursor-pointer mr-6"
                            onClick={() => dispatch(removeFoodAction(item._id))}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        showModal={addNewFood.openModal}
        modalTitle="خوراک جدید"
        firstButton="ثبت"
        secondButton="انصراف"
        handleFirstButton={handleSubmitNewFood}
        handleSecondButton={handleCancelEditFood}
      >
        <div className="flex flex-col max-w-[22rem] p-2">
          <input
            value={addNewFood.foodName}
            placeholder="نام"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            onChange={(e) =>
              setAddNewFood((prev) => ({
                ...prev,
                foodName: e.target.value,
              }))
            }
          />
          <label for="categories" className="text-sm my-2 text-gray-700">
            دسته بندی:
          </label>
          <select
            name="categories"
            id="categories"
            className="mb-2 text-sm"
            value={addNewFood.category}
            onChange={(e) =>
              setAddNewFood((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
          >
            <option value="withrice">چلو</option>
            <option value="withoutrice">خوراک</option>
            <option value="drink">نوشیدنی</option>
            <option value="appetizer">پیش غذا</option>
          </select>
          <input
            placeholder="قیمت"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            value={addNewFood.price}
            onChange={(e) =>
              setAddNewFood((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
          />
          <textarea
            placeholder="توضیحات"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            value={addNewFood.description}
            onChange={(e) =>
              setAddNewFood((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
      </Modal>
      <Modal
        showModal={editFood.openModal}
        modalTitle="ویرایش خوراکی"
        firstButton="ویرایش"
        secondButton="انصراف"
        handleFirstButton={handleSubmitEditFood}
        handleSecondButton={handleCancelFood}
      >
        <div className="flex flex-col max-w-[22rem] p-2">
          <input
            value={editFood.foodName}
            placeholder="نام"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            onChange={(e) =>
              setEditFood((prev) => ({
                ...prev,
                foodName: e.target.value,
              }))
            }
          />
          <label for="categories" className="text-sm my-2 text-gray-700">
            دسته بندی:
          </label>
          <select
            name="categories"
            id="categories"
            className="mb-2 text-sm"
            value={editFood.category}
            onChange={(e) =>
              setEditFood((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
          >
            <option value="withrice">چلو</option>
            <option value="withoutrice">خوراک</option>
            <option value="drink">نوشیدنی</option>
            <option value="appetizer">پیش غذا</option>
          </select>
          <input
            placeholder="قیمت"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            value={editFood.price}
            onChange={(e) =>
              setEditFood((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
          />
          <textarea
            placeholder="توضیحات"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            value={editFood.description}
            onChange={(e) =>
              setEditFood((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
      </Modal>
    </div>
  );
}

export default Foods;
