import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Card, Grid, Modal, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { updateAddress } from "../State/Authentication/Action";

const style = {
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

const Address = () => {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  console.log(auth.user.fullname, "1111");

  const initialValues = {
    streetAddress: selectedAddress?.streetAddress || "",
    state: selectedAddress?.state || "",
    mobile: selectedAddress?.mobile || "",
    city: selectedAddress?.city || "",
  };

  const validationSchema = Yup.object({
    streetAddress: Yup.string().required("Địa chỉ đường là bắt buộc"),
    state: Yup.string().required("Quận là bắt buộc"),
    mobile: Yup.string().required("Số điện thoại là bắt buộc"),
    city: Yup.string().required("Thành phố là bắt buộc"),
  });
  const jwt = localStorage.getItem("jwt");

  // Thay đổi trong hàm handleSubmit
  const handleSubmit = (values) => {
    const data = {
      fullName: auth.user.fullname,
      streetAddress: values.streetAddress,
      city: values.city,
      state: values.state,
      mobile: values.mobile,
      country: "Viet Nam",
    };

    // Lấy id từ selectedAddress
    dispatch(updateAddress({ rq: data, jwt, addressId: selectedAddress.id }));
    setOpen(false);
  };

  // Thay đổi trong hàm handleClick để chọn địa chỉ cụ thể
  const handleClick = (item) => {
    setSelectedAddress(item); // Gán địa chỉ đang chọn
    setOpen(true); // Mở modal cập nhật
  };

  return (
    <>
      <section className="lg:w-[100%] flex justify-center px-5 pb-10 lg:pb-0">
        <div className="flex gap-5 flex-wrap justify-center">
          {auth.addresses.map((item) => (
            <Card key={item.id} className="flex gap-5 w-64 p-5">
              <HomeIcon />
              <div className="space-y-3 text-gray-500 text-left">
                <h1 className="font-semibold text-lg text-white">Home</h1>
                <p>
                  {item.fullName}, {item.streetAddress}, {item.city},{" "}
                  {item.state}
                </p>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleClick(item)} // Truyền item vào handleClick
                >
                  Update
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

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
            enableReinitialize // Cần thêm để cập nhật form khi thay đổi selectedAddress
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
                    error={<ErrorMessage name="streetAddress" />}
                    helperText={<ErrorMessage name="streetAddress" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="Quận"
                    fullWidth
                    variant="outlined"
                    error={<ErrorMessage name="state" />}
                    helperText={<ErrorMessage name="state" />}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    error={<ErrorMessage name="city" />}
                    helperText={<ErrorMessage name="city" />}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="mobile"
                    label="Số điện thoại"
                    fullWidth
                    variant="outlined"
                    error={<ErrorMessage name="pincode" />}
                    helperText={<ErrorMessage name="pincode" />}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Update
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

export default Address;
