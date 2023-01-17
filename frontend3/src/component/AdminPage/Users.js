import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addUserAction,
  deleteUserAction,
  editUserAction,
  getAllUsersAction,
  updateUserAction,
} from "../../redux/actions/userAction";
import Loading from "../Loading/Loading";
import Modal from "../Modal";
import SomeThingWrong from "../SomeThingWentWrong/SomeThingWrong";

function Users() {
  const dispatch = useDispatch();

  const { currentuser } = useSelector((state) => state.editUserReducer);

  const { loading, error, users } = useSelector(
    (state) => state.getAllUsersReducer
  );

  const [addNewUser, setAddNewUser] = useState({
    openModal: false,
    userName: "",
    passWord: "",
    submitPassword: "",
    access: "",
    phoneNumber: "",
  });

  const [editUserInfo, setEditUserInfo] = useState({
    openModal: false,
    id: "",
    userName: "",
    passWord: "",
    submitPassword: "",
    access: "",
    phoneNumber: "",
    isActive: "",
  });
  const [confirmRemoveUser, setConfirmRemoveUser] = useState({
    openModal: false,
    id: "",
  });

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, []);

  useEffect(() => {
    if (currentuser) {
      setEditUserInfo((prev) => ({
        ...prev,
        userName: currentuser.username,
        passWord: currentuser.password,
        submitPassword: "",
        access: currentuser.access,
        phoneNumber: currentuser.phoneNum,
        isActive: currentuser.isActive,
      }));
    }
  }, [currentuser]);

  let rowNum = 1;

  const handleCancelNewUser = () => {
    setAddNewUser({
      openModal: false,
      userName: "",
      passWord: "",
      submitPassword: "",
      access: "",
      phoneNumber: "",
    });
  };

  const handleAddNewUser = () => {
    const user = {
      username: addNewUser.userName,
      password: addNewUser.passWord,
      access: addNewUser.access,
      phoneNum: addNewUser.phoneNumber,
      isActive: true,
    };

    if (
      !addNewUser.userName ||
      !addNewUser.passWord ||
      !addNewUser.submitPassword ||
      !addNewUser.access ||
      !addNewUser.phoneNumber
    ) {
      alert("لطفا تمامی فیلد ها را پر نمایید.");
    }

    if (
      addNewUser.submitPassword &&
      addNewUser.passWord &&
      addNewUser.passWord !== addNewUser.submitPassword
    ) {
      alert("پسورد به درستی تایید نشده است.");
    }

    if (
      addNewUser.userName &&
      addNewUser.passWord &&
      addNewUser.submitPassword &&
      addNewUser.access &&
      addNewUser.phoneNumber &&
      addNewUser.passWord === addNewUser.submitPassword
    ) {
      dispatch(addUserAction(user));
    }
  };

  const handleCancelEditUser = () => {
    setEditUserInfo({
      openModal: false,
      userName: "",
      passWord: "",
      submitPassword: "",
      access: "",
      phoneNumber: "",
      isActive: "",
    });
  };

  const handleSubmitEditUser = () => {
    if (
      !editUserInfo.userName ||
      !editUserInfo.passWord ||
      !editUserInfo.submitPassword ||
      !editUserInfo.access ||
      !editUserInfo.phoneNumber
    ) {
      alert("لطفا تمامی فیلد ها را پر نمایید.");
    }

    if (
      editUserInfo.submitPassword &&
      editUserInfo.passWord &&
      editUserInfo.passWord !== editUserInfo.submitPassword
    ) {
      alert("پسورد به درستی تایید نشده است.");
    }
    if (
      editUserInfo.userName &&
      editUserInfo.passWord &&
      editUserInfo.submitPassword &&
      editUserInfo.access &&
      editUserInfo.phoneNumber &&
      editUserInfo.passWord === editUserInfo.submitPassword
    ) {
      const user = {
        _id: editUserInfo.id,
        username: editUserInfo.userName,
        password: editUserInfo.passWord,
        access: editUserInfo.access,
        phoneNum: editUserInfo.phoneNumber,
        isActive: editUserInfo.isActive,
      };
      dispatch(updateUserAction(user));
    }
  };

  const handleGoingToEditUser = (id) => {
    dispatch(editUserAction(id));
    setEditUserInfo((prev) => ({
      ...prev,
      id,
      openModal: true,
    }));
  };

  const handleGoingToRemoveUser = (id) => {
    setConfirmRemoveUser({
      openModal: true,
      id,
    });
  };

  const handleConformRemoveUser = () => {
    dispatch(deleteUserAction(confirmRemoveUser.id));
  };

  const handleCancelRemoveUser = () => {
    setConfirmRemoveUser({
      openModal: false,
      id: "",
    });
  };

  return (
    <div>
      {loading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
      {error && <SomeThingWrong />}
      {users && !loading && !error && (
        <div className="flex flex-col">
          <div>
            <button
              className="flex flex-row border border-1.5 rounded-md p-2"
              onClick={() =>
                setAddNewUser((prev) => ({
                  ...prev,
                  openModal: true,
                }))
              }
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
              <p className="text-sm">کاربر جدید</p>
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
                        نام کاربری
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                      >
                        رمز ورود
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                      >
                        سطح دسترسی
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                      >
                        شماره تماس کاربر
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-right bg-gray-400"
                      >
                        وضعیت
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((item) => (
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
                          {item.username}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.password}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.access}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.phoneNum}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-around">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-blue-500 cursor-pointer"
                            onClick={() => handleGoingToEditUser(item._id)}
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
                            strokeWidth="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 text-red-500 cursor-pointer mr-4"
                            onClick={() => handleGoingToRemoveUser(item._id)}
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
        showModal={addNewUser.openModal}
        modalTitle="کاربر جدید"
        firstButton="ذخیره"
        secondButton="انصراف"
        handleSecondButton={handleCancelNewUser}
        handleFirstButton={handleAddNewUser}
      >
        <div className="flex flex-col max-w-[22rem] p-2">
          <input
            placeholder="نام کاربری"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            onChange={(e) =>
              setAddNewUser((prev) => ({
                ...prev,
                userName: e.target.value,
              }))
            }
          />
          <input
            placeholder="رمز ورود"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            onChange={(e) =>
              setAddNewUser((prev) => ({
                ...prev,
                passWord: e.target.value,
              }))
            }
          />
          <input
            placeholder="تایید رمز ورود"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            onChange={(e) =>
              setAddNewUser((prev) => ({
                ...prev,
                submitPassword: e.target.value,
              }))
            }
          />
          <label for="accesses" className="text-sm my-2 text-gray-700">
            سطح دسترسی:
          </label>
          <select
            name="accesses"
            id="accesses"
            className="mb-2"
            value={addNewUser.access}
            onChange={(e) =>
              setAddNewUser((prev) => ({
                ...prev,
                access: e.target.value,
              }))
            }
          >
            <option value="admin">مدیریت</option>
            <option value="cashier">صندوقدار</option>
            <option value="simple">ساده</option>
          </select>
          <input
            placeholder="شماره تماس کاربر"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            onChange={(e) =>
              setAddNewUser((prev) => ({
                ...prev,
                phoneNumber: e.target.value,
              }))
            }
          />
        </div>
      </Modal>
      <Modal
        showModal={editUserInfo.openModal}
        modalTitle="ویرایش اطلاعات کاربر"
        firstButton="ذخیره"
        secondButton="انصراف"
        handleSecondButton={handleCancelEditUser}
        handleFirstButton={handleSubmitEditUser}
      >
        <div className="flex flex-col max-w-[22rem] p-2">
          <input
            value={editUserInfo.userName}
            placeholder="نام کاربری"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            onChange={(e) =>
              setEditUserInfo((prev) => ({
                ...prev,
                userName: e.target.value,
              }))
            }
          />
          <input
            value={editUserInfo.passWord}
            placeholder="رمز ورود"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            onChange={(e) =>
              setEditUserInfo((prev) => ({
                ...prev,
                passWord: e.target.value,
              }))
            }
          />
          <input
            value={editUserInfo.submitPassword}
            placeholder="تایید رمز ورود"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            onChange={(e) =>
              setEditUserInfo((prev) => ({
                ...prev,
                submitPassword: e.target.value,
              }))
            }
          />
          <label for="accesses" className="text-sm my-2 text-gray-700">
            سطح دسترسی:
          </label>
          <select
            name="accesses"
            id="accesses"
            className="mb-2 text-sm"
            value={editUserInfo.access}
            onChange={(e) =>
              setEditUserInfo((prev) => ({
                ...prev,
                access: e.target.value,
              }))
            }
          >
            <option value="admin">مدیریت</option>
            <option value="cashier">صندوقدار</option>
            <option value="simple">ساده</option>
          </select>
          <input
            value={editUserInfo.phoneNumber}
            placeholder="شماره تماس کاربر"
            className="text-sm p-2 border border-2 border-gray-300 rounded-md min-w-[18rem] my-1"
            onChange={(e) =>
              setEditUserInfo((prev) => ({
                ...prev,
                phoneNumber: e.target.value,
              }))
            }
          />
          <label className="text-sm my-2">
            وضعیت استخدام:
            <input
              type="checkbox"
              checked={editUserInfo.isActive}
              className="mx-4"
              onChange={(e) =>
                setEditUserInfo((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
            />
          </label>
        </div>
      </Modal>
      <Modal
        showModal={confirmRemoveUser.openModal}
        modalTitle="توجه!!"
        firstButton="بله"
        secondButton="خیر"
        handleFirstButton={handleConformRemoveUser}
        handleSecondButton={handleCancelRemoveUser}
      >
        <h3 className="m-8">آیا از حذف کاربر اطمینان دارید؟</h3>
      </Modal>
    </div>
  );
}

export default Users;
