import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../AppLayout/Layout";

function BasketPage() {
  const { basketItems } = useSelector((state) => state.addToBasketReducer);
  const [serviceOption, setServiceOption] = useState({
    choice: "inner",
    description: "",
    table: "",
  });

  return (
    <Layout>
      <div className="w-full flex sm:flex-row flex-col justify-between">
        <div className="mx-auto">
          <table className="table-auto border-collapse border border-slate-500 my-4">
            <thead>
              <tr>
                <th className="border border-slate-500 p-2">#</th>
                <th className="border border-slate-500 p-2">نام</th>
                <th className="border border-slate-500 p-2">تعداد</th>
                <th className="border border-slate-500 p-2">مجموع</th>
              </tr>
            </thead>
            <tbody>
              {basketItems.map((food, index) => (
                <tr key={food._id}>
                  <td className="border border-slate-500 p-2">{index + 1}</td>
                  <td className="border border-slate-500 p-2">{food.name}</td>
                  <td className="border border-slate-500 p-2">{food.qty}</td>
                  <td className="border border-slate-500 p-2">
                    {food.fee.toLocaleString()} ت
                  </td>
                </tr>
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
              className="my-4"
            >
              <option value="inner">داخل سالن</option>
              <option value="out">بیرون بر (حضوری)</option>
              <option value="service">بیرون بر (سرویس)</option>
            </select>
          </div>
          <div className="mx-auto my-6">
            {serviceOption.choice === "inner" && (
              <div className="flex flex-col min-w-[22rem]">
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
              <div className="flex flex-col min-w-[22rem]">
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
            {serviceOption.choice === "service" && <div>service</div>}
          </div>
          <div className="flex flex-col min-w-[22rem] bg-blue-100 p-2 rounded-md mb-4">
            <p className="font-bold">مبلغ قابل پرداخت:</p>
            <p className="my-4">5000 تومان</p>
            <button className="bg-blue-600 rounded-md p-2 text-white">
              ثبت
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BasketPage;
