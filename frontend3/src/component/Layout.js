import React from "react";
import logo from "../images/my_icon.png";

function Layout({ loading, error, children }) {
  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-between">
      <header className="flex flex-row-reverse justify-between p-2 items-center">
        <>
          <img src={logo} alt="staff_menu_logo" className="w-[6rem]" />
        </>
        <div className="flex flex-row justify-between min-w-[9rem]">
          <button>ورود</button>
          <div className="text-gray-300">{"|"}</div>
          <button className="flex flex-row">
            <p className="mx-2 text-red-400 text-lg">0</p>

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
        </div>
      </header>
      <div className="p-2">{children}</div>
      <footer className="p-2 border-t-2 flex justify-center text-center text-gray-500 text-sm">
        <p>این نرم‌افزار جهت نمونه کار می‌باشد و هیچ ارزش دیگری ندارد.</p>
      </footer>
    </div>
  );
}

export default Layout;
