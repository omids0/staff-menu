import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  editCustomerAction,
  findCustomerAction,
  getAllCustomersAction,
} from "../../redux/actions/customersAction";
import Loading from "../Loading/Loading";
import Modal from "../Modal";
import SomeThingWrong from "../SomeThingWentWrong/SomeThingWrong";

function Customers() {
  const { loadingcustomers, errorLoadingCustomers, allcustomers } = useSelector(
    (state) => state.getAllCustomersReducer
  );

  const { searchedCustomer } = useSelector(
    (state) => state.findCustomerReducer
  );

  const [searchCustomer, setSearchCustomer] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [editCustomer, setEditCustomer] = useState({
    openModal: false,
    id: "",
    code: "",
    name: "",
    phoneNum: "",
    address: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomersAction());
  }, []);

  useEffect(() => {
    if (searchedCustomer) {
      setEditCustomer((prev) => ({
        ...prev,
        code: searchedCustomer.customerId,
        name: searchedCustomer.customerName,
        phoneNum: searchedCustomer.customerTel,
        address: searchedCustomer.customerAddress,
      }));
    }
  }, [searchedCustomer]);

  let rowNum = 1;

  const handleToEditCustomer = (id) => {
    dispatch(findCustomerAction(id));
    setEditCustomer((prev) => ({
      ...prev,
      openModal: true,
      id,
    }));
  };

  const handleToCloseEditCustomer = () => {
    setEditCustomer({
      openModal: false,
      id: "",
      code: "",
      name: "",
      phoneNum: "",
      address: "",
    });
  };

  const handleSubmitEditCustomer = () => {
    if (editCustomer.name && editCustomer.phoneNum && editCustomer.address) {
      const customer = {
        _id: editCustomer.id,
        customerId: editCustomer.code,
        customerName: editCustomer.name,
        customerTel: editCustomer.phoneNum,
        customerAddress: editCustomer.address,
      };
      dispatch(editCustomerAction(customer));
    } else {
      alert("???????? ?????????? ???????? ???? ???? ???? ????????????");
    }
  };

  return (
    <>
      {loadingcustomers && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
      {errorLoadingCustomers && <SomeThingWrong />}
      {allcustomers && !loadingcustomers && !errorLoadingCustomers && (
        <>
          <div className="flex flex-row">
            <div
              className="bg-gray-200 h-12 w-12 p-2 rounded-full flex items-center cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-1 text-gray-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              className={`border-2 rounded-md p-2 mt-2 w-full max-w-[25rem] mb-6 mx-2 opacity-0 transition ease-in-out delay-150 ${
                showSearch && "opacity-100"
              }`}
              placeholder="?????????? ??????????"
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
            />
          </div>
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
                          ???? ????????????
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                        >
                          ?????? ??????????
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                        >
                          ???????? ??????????
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                        >
                          ???????????? ??????????
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allcustomers &&
                        allcustomers?.map((item) =>
                          searchCustomer.length ? (
                            item?.customerId === Number(searchCustomer) ||
                            item?.customerName === searchCustomer ||
                            item?.customerAddress.includes(searchCustomer) ? (
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
                                  {item?.customerId}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item?.customerName}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item?.customerAddress}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-blue-500 cursor-pointer"
                                    onClick={() =>
                                      handleToEditCustomer(item._id)
                                    }
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                    />
                                  </svg>
                                </td>
                              </tr>
                            ) : null
                          ) : (
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
                                {item?.customerId}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item?.customerName}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item?.customerAddress}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 text-blue-500 cursor-pointer"
                                  onClick={() => handleToEditCustomer(item._id)}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                  />
                                </svg>
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal
        showModal={editCustomer.openModal}
        modalTitle="???????????? ??????????"
        firstButton="????????????"
        secondButton="????????????"
        handleFirstButton={handleSubmitEditCustomer}
        handleSecondButton={handleToCloseEditCustomer}
      >
        <div className="flex flex-col max-w-[22rem] p-2">
          <input
            placeholder="?????????? ????????????"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            value={editCustomer.code}
          />
          <input
            placeholder="?????? ??????????"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            value={editCustomer.name}
            onChange={(e) =>
              setEditCustomer((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <input
            placeholder="?????????? ???????? ??????????"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            value={editCustomer.phoneNum}
            onChange={(e) =>
              setEditCustomer((prev) => ({
                ...prev,
                phoneNum: e.target.value,
              }))
            }
          />
          <input
            placeholder="???????? ??????????"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            value={editCustomer.address}
            onChange={(e) =>
              setEditCustomer((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
          />
        </div>
      </Modal>
    </>
  );
}

export default Customers;
