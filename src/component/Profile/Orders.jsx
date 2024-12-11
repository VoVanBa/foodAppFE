// Orders.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../State/Order/Action";
import OrderCard from "./OrderCard";
import { Typography } from "@mui/material";

const Orders = () => {
  const { order } = useSelector((store) => store);

  console.log(order.id, "1111111111145");
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getUserOrders(jwt));
    }
  }, [jwt, dispatch]);

  return (
    <div className="flex items-center flex-col px-4">
      <Typography variant="h4" className="py-7 font-semibold">
        My Orders
      </Typography>

      <div className="space-y-5 w-full lg:w-2/3">
        {order.orders
          .slice() // Tạo một bản sao của mảng để không thay đổi mảng gốc
          .sort((a, b) => new Date(b.createAt) - new Date(a.createAt)) // Sắp xếp theo ngày mới nhất
          .map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
      </div>
    </div>
  );
};

export default Orders;
