import { type } from "@testing-library/user-event/dist/type";
import { API_URL, api } from "../../Config/api";
import {
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

export const createOrder = (reqData) => {
  return async (dispatch) => {
    debugger;
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const { data } = await api.post(`${API_URL}/api/order`, reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      debugger;
      toast.success("Order created successfully!");
      dispatch(clearCartAction());

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
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
      console.log("order", data);
      dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      console.log("order", error);
      dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error });
    }
  };
};
