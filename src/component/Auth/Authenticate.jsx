// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Box, CircularProgress, Typography } from "@mui/material";
// import { setToken } from "../../Service/localStorageService";

// const Authenticate = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true); // Thay đổi từ isLoggedin sang isLoading

//   useEffect(() => {
//     const authCodeRegex = /code=([^&]+)/; // Regex để lấy mã xác thực từ URL
//     const isMatch = window.location.href.match(authCodeRegex);
//     const loginType = "google"; // Hoặc bạn có thể lấy từ URL, nếu cần linh hoạt hơn

//     if (isMatch) {
//       const authCode = isMatch[1];

//       // Gọi API để đổi mã code lấy JWT qua POST
//       fetch("http://localhost:8080/auth/social/callback", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded", // Sử dụng nếu bạn đang gửi URL-encoded form data
//         },
//         body: new URLSearchParams({
//           code: authCode,
//           login_type: loginType,
//         }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Failed to authenticate");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           // Kiểm tra nếu token có trong response
//           if (data.token) {
//             setToken(data.token); // Lưu JWT vào localStorage
//             navigate("/"); // Điều hướng về trang chính sau khi đăng nhập thành công
//           } else {
//             throw new Error("Token not found");
//           }
//         })
//         .catch((error) => {
//           console.error("Authentication error:", error);
//           setIsLoading(false); // Nếu có lỗi, dừng quá trình loading
//         });
//     } else {
//       // Nếu không tìm thấy mã code, dừng quá trình loading
//       setIsLoading(false);
//     }
//   }, [navigate]);

//   if (isLoading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "30px",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//         <Typography>Authenticating...</Typography>
//       </Box>
//     );
//   } else {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <Typography color="error">
//           Authentication failed. Please try again.
//         </Typography>
//       </Box>
//     );
//   }
// };

// export default Authenticate;
