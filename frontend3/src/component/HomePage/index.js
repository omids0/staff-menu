import React, { useEffect } from "react";
import Layout from "../Layout";
import { useSelector, useDispatch } from "react-redux";
import { getAllFoodsAction } from "../../redux/actions/foodAction";

function HomePage() {
  const dispatch = useDispatch();
  const { loading, error, foods } = useSelector(
    (state) => state.getAllFoodsReducer
  );

  console.log(error);
  useEffect(() => {
    dispatch(getAllFoodsAction());
  }, []);

  return (
    <Layout loading={loading} error={error}>
      {foods?.length}
    </Layout>
  );
}

export default HomePage;
