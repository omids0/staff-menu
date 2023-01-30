import React, { useEffect } from "react";
import Layout from "../AppLayout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getAllFoodsAction } from "../../redux/actions/foodAction";
import Categories from "./Categories";
import { useState } from "react";

function HomePage() {
  const dispatch = useDispatch();
  const { loading, error, foods } = useSelector(
    (state) => state.getAllFoodsReducer
  );
  const [category, setCategory] = useState("all");

  useEffect(() => {
    dispatch(getAllFoodsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout loadingLayout={loading} errorLayout={error}>
      <div className="min-h-[80vh] ">
        <div className="border border-x-0 p-2 mb-6">
          <div className="dropdown">
            <button className="dropbtn flex flex-row-reverse">
              <div className="flex">
                <p className="text-gray-400">دسته‌بندی:</p>
                <p className="mx-2 font-bold">
                  {category === "all" && "همه"}
                  {category === "withoutrice" && "خوراک"}
                  {category === "withrice" && "چلو"}
                  {category === "appetizer" && "پیش‌غذا"}
                  {category === "drink" && "نوشیدنی"}
                </p>
              </div>
            </button>

            <div className="dropdown-content">
              <button className="p-3" onClick={() => setCategory("all")}>
                همه
              </button>
              <br />
              <button
                className="p-3"
                onClick={() => setCategory("withoutrice")}
              >
                خوراک
              </button>
              <br />
              <button className="p-3" onClick={() => setCategory("withrice")}>
                چلو
              </button>
              <br />
              <button className="p-3" onClick={() => setCategory("appetizer")}>
                پیش‌غذا
              </button>
              <br />
              <button className="p-3" onClick={() => setCategory("drink")}>
                نوشیدنی
              </button>
            </div>
          </div>
        </div>
        {foods !== undefined && foods !== null && (
          <div>
            {(category === "all" || category === "withoutrice") && (
              <Categories
                data={foods}
                CategoryTitle="خوراک"
                categoryId="withoutrice"
              />
            )}
            {(category === "all" || category === "withrice") && (
              <Categories
                data={foods}
                CategoryTitle="چلو"
                categoryId="withrice"
              />
            )}
            {(category === "all" || category === "appetizer") && (
              <Categories
                data={foods}
                CategoryTitle="پیش غذا"
                categoryId="appetizer"
              />
            )}
            {(category === "all" || category === "drink") && (
              <Categories
                data={foods}
                CategoryTitle="نوشیدنی"
                categoryId="drink"
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default HomePage;
