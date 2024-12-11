import { type } from "@testing-library/user-event/dist/type";
import { API_URL, api } from "../../Config/api";
import {
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_USERS_NOTIFICATION_SUCCESS,
  GET_USERS_ORDERS_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
} from "./ActionType";
import { toast } from "react-toastify";
import { clearCartAction } from "../Cart/Action";
import { fetchUserAddresses } from "../Authentication/Action";
import axios from "axios";

export const createOrder = (reqData) => {
  return async (dispatch) => {
    debugger;
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const response = await api.post(`${API_URL}/api/order`, reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      debugger;
      dispatch(clearCartAction());
      const data = response.data;

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
      return data;
    } catch (e) {
      debugger;

      console.log("Catch error", e);
      dispatch({ type: CREATE_ORDER_FAILURE, payload: e });
    }
  };
};

export const getUserOrders = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_ORDERS_REQUEST });
    try {
      const { data } = await api.get(`${API_URL}/api/order/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      console.log("order", error);
      dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error });
    }
  };
};

export const createOrderSuccess = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
});

export const confirmOrder = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: CONFIRM_ORDER_REQUEST });

    try {
      const token = localStorage.getItem("jwt"); // Lấy JWT token từ localStorage
      const { data } = await axios.post(
        `${API_URL}/api/order/vnpay-payment`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
          },
        }
      );

      dispatch({ type: CONFIRM_ORDER_SUCCESS, payload: data });
      dispatch(createOrderSuccess(data));
    } catch (error) {
      console.error("Error:", error);
      dispatch({ type: CONFIRM_ORDER_FAILURE, payload: error });
    }
  };
};
