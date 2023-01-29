import React, { useEffect } from "react";
import Layout from "../AppLayout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getAllFoodsAction } from "../../redux/actions/foodAction";
import Categories from "./Categories";

function HomePage() {
  const dispatch = useDispatch();
  const { loading, error, foods } = useSelector(
    (state) => state.getAllFoodsReducer
  );

  useEffect(() => {
    dispatch(getAllFoodsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout loadingLayout={loading} errorLayout={error}>
      {foods !== undefined && foods !== null && (
        <div>
          <Categories
            data={foods}
            CategoryTitle="خوراک"
            categoryId="withoutrice"
          />
          <Categories data={foods} CategoryTitle="چلو" categoryId="withrice" />
          <Categories
            data={foods}
            CategoryTitle="پیش غذا"
            categoryId="appetizer"
          />
          <Categories data={foods} CategoryTitle="نوشیدنی" categoryId="drink" />
        </div>
      )}
    </Layout>
  );
}

export default HomePage;
