import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";
import { useDispatch } from "react-redux";
import * as Yup from "yup"; // Thêm Yup để validate

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

// Validation schema với Yup
const validationSchema = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập tên đầy đủ"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  role: Yup.string().required("Vui lòng chọn vai trò"),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(registerUser({ userData: values, navigate }));
    console.log(values);
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Đăng ký
      </Typography>

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema} // Thêm validation schema
      >
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="Họ tên đầy đủ"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <ErrorMessage
            name="fullName"
            component="div"
            style={{ color: "red" }}
          />

          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
          />
          <ErrorMessage name="email" component="div" style={{ color: "red" }} />

          <Field
            as={TextField}
            name="password"
            label="Mật khẩu"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "red" }}
          />

          <Field
            as={Select}
            name="role"
            fullWidth
            margin="normal"
            label="Vai trò"
            variant="outlined"
          >
            <MenuItem value={"ROLE_CUSTOMER"}>Khách hàng</MenuItem>
            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Chủ nhà hàng</MenuItem>
          </Field>
          <ErrorMessage name="role" component="div" style={{ color: "red" }} />

          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Đăng ký
          </Button>
        </Form>
      </Formik>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Bạn đã có tài khoản?
        <Button size="small" onClick={() => navigate("/account/login")}>
          Đăng nhập
        </Button>
      </Typography>
    </div>
  );
};

export default RegisterForm;
