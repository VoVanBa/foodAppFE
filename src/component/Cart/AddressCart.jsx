import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card } from "@mui/material";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";

const MySwal = withReactContent(Swal);

const AddressCart = ({ item, showButton, handleSelectAddress }) => {
  const { cart, auth } = useSelector((store) => store);
  const calculateTotal = () => {
    return cart.cartItems.reduce((total, item) => {
      return total + item.food.price * item.quantity;
    }, 0);
  };

  console.log(item, " ca");
  const couponDiscount = cart?.coupon?.result || 0;
  const totalAmount = calculateTotal() - couponDiscount;

  const handleClick = () => {
    if (cart.cartItems.length !== 0) {
      MySwal.fire({
        title: "Are you sure?",
        text: "Do you want to select this address for delivery?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, select it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            jwt: localStorage.getItem("jwt"),
            order: {
              restaurantId: cart.cartItems[0]?.food?.restaurant.id,
              deliveryAddress: {
                id: item.id,
                fullName: auth.user?.fullName,
                streetAddress: item.streetAddress,
                city: item.city,
                state: item.state,
                postalCode: item.pincode,
                country: "Viet Nam",
                user: auth.user,
              },
              total: totalAmount,
            },
          };
          handleSelectAddress(data);

          // Hiển thị thông báo thành công
          MySwal.fire(
            "Selected!",
            "Your address has been selected.",
            "success"
          );
        }
      });
    } else {
      toast.error("Vui lòng chọn sản phẩm !");
    }
  };

  return (
    <Card className="flex gap-5 w-64 p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-xl rounded-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300">
      <HomeIcon className="text-white w-10 h-10" />
      <div className="space-y-3 text-gray-400 text-left">
        <h1 className="font-bold text-xl text-white">Home</h1>
        <p className="text-sm leading-relaxed">
          {item.streetAddress}, {item.city}, {item.state}
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
