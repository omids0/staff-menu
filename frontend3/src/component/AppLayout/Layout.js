import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/my_icon.png";
import Loading from "../Loading/Loading";
import Modal from "../Modal";
import SomeThingWrong from "../SomeThingWentWrong/SomeThingWrong";
import { loginUserAction } from "../../redux/actions/userAction";

function Layout({ loadingLayout = false, errorLayout = false, children }) {
  const { basketItems } = useSelector((state) => state.addToBasketReducer);
  const { loading, error, userLoged } = useSelector(
    (state) => state.loginUserReducer
  );

  console.log(userLoged);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loginForm, setLoginForm] = useState({
    userName: "",
    password: "",
  });
  const handleFirstButton = () => {
    setShowModal(false);
    if (loginForm.userName && loginForm.password) {
      const user = {
        username: loginForm.userName,
        password: loginForm.password,
      };
      dispatch(loginUserAction(user));
    } else {
      alert("لطفا تمامی فیلدها را پر نمایید.");
    }

    setLoginForm({
      userName: "",
      password: "",
    });
  };
  const handleSecondButton = () => {
    setShowModal(false);
    setLoginForm({
      userName: "",
      password: "",
    });
  };

  function handleLogout() {
    localStorage.removeItem("userlogedin");
    window.location.reload();
  }

  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-between">
      <header className="flex flex-row-reverse justify-between p-2 items-center">
        <Link to="/">
          <img src={logo} alt="staff_menu_logo" className="w-[5rem]" />
        </Link>
        <div className="flex flex-row justify-between min-w-[9rem]">
          {userLoged ? (
            <div>
              <div className="dropdown">
                <button className="dropbtn flex flex-row-reverse">
                  <svg
                    className="mr-2 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                  {userLoged.username}
                </button>
                <div className="dropdown-content">
                  <a href="#">سفارشات من</a>
                  <a href="#">سفارشات منتظر</a>
                  <a href="#">مشترکین (ثبت، جستجو)</a>
                  {userLoged.access === "admin" && <a href="#">صفحه مدیریت</a>}
                  <button onClick={handleLogout}>خروج</button>
                </div>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => setShowModal(true)}>
              <div className="flex flex-row">
                <p className="px-2">ورود</p>
                {loading && (
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
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mx-auto mb-6 text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                )}
              </div>
            </button>
          )}

          <div className="text-gray-300">{"|"}</div>
          <Link to="/basket">
            <button className="flex flex-row">
              <p className="mx-2 text-red-500 text-lg">{basketItems.length}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
          </Link>
        </div>
      </header>
      <div className="p-2">
        {loadingLayout && (
          <div className="flex justify-center">
            <Loading />
          </div>
        )}
        {errorLayout && <SomeThingWrong />}
        {!loadingLayout && !errorLayout && <div>{children}</div>}
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        firstButton="ورود"
        handleFirstButton={handleFirstButton}
        secondButton="انصراف"
        handleSecondButton={handleSecondButton}
      >
        <div className="p-4 flex flex-col justify-center items-center">
          <input
            placeholder="نام کاربری"
            className="border-b-2 border-gray-400 p-2 my-2 text-sm min-w-[20rem]"
            value={loginForm.userName}
            onChange={(e) =>
              setLoginForm((prev) => ({ ...prev, userName: e.target.value }))
            }
          />
          <input
            placeholder="رمز ورود"
            className="border-b-2 border-gray-400 p-2 my-2 text-sm min-w-[20rem]"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
      </Modal>
      <footer className="p-2 border-t-2 flex justify-center text-center text-gray-500 text-sm">
        <p>این نرم‌افزار جهت نمونه کار می‌باشد و هیچ ارزش دیگری ندارد.</p>
      </footer>
    </div>
  );
}

export default Layout;
