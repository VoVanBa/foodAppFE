import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../State/Authentication/Action";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, cart } = useSelector((store) => store);
  const handleNevigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());

      navigate("/");
    }
  };
  console.log(auth, "dddddđ");
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <AccountCircleIcon sx={{ fontSize: "9rem" }} />
        <h1 className="py-5 text-2xl font-semibold">{auth.user.fullname}</h1>
        <p>{auth.user.email}</p>
        <Button
          variant="contained"
          onClick={handleNevigate}
          sx={{ margin: "2rem 0rem" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
