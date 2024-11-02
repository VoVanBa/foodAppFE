import { Avatar, Badge, Box, IconButton, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findRestaurantByName } from "../State/Restaurant/Action";

const Navbar = () => {
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({});
  const [inputValue, setInputValue] = useState("");

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-account");
    } else {
      navigate("/admin/restaurants");
    }
  };

  const handleSearch = () => {
    dispatch(findRestaurantByName({ page: 1, limit: 8, keyword: inputValue }));
  };

  const handleLogoClick = () => {
    navigate("/"); // Không cần reload trang
  };

  // const getUserDetails = async (accessToken) => {
  //   const response = await fetch(
  //     `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
  //   );
  //   const data = await response.json();
  //   setUserDetails(data);
  // };

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("jwt");

  //   if (!accessToken) {
  //     navigate("/login");
  //   }

  //   getUserDetails(accessToken);
  // }, [navigate]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box className="px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={handleLogoClick}
          className="logo font-semibold text-gray-300 text-2x1"
        >
          Food-App
        </li>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-10">
        {/* Input tìm kiếm */}
        <div className="flex items-center">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown} // Kích hoạt tìm kiếm khi nhấn Enter
            placeholder="Search for restaurants..."
            className="w-96"
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>

        <div className="">
          {auth.user ? (
            <Avatar
              onClick={() => navigate("/my-profile")}
              sx={{ bgcolor: "white", color: pink.A400 }}
            >
              {userDetails.name ? userDetails.name[0].toUpperCase() : ""}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>

        <div className="">
          <IconButton onClick={() => navigate("/cart")}>
            <Badge color="primary" badgeContent={cart.cart?.items.length}>
              <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
