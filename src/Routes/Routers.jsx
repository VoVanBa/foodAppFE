import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminToutes from "./AdminRoute";
import CustomerRoutes from "./CustomerRoutes";
import AdminRoute from "./AdminRoute";
import Authenticate from "../component/Auth/Authenticate";

const Routers = () => {
  return (
    <Routes>
      <Route path="/admin/restaurants/*" element={<AdminRoute />}></Route>
      {/* <Route path="/authenticate" element={<Authenticate />} /> */}
      <Route path="/*" element={<CustomerRoutes />}></Route>
    </Routes>
  );
};

export default Routers;
