import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../AppLayout/Layout";
import {
  sentOrderAction,
  userOrdersAction,
} from "../../redux/actions/ordersActions";
import { getThreeDigitNum } from "../../tools/threeDigit";
import { Link } from "react-router-dom";

function MyOrder() {
  const dispatch = useDispatch();
  const userloged = useSelector((state) => state.loginUserReducer.userLoged);
  const { loading, error, userorder } = useSelector(
    (state) => state.userOrdersReducer
  );

  useEffect(() => {
    dispatch(userOrdersAction(userloged._id));
  }, []);

  function handleOrderDelivered(id) {
    const order = {
      _id: id,
      isDeliverd: true,
    };

    dispatch(sentOrderAction(order));
  }

  let rowNum = 1;

  return (
    <Layout loadingLayout={loading} errorLayout={error}>
      <div className="flex flex-col">
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
                      نوع سرویس
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                    >
                      شماره میز
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                    >
                      اطلاعات مشترک
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                    >
                      لیست خرید
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                    >
                      قیمت کل
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                    >
                      توضحیات سرویس
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                    >
                      وضعیت تحویل
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userorder &&
                    userorder?.map((item) => (
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
                          {item?.serviceType === "service" ? (
                            <p>پیک</p>
                          ) : item?.serviceType === "out" ? (
                            <p>بیرون بر </p>
                          ) : (
                            <p>داخل سالن</p>
                          )}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item?.tableNum ?? "_"}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <p>{item.customer[0]?.customerName}</p>
                          <p className="my-2">
                            {item.customer[0]?.customerTel}
                          </p>
                          <p>{item.customer[0]?.customerAddress}</p>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item?.basketItems.map((order, index) => (
                            <div>
                              <p>
                                {index + 1}- {order?.name}
                              </p>
                              <p className="mb-4">{`${getThreeDigitNum(
                                order?.qty
                              )} * ${getThreeDigitNum(
                                order?.price
                              )} = ${getThreeDigitNum(order?.fee)}`}</p>
                            </div>
                          ))}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {getThreeDigitNum(item.totalPrice)} ت
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.orderDescriptions}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.isDeliverd ? (
                            <p>تحویل داده شد.</p>
                          ) : (
                            <div className="flex flex-row">
                              <button
                                className="bg-red-500 text-white p-2 rounded-md ml-4"
                                onClick={() => handleOrderDelivered(item._id)}
                              >
                                در انتظار تحویل...
                              </button>
                              <Link to={`/order/edit/${item._id}`}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 text-blue-500"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                  />
                                </svg>
                              </Link>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MyOrder;
