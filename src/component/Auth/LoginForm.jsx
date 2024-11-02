import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../State/Authentication/Action";
import * as Yup from "yup"; // Thêm Yup để validate
import GoogleIcon from "@mui/icons-material/Google";
import { OAuthConfig } from "../../Configurations/configuration";
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [loginError, setLoginError] = useState(""); // State để lưu thông báo lỗi

  const handleSubmit = async (values) => {
    console.log(auth, "daaaaaaaaaata");
    await dispatch(loginUser({ userData: values, navigate }));

    if (auth.error) {
      setLoginError("Sai tài khoản hoặc mật khẩu");
    }
  };
  const handleClick = () => {
    const callbackUrl = OAuthConfig.redirectUri;
    const authUrl = OAuthConfig.authUri;
    const googleClientId = OAuthConfig.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    console.log(targetUrl);

    window.location.href = targetUrl;
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Đăng nhập
      </Typography>

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema} // Thêm validation schema
      >
        <Form>
          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            error={!!loginError}
          />
          <ErrorMessage name="email" component="div" style={{ color: "red" }} />

          <Field
            as={TextField}
            name="password"
            label="Mật khẩu"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!loginError}
          />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "red" }}
          />

          {loginError && (
            <Typography color="error" variant="body2" align="center">
              {loginError}
            </Typography>
          )}

          {/* <Button
            type="button"
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleClick}
            fullWidth
            sx={{ gap: "10px" }}
          >
            <GoogleIcon />
            Continue with Google
          </Button> */}

          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Đăng nhập
          </Button>
        </Form>
      </Formik>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Bạn chưa có tài khoản?
        <Button size="small" onClick={() => navigate("/account/register")}>
          Đăng ký
        </Button>
      </Typography>
    </div>
  );
};

export default LoginForm;
