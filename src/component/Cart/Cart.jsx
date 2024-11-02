import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CartItem from "./CartItem";
import AddressCart from "./AddressCart";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";
import { getUser } from "../State/Authentication/Action";
import * as Yup from "yup";
import { addCounponToCart, clearCartAction } from "../State/Cart/Action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#000",
  boxShadow: 10,
  outline: "none",
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const validationSchema = Yup.object({
  streetAddress: Yup.string().required("Street address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string().required("Pincode is required"),
  city: Yup.string().required("City is required"),
});

const Cart = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { cart, auth, coupon } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [inputValue, setInputValue] = useState(""); // Giá trị từ input

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  const createOrderUsingSelectedAddress = (selectedAddress) => {
    dispatch(createOrder(selectedAddress));
    // dispatch(clearCartAction());
  };
  const calculateTotal = () => {
    return cart.cartItems.reduce((total, item) => {
      return total + item.food.price * item.quantity;
    }, 0);
  };
  const couponDiscount = cart?.coupon?.result || 0;
  const totalAmount = calculateTotal() - couponDiscount;
  console.log(totalAmount);
  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0]?.food?.restaurant.id,
        total: totalAmount,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: "Viet Nam",
          user: auth.user,
        },
        total: totalAmount,
      },
    };

    dispatch(createOrder(data));
  };

  const handleCoupon = () => {
    dispatch(
      addCounponToCart({
        couponCode: inputValue,
        totalAmount: calculateTotal(),
      })
    )
      .then((res) => {
        // Không cần kiểm tra res.error nữa, vì lỗi đã được xử lý trong catch của addCounponToCart
        // Tuy nhiên, bạn có thể kiểm tra redux state để xác nhận hành động đã được thực hiện thành công
      })
      .catch(() => {
        // Lỗi sẽ được xử lý trong addCounponToCart và thông báo đã được hiển thị qua toast
      });
  };

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Divider />

          <div>
            <p className="text-gray-400">Nhập mã giảm giá</p>
            <Input
              value={inputValue} // Lưu giá trị từ input
              onChange={(e) => setInputValue(e.target.value)}
              outline="none"
              type="text"
            />
            <Button className="ml-3" variant="outlined" onClick={handleCoupon}>
              Coupon
            </Button>
          </div>
          <Divider />

          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item total</p>
                <p>{calculateTotal()} đ</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Giảm giá</p>
                <p>{calculateTotal() === 0 ? "0" : couponDiscount} đ</p>
              </div>

              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Tổng</p>
                <p>{calculateTotal() === 0 ? "0" : totalAmount} đ</p>
              </div>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />

        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Chọn địa chỉ giao
            </h1>

            <div className="flex gap-5 flex-wrap justify-center">
              {auth.user?.addresses.map((item) => (
                <AddressCart
                  key={item.id}
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButton={true}
                />
              ))}

              <Card className="flex gap-5 w-64 p-5">
                <AddLocationIcon />
                <div className="space-y-3 text-gray-500 text-left">
                  <h1 className="font-semibold text-lg text-white">
                    Add new address
                  </h1>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setOpen(true)}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Địa chỉ"
                    fullWidth
                    variant="outlined"
                    error={!!(<ErrorMessage name="Địa chỉ" />)}
                    helperText={<ErrorMessage name="Địa chỉ" />}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    error={!!(<ErrorMessage name="state" />)}
                    helperText={<ErrorMessage name="state" />}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="Khu Vực"
                    fullWidth
                    variant="outlined"
                    error={!!(<ErrorMessage name="Khu Vực" />)}
                    helperText={<ErrorMessage name="Khu Vực" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Số điện thoại"
                    fullWidth
                    variant="outlined"
                    error={!!(<ErrorMessage name="Số điện thoại" />)}
                    helperText={<ErrorMessage name="Số điện thoại" />}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Deliver here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Cart;
