import { Chip, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateCartItem } from "../State/Cart/Action";

const CartItem = ({ item }) => {
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt") || auth.jwt;

  const handleUpdateCartItem = (value) => {
    const newQuantity = item.quantity + value;

    // Nếu số lượng nhỏ hơn hoặc bằng 0, gọi hàm xóa khỏi giỏ hàng
    if (newQuantity <= 0) {
      handleRemoveCartItem();
      return;
    }

    const data = { cartItemId: item.id, quantity: newQuantity };

    // Cập nhật sản phẩm trong giỏ hàng mà không reload trang
    dispatch(updateCartItem({ data, jwt })).then(() => {
      // Cập nhật lại totalPrice của item sau khi thay đổi quantity
      item.totalPrice = item.food.price * newQuantity;
    });
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({ cartItemId: item.id, jwt }));
  };

  return (
    <div className="px-5">
      <div className="lg:flex items-center lg:space-x-5">
        <div>
          <img
            className="w-[5rem] h-[5rem] object-cover"
            src={item.food.images[0]}
            alt=""
          />
        </div>

        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full text-left">
            <p>{item.food.name}</p>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>

                <div className="w-5 h-5 text-xs flex items-center justify-center">
                  {item.quantity}
                </div>

                <IconButton onClick={() => handleUpdateCartItem(1)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <p>{item.totalPrice}đ</p> {/* Hiển thị giá tổng dựa trên số lượng */}
        </div>
      </div>

      <div className="pt-3 space-x-2 text-left">
        {item.ingredients.map((ingredient) => (
          <Chip label={ingredient} key={ingredient} />
        ))}
      </div>
    </div>
  );
};

export default CartItem;
