import React, { Fragment } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventIcon from "@mui/icons-material/Event";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../component/State/Authentication/Action";
const AdminSiderBar = ({ handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const menu = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      path: "/",
    },
    {
      title: "Orders",
      icon: <LocalMallIcon />,
      path: "/orders",
    },
    {
      title: "Menu",
      icon: <ShopTwoIcon />,
      path: "/menu",
    },
    {
      title: "Food Category",
      icon: <CategoryIcon />,
      path: "/category",
    },
    {
      title: "Ingredients",
      icon: <FastfoodIcon />,
      path: "/ingredients",
    },
    {
      title: "Events",
      icon: <EventIcon />,
      path: "/event",
    },
    {
      title: "Details",
      icon: <ManageAccountsIcon />,
      path: "/details",
    },
    {
      title: "Add Menu",
      icon: <ManageAccountsIcon />,
      path: "/add-menu",
    },
    {
      title: "Logout",
      icon: <LogoutIcon />,
      path: "/",
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = (item) => {
    navigate(`/admin/restaurants${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
      handleClose();
    }
  };
  return (
    <div>
      <Fragment>
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          onClose={handleClose}
          open={true}
          anchor="left"
          sx={{ zIndex: 1 }}
        >
          <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]">
            {menu.map((item, index) => (
              <Fragment>
                <div
                  onClick={() => handleNavigate(item)}
                  className="px-5 flex items-center gap-5 cursor-pointer"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {index !== menu.length - 1 && <Divider />}
              </Fragment>
            ))}
          </div>
        </Drawer>
      </Fragment>
    </div>
  );
};

export default AdminSiderBar;
