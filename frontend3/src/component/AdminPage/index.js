import React, { useState } from "react";
import Layout from "../AppLayout/Layout";
import Customers from "./Customers";
import Foods from "./Foods";
import Orders from "./Orders";
import Users from "./Users";

function AdminPage() {
  const [selectedTab, setselectedTab] = useState(1);

  const checkAccess = localStorage.getItem("userlogedin")
    ? JSON.parse(localStorage.getItem("userlogedin"))
    : null;

  if (!checkAccess || checkAccess.access !== "admin") {
    window.location.href = "/";
  }

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-6">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2 cursor-pointer">
              <div
                onClick={() => setselectedTab(1)}
                className={
                  selectedTab === 1
                    ? "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                    : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }
              >
                کاربران
              </div>
            </li>
            <li className="mr-2 cursor-pointer">
              <div
                onClick={() => setselectedTab(2)}
                className={
                  selectedTab === 2
                    ? "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                    : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }
                aria-current="page"
              >
                غذاها
              </div>
            </li>
            <li className="mr-2 cursor-pointer">
              <div
                onClick={() => setselectedTab(3)}
                className={
                  selectedTab === 3
                    ? "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                    : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }
              >
                سفارشات
              </div>
            </li>
            <li className="mr-2 cursor-pointer">
              <div
                onClick={() => setselectedTab(4)}
                className={
                  selectedTab === 4
                    ? "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                    : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }
              >
                مشترکین
              </div>
            </li>
          </ul>
        </div>
        <div>
          {selectedTab === 1 && (
            <div>
              <Users />
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              <Foods />
            </div>
          )}
          {selectedTab === 3 && (
            <div>
              <Orders />
            </div>
          )}
          {selectedTab === 4 && (
            <div>
              <Customers />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AdminPage;
