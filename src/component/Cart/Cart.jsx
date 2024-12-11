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
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import CartItem from "./CartItem";
import AddressCart from "./AddressCart";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";
import { getUser } from "../State/Authentication/Action";
import * as Yup from "yup";
import { addCounponToCart } from "../State/Cart/Action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  streetAddress: "",
  state: "",
  city: "Đà Nẵng",
  mobile: "",
};
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

const validationSchema = Yup.object({
  streetAddress: Yup.string().required("Địa chỉ đường là bắt buộc"),
  city: Yup.string().required("Khu vực là bắt buộc"),
  mobile: Yup.string().required("Số điện thoại di động là bắt buộc"),
});

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { cart, auth, coupon } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  const createOrderUsingSelectedAddress = (selectedAddress) => {
    dispatch(createOrder(selectedAddress));
  };

  const calculateTotal = () => {
    return cart.cartItems.reduce((total, item) => {
      return total + item.food.price * item.quantity;
    }, 0);
  };

  const couponDiscount = cart?.coupon?.result || 0;
  const totalAmount = calculateTotal() - couponDiscount;

  const handleSubmit = async (values) => {
    const orderData = {
      restaurantId: cart.cartItems[0]?.food?.restaurant.id,
      total: totalAmount,
      deliveryAddress: {
        fullName: auth.user?.fullname,
        streetAddress: values.streetAddress,
        city: values.city,
        state: values.state,
        mobile: values.mobile,
        country: "Viet Nam",
        user: auth.user,
      },
      paymentMethod: paymentMethod, // Thêm paymentMethod vào orderData
    };

    const data = {
      jwt: localStorage.getItem("jwt"),
      order: orderData,
    };
    console.log(data);

    try {
      // Thực hiện gọi createOrder thay vì gửi request HTTP
      const response = await dispatch(createOrder(data));

      // Xử lý khi chọn phương thức thanh toán
      if (paymentMethod === "vnpay") {
        // Trường hợp VNPAY, chuyển hướng đến URL của VNPAY nếu có
        if (response.redirectUrl) {
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
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi thanh toán, vui lòng thử lại.");
    }
  };

  const handleCoupon = () => {
    dispatch(
      addCounponToCart({
        couponCode: inputValue,
        totalAmount: calculateTotal(),
      })
    )
      .then((res) => {
        toast.success("Áp dụng mã giảm giá thành công");
      })
      .catch((error) => {
        toast.error("Mã giảm giá không hợp lệ");
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
              value={inputValue}
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
              <Divider />
              <div className="flex justify-between text-gray-400">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="paymentMethod"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label="Thanh toán bằng tiền mặt"
                    />
                    <FormControlLabel
                      value="vnpay"
                      control={<Radio />}
                      label="Chuyển khoản qua VNPAY"
                    />
                  </RadioGroup>
                </FormControl>
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
                  paymentMethod={paymentMethod} // Truyền paymentMethod vào AddressCart
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationIcon />
                <div className="space-y-3 text-gray-500 text-left">
                  <h1 className="font-semibold text-lg text-white">
                    Thêm địa chỉ
                  </h1>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setOpen(true)}
                  >
                    Thêm
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
            {({ touched, errors }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="streetAddress"
                      label="Địa chỉ"
                      fullWidth
                      variant="outlined"
                      error={Boolean(
                        touched.streetAddress && errors.streetAddress
                      )}
                      helperText={touched.streetAddress && errors.streetAddress}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="state"
                      label="Quận"
                      fullWidth
                      variant="outlined"
                      error={Boolean(touched.state && errors.state)}
                      helperText={touched.state && errors.state}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="mobile"
                      label="Số điện thoại"
                      fullWidth
                      variant="outlined"
                      error={Boolean(touched.mobile && errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="city"
                      label="Thành phố"
                      fullWidth
                      variant="outlined"
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} mt={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                    >
                      Đặt hàng
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Cart;
