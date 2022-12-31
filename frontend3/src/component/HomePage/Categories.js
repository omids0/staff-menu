import React from "react";
import CatFoodDetails from "./CatFoodDetails";

function Categories({ data, CategoryTitle, categoryId }) {
  return (
    <div>
      <div className="bg-gradient-to-r from-gray-100 to-white p-2  my-2 flex justify-center items-center font-bold h-24 rounded-lg">
        <p>{CategoryTitle}</p>
      </div>
      {data.map(
        (food) =>
          food.category === `${categoryId}` && <CatFoodDetails food={food} />
      )}
    </div>
  );
}

export default Categories;