import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/Navbar/Navbar";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./Theme/DarkTheme";
import { CssBaseline } from "@mui/material";
import Home from "./component/Home/Home";
import RestaurantDetail from "./component/Restaurant/RestaurantDetail";
import Cart from "./component/Cart/Cart";
import Profile from "./component/Profile/Profile";
import CustomerRoutes from "./Routes/CustomerRoutes";
import Auth from "./component/Auth/Auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./component/State/Authentication/Action";
import { store } from "./component/State/store";
import { findCart } from "./component/State/Cart/Action";
import { Route, Router } from "react-router-dom";
import Routers from "./Routes/Routers";
import { getRestaurantByUserId } from "./component/State/Restaurant/Action";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    return () => {
      dispatch(getUser(auth.jwt || jwt));
      dispatch(findCart(jwt));
    };
  }, [auth.jwt]);
  useEffect(() => {
    if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
      dispatch(getRestaurantByUserId(auth.jwt || jwt));
    }
  }, [auth.user]);
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/* <Navbar></Navbar> */}
        {/* <Home></Home> */}
        {/* <RestaurantDetail></RestaurantDetail> */}
        {/* <Cart></Cart> */}

        {/* <Profile></Profile> */}
        <Routers />
      </ThemeProvider>
    </div>
  );
}

export default App;
