import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getThreeDigitNum } from "../../tools/threeDigit";
import Layout from "../AppLayout/Layout";
import TableBody from "./TableBody";
import { addNewOrderAction } from "../../redux/actions/ordersActions";
import {
  addNewCustomerAction,
  findCustomerByIdAction,
  getAllCustomersAction,
} from "../../redux/actions/customersAction";

function BasketPage() {
  const { basketItems } = useSelector((state) => state.addToBasketReducer);
  const { userLoged } = useSelector((state) => state.loginUserReducer);
  const { orderLoading, error } = useSelector(
    (state) => state.addNewOrderReducer
  );
  const foundCustomerState = useSelector(
    (state) => state.findCustomerByIdReducer
  );
  const { allcustomers } = useSelector((state) => state.getAllCustomersReducer);
  const dispatch = useDispatch();
  const [serviceOption, setServiceOption] = useState({
    choice: "inner",
    description: "",
    table: "",
  });
  const [customerSubscribe, setCustomerSubscribe] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    customerId: "",
    customerName: "",
    customerTel: "",
    customerAddress: "",
  });

  useEffect(() => {
    if (foundCustomerState.searchedCustomer) {
      setCustomerInfo((prev) => ({
        ...prev,
        customerName: foundCustomerState.searchedCustomer.customerName,
        customerTel: foundCustomerState.searchedCustomer.customerTel,
        customerAddress: foundCustomerState.searchedCustomer.customerAddress,
      }));
    }
  }, [foundCustomerState.searchedCustomer]);

  useEffect(() => {
    dispatch(getAllCustomersAction());
  }, []);

  const totalPeyment = basketItems.reduce((c, x) => c + x.fee, 0);

  function handleAddOrder() {
    if (basketItems.length > 0 && userLoged) {
      const order = {
        user: userLoged._id,
        customer: {
          customerid: customerInfo.customerId,
          customerName: customerInfo.customerName,
          customerTel: customerInfo.customerTel,
          customerAddress: customerInfo.customerAddress,
        },
        totalPrice: totalPeyment,
        basketItems,
        serviceType: serviceOption.choice,
        tableNum: serviceOption.table,
        orderDescriptions: serviceOption.description,
      };
      if (customerSubscribe === false) {
        if (
          customerInfo.customerId &&
          customerInfo.customerName &&
          customerInfo.customerTel &&
          customerInfo.customerAddress
        ) {
          dispatch(addNewCustomerAction(customerInfo));
          dispatch(addNewOrderAction(order));
        } else {
          alert("لطفا اطلاعات مشترک جدید را ثبت نمایید.");
        }
      }
      dispatch(addNewOrderAction(order));
    } else if (!userLoged) {
      alert("لطفا لاگین نمایید.");
    }
  }

  function handleSearchCustomerId(customerId) {
    dispatch(findCustomerByIdAction(customerId));
  }

  function handleNewCustomer() {
    setCustomerSubscribe(false);
    const newCustomerId = allcustomers.length + 3000;
    setCustomerInfo((prev) => ({ ...prev, customerId: newCustomerId }));
  }

  return (
    <Layout>
      <div className="w-full flex sm:flex-row flex-col justify-between">
        {basketItems.length > 0 ? (
          <div className="w-full flex sm:flex-row flex-col justify-between bg-blue-50 rounded-3xl p-5 items-center">
            <div className="mx-auto">
              <table className="table-auto border-collapse border border-slate-500 my-4 min-w-[20rem] max-w-[20rem]">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-slate-500 p-2">#</th>
                    <th className="border border-slate-500 p-2">نام</th>
                    <th className="border border-slate-500 p-2">تعداد</th>
                    <th className="border border-slate-500 p-2">مجموع</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50">
                  {basketItems.map((food, index) => (
                    <TableBody key={food._id} food={food} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col mx-auto">
              <div className="mx-auto">
                <select
                  value={serviceOption.choice}
                  onChange={(e) =>
                    setServiceOption((perv) => ({
                      ...perv,
                      choice: e.target.value,
                    }))
                  }
                  className="my-4 max-w-[20rem]"
                >
                  <option value="inner">داخل سالن</option>
                  <option value="out">بیرون بر (حضوری)</option>
                  <option value="service">بیرون بر (سرویس)</option>
                </select>
              </div>
              <div className="mx-auto my-6">
                {serviceOption.choice === "inner" && (
                  <div className="flex flex-col min-w-[20rem]">
                    <input
                      className=" border-2 rounded-md p-2"
                      placeholder="شماره میز"
                      onChange={(e) =>
                        setServiceOption((perv) => ({
                          ...perv,
                          table: e.target.value,
                        }))
                      }
                    />
                    <textarea
                      className="border-2 rounded-md p-2 my-2"
                      placeholder="توضیحات"
                      onChange={(e) =>
                        setServiceOption((perv) => ({
                          ...perv,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
                {serviceOption.choice === "out" && (
                  <div className="flex flex-col min-w-[20rem]">
                    <textarea
                      className="border-2 rounded-md p-2"
                      placeholder="توضیحات"
                      onChange={(e) =>
                        setServiceOption((perv) => ({
                          ...perv,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
                {serviceOption.choice === "service" && (
                  <div>
                    {customerSubscribe === null && (
                      <div className="border min-w-[20rem] p-2 rounded-md">
                        <p>آیا اشتراک دارند؟</p>
                        <div className="flex flex-row my-2">
                          <button
                            className="bg-green-500 text-white p-2 rounded-md"
                            onClick={() => setCustomerSubscribe(true)}
                          >
                            بله
                          </button>
                          <button
                            className="text-red-500 mx-4"
                            onClick={handleNewCustomer}
                          >
                            خیر
                          </button>
                        </div>
                      </div>
                    )}
                    {customerSubscribe === true && (
                      <div className="border flex flex-col rounded-md min-w-[20rem] p-2">
                        <input
                          className=" border-2 rounded-md p-2"
                          placeholder="شماره اشتراک"
                          onChange={(e) =>
                            setCustomerInfo((perv) => ({
                              ...perv,
                              customerId: e.target.value,
                            }))
                          }
                        />
                        <button
                          type="button"
                          className="bg-green-500 rounded-md my-3 p-2 text-white cursor-pointer disabled:opacity-50 flex flex-row justify-center items-center"
                          disabled={!customerInfo.customerId}
                          onClick={() =>
                            handleSearchCustomerId(customerInfo.customerId)
                          }
                        >
                          <p>جستجو</p>
                          {foundCustomerState.loading && (
                            <svg
                              className="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-300 fill-gray-500"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          )}
                          {foundCustomerState.error && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 mx-1 text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                              />
                            </svg>
                          )}
                        </button>
                        {foundCustomerState.searchedCustomer && (
                          <div className="flex flex-col mt-4">
                            <input
                              className=" border-2 rounded-md p-2"
                              placeholder="نام مشترک"
                              value={customerInfo.customerName}
                              onChange={(e) =>
                                setCustomerInfo((perv) => ({
                                  ...perv,
                                  customerName: e.target.value,
                                }))
                              }
                            />
                            <input
                              className=" border-2 rounded-md p-2 mt-2"
                              placeholder="شماره تماس مشترک"
                              value={customerInfo.customerTel}
                              onChange={(e) =>
                                setCustomerInfo((perv) => ({
                                  ...perv,
                                  customerTel: e.target.value,
                                }))
                              }
                            />
                            <input
                              className=" border-2 rounded-md p-2 mt-2"
                              placeholder="آدرس مشترک"
                              value={customerInfo.customerAddress}
                              onChange={(e) =>
                                setCustomerInfo((perv) => ({
                                  ...perv,
                                  customerAddress: e.target.value,
                                }))
                              }
                            />
                            <textarea
                              className=" border-2 rounded-md p-2 mt-2"
                              placeholder="توضیحات"
                              onChange={(e) =>
                                setServiceOption((perv) => ({
                                  ...perv,
                                  description: e.target.value,
                                }))
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {customerSubscribe === false && (
                      <div className="border flex flex-col rounded-md min-w-[20rem] p-2">
                        <input
                          className=" border-2 rounded-md p-2"
                          placeholder="شماره اشتراک"
                          readOnly
                          value={customerInfo.customerId}
                        />
                        <div className="flex flex-col mt-4">
                          <input
                            className=" border-2 rounded-md p-2"
                            placeholder="نام مشترک"
                            value={customerInfo.customerName}
                            onChange={(e) =>
                              setCustomerInfo((perv) => ({
                                ...perv,
                                customerName: e.target.value,
                              }))
                            }
                          />
                          <input
                            className=" border-2 rounded-md p-2 mt-2"
                            placeholder="شماره تماس مشترک"
                            value={customerInfo.customerTel}
                            onChange={(e) =>
                              setCustomerInfo((perv) => ({
                                ...perv,
                                customerTel: e.target.value,
                              }))
                            }
                          />
                          <input
                            className=" border-2 rounded-md p-2 mt-2"
                            placeholder="آدرس مشترک"
                            value={customerInfo.customerAddress}
                            onChange={(e) =>
                              setCustomerInfo((perv) => ({
                                ...perv,
                                customerAddress: e.target.value,
                              }))
                            }
                          />
                          <textarea
                            className=" border-2 rounded-md p-2 mt-2"
                            placeholder="توضیحات"
                            onChange={(e) =>
                              setServiceOption((perv) => ({
                                ...perv,
                                description: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-[20rem] bg-blue-100 p-2 rounded-md mb-4">
                <p className="font-bold">مبلغ قابل پرداخت:</p>
                <p className="my-4">{getThreeDigitNum(totalPeyment)} تومان</p>
                <button
                  className="bg-blue-600 rounded-md p-2 text-white"
                  onClick={handleAddOrder}
                >
                  <div className="flex flex-row justify-center">
                    <p>ثبت</p>
                    {orderLoading && (
                      <svg
                        className="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-300 fill-gray-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    )}
                    {error && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 my-1 text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-24 h-24 mx-auto mb-6 text-yellow-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <p className="mx-auto">سبد شما خالی است.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default BasketPage;
