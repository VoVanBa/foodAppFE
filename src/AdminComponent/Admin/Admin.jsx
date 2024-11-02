import React, { useEffect } from "react";
import AdminSiderBar from "./AdminSiderBar";
import { Route, Routes } from "react-router-dom";
import Orders from "../Order/Orders";
import Menu from "../Menu/Menu";
import FoodCategory from "../FoodCategory/FoodCategory";
import Ingredients from "../Ingredients/Ingredients";
import Events from "../Events/Events";
import RestaurantDetail from "./RestaurantDetail";
import CreateMenuForm from "../Menu/CreateMenuForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantsCategory,
  getRestaurantsCategoryAdmin,
} from "../../component/State/Restaurant/Action";
import { fetchRestaurantsOrder } from "../../component/State/Restaurant Order/Action";
import Dashboard from "../Dashboard/Dashboard";

const Admin = () => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const handleClose = () => {};
  useEffect(() => {
    dispatch(
      getRestaurantsCategoryAdmin({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
      })
    );
    dispatch(
      fetchRestaurantsOrder({
        restaurantId: restaurant.usersRestaurant?.id,
        jwt,
      })
    );
  }, []);
  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
          <AdminSiderBar handleClose={handleClose} />
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/category" element={<FoodCategory />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/event" element={<Events />} />
            <Route path="/details" element={<RestaurantDetail />} />
            <Route path="/add-menu" element={<CreateMenuForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
