import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import { createOrder } from "../State/Order/Action"; // Import action createOrder

const MySwal = withReactContent(Swal);

const AddressCart = ({ item, showButton, paymentMethod }) => {
  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  // Tính tổng tiền giỏ hàng
  const calculateTotal = () => {
    return cart.cartItems.reduce((total, item) => {
      return total + item.food.price * item.quantity;
    }, 0);
  };

  const couponDiscount = cart?.coupon?.result || 0; // Giảm giá từ coupon
  const totalAmount = calculateTotal() - couponDiscount; // Tổng tiền sau giảm giá

  // Xử lý đặt hàng
  const handleClick = async () => {
    if (cart.cartItems.length !== 0) {
      MySwal.fire({
        title: "Bạn có chắc?",
        text: "Bạn muốn đơn hàng vận chuyển đến địa chỉ này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const orderData = {
            restaurantId: cart.cartItems[0]?.food?.restaurant.id,
            deliveryAddress: {
              id: item.id,
              fullName: auth.user.fullname,
              streetAddress: item.streetAddress,
              city: item.city,
              state: item.state,
              mobile: item.mobile,
              country: "Viet Nam",
              user: auth.user,
            },
            total: totalAmount,
            paymentMethod: paymentMethod, // Thêm phương thức thanh toán vào orderData
          };

          const data = {
            jwt: localStorage.getItem("jwt"),
            order: orderData,
          };

          try {
            const response = await dispatch(createOrder(data));
            console.log(response, "log");

            if (paymentMethod === "vnpay") {
              // Trường hợp VNPAY, chuyển hướng đến URL của VNPAY nếu có
              if (response && response.redirectUrl) {
                window.location.href = response.redirectUrl; // Chuyển hướng đến VNPAY
              } else {
                console.error("No redirect URL found in the response");
                toast.error("Có lỗi xảy ra khi thanh toán, vui lòng thử lại.");
              }
            } else if (paymentMethod === "cash") {
              // Nếu thanh toán bằng tiền mặt, không cần chuyển hướng
              toast.success(
                "Đặt hàng thành công, vui lòng chuẩn bị thanh toán khi nhận hàng."
              );
            }

            MySwal.fire("Selected!", "Đơn hàng đã được chọn.", "success");
          } catch (error) {
            console.error("Error:", error);
            toast.error("Có lỗi xảy ra khi thanh toán, vui lòng thử lại.");
          }
        }
      });
    } else {
      toast.error("Vui lòng chọn sản phẩm !");
    }
  };

  return (
    <Card className="flex flex-col gap-5 w-72 p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-xl rounded-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300">
      <div className="flex items-center gap-3 m-0">
        <HomeIcon className="text-white w-10 h-10" />
        <h1 className="font-bold text-xl text-white">Home</h1>
      </div>
      <div className="text-gray-400 text-left">
        <p>Tên: {auth.user.fullName}</p>
        <p className="text-sm leading-relaxed">
          <span className="font-semibold text-gray-300">Địa chỉ:</span>{" "}
          {item.streetAddress}, {item.city}, {item.state}
        </p>
        <p className="text-sm leading-relaxed">
          <span className="font-semibold text-gray-300">Số điện thoại:</span>{" "}
          {item.mobile}
        </p>
        {showButton && (
          <Button
            variant="outlined"
            fullWidth
            onClick={handleClick}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-white transition-all duration-300 transform hover:scale-105"
          >
            Đặt hàng
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCart;
