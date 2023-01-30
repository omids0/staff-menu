import React from "react";
import CatFoodDetails from "./CatFoodDetails";

function Categories({ data, CategoryTitle, categoryId }) {
  return (
    <div>
      <div className="bg-gradient-to-r from-gray-100 to-white p-2  my-2 flex justify-center items-center font-bold h-10 rounded-lg">
        <p>{CategoryTitle}</p>
      </div>
      <div className="flex justify-center md:justify-start flex-wrap">
        {data.map(
          (food) =>
            food.category === `${categoryId}` && (
              <CatFoodDetails key={food._id} food={food} />
            )
        )}
      </div>
    </div>
  );
}

export default Categories;
