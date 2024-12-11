import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { confirmOrder } from "../State/Order/Action";

const VnPayPayment = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const orderId = query.get("orderId");
    const paymentStatus = query.get("paymentStatus");

    if (paymentStatus === "Success") {
      // Thanh toán thành công
      dispatch(confirmOrder(orderId))
        .then(() => {
          toast.success("Thanh toán thành công và đơn hàng đã được xác nhận.");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Có lỗi xảy ra khi xác nhận đơn hàng.");
        });
    } else {
      // Thanh toán thất bại
      toast.error("Thanh toán thất bại.");
    }
  }, [location, dispatch]);

  return <div>Đang xử lý thanh toán...</div>;
};

export default VnPayPayment;
