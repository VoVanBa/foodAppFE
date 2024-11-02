import React, { useEffect, useState } from "react";
import "./Home.css";
import MultilItemCarousel from "./MultilItemCarousel.jsx";
import RestaurantCart from "../Restaurant/RestaurantCart.jsx";
import Auth from "../Auth/Auth.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  findRestaurantByName,
  getAllRestaurantsAction,
} from "../State/Restaurant/Action.js";
import { useNavigate } from "react-router-dom";
import { findCart } from "../State/Cart/Action.js";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurant = useSelector((store) => store.restaurant); // Truy cập thẳng từ store
  const totalPage = restaurant.totalPage;
  const keyword = "";
  const limit = 8;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getAllRestaurantsAction(currentPage, limit));
  }, [currentPage, dispatch]);

  return (
    <div className="pb-10">
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-6xl font-bold z-10 py-5">Food-app</p>
          <p className="z-10 text-gray-300 text-xl lg:text-4xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            perferendis fugit placeat iste
          </p>
        </div>
        <div className="cover absolute top-0 left-0 ring-0"></div>
        <div className="fadout"></div>
      </section>

      <section className="p-10 lg:py-10 lg:px-20">
        <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">
          Top Meals
        </p>
        <MultilItemCarousel />
      </section>

      <section className="px-5 lg:px-20 pt-15">
        <h1 className="text-2xl font-semibold text-gray-400 py-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </h1>
        <div className="flex flex-wrap items-center justify-around gap-5">
          {Array.isArray(restaurant.restaurants) &&
            restaurant.restaurants.map((item) => (
              <RestaurantCart key={item.id} item={item} />
            ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center mt-14">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {Array.from({ length: totalPage }, (_, index) => (
              <li
                key={`page-${index + 1}`}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPage ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default Home;
