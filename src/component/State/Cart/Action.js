import { type } from "@testing-library/user-event/dist/type";
import { API_URL, api } from "../../Config/api";
import {
  ADD_COUPON_TO_CART_FAILURE,
  ADD_COUPON_TO_CART_REQUEST,
  ADD_COUPON_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  CLEAR_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  FIND_CART_FAILURE,
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  GET_ALL_CART_ITEMS_FAILURE,
  GET_ALL_CART_ITEMS_REQUEST,
  GET_ALL_CART_ITEMS_SUCCESS,
  REMOVE_CARTITEM_FAILURE,
  REMOVE_CARTITEM_REQUEST,
  REMOVE_CARTITEM_SUCCESS,
  UPDATE_CARTITEM_FAILURE,
  UPDATE_CARTITEM_REQUEST,
  UPDATE_CARTITEM_SUCCESS,
} from "./ActionType";
import { toast } from "react-toastify";

export const findCart = (token) => {
  return async (dispatch) => {
    dispatch({
      type: FIND_CART_REQUEST,
    });
    try {
      const response = await api.get(`${API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("find", response);
      dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("find", error);

      dispatch({ type: FIND_CART_FAILURE, payload: error });
    }
  };
};

export const getAllCartItem = (reqData) => {
  return async (dispatch) => {
    dispatch({
      type: GET_ALL_CART_ITEMS_REQUEST,
    });
    try {
      const response = await api.get(
        `${API_URL}/api/cart/${reqData.cartId}/items`,
        {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        }
      );
      dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
    }
  };
};

export const addItemToCart = (reqData) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_ITEM_TO_CART_REQUEST,
    });
    try {
      debugger;
      const { data } = await api.put(
        `${API_URL}/api/cart/add`,
        reqData.cartItem,
        {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        }
      );
      debugger;
      toast.success("Add successful");
      dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
    } catch (error) {
      debugger;
      dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
    }
  };
};

export const updateCartItem = (reqData) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_CARTITEM_REQUEST,
    });
    try {
      const { data } = await api.put(
        `${API_URL}/api/cart/cart-item/update`,
        reqData.data,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log(data);
      dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error.message });
    }
  };
};

export const removeCartItem = ({ cartItemId, jwt }) => {
  return async (dispatch) => {
    dispatch({
      type: REMOVE_CARTITEM_REQUEST,
    });
    try {
      debugger;
      const { data } = await api.delete(
        `${API_URL}/api/cart/cart-item/${cartItemId}/remove`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      debugger;

      console.log("remove success");
      dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
    } catch (error) {
      debugger;

      dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: error.message });
    }
  };
};

export const clearCartAction = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_CART_REQUEST,
    });
    try {
      const { data } = await api.put(
        `${API_URL}/api/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      dispatch({ type: CLEAR_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CLEAR_CART_FAILURE, payload: error.message });
    }
  };
};

export const addCounponToCart = ({ couponCode, totalAmount }) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_COUPON_TO_CART_REQUEST,
    });

    try {
      debugger;
      const { data } = await api.get(
        `${API_URL}/api/calculate?couponCode=${couponCode}&totalAmount=${totalAmount}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      debugger;

      console.log(data, "coupon");
      toast.success("Mã giảm giá đã được áp dụng thành công!");
      dispatch({ type: ADD_COUPON_TO_CART_SUCCESS, payload: data });
    } catch (error) {
      debugger;

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra khi áp dụng mã giảm giá.";
      toast.error(errorMessage);
      dispatch({ type: ADD_COUPON_TO_CART_FAILURE, payload: errorMessage });
    }
  };
};
