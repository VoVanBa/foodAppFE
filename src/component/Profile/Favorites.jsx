import React from "react";
import RestaurantCart from "../Restaurant/RestaurantCart";
import { useSelector } from "react-redux";

const Favorites = () => {
  const { auth } = useSelector((store) => store);
  return (
    <div>
      <h1 className="py-5 text-xl font-semibold text-center"> My favorites</h1>

      <div className="flex flex-wrap justify-center gap-3">
        {auth.favourites.map((item) => (
          <RestaurantCart item={item} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
