import axios from "axios";
import {
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_REQUEST,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
} from "./ActionType";
import { API_URL, api } from "../../Config/api";
import { toast } from "react-toastify";

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_URL}/auth/signup`,
      reqData.userData
    );
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurants");
    } else {
      reqData.navigate("/");
    }

    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    console.log("register success", data);
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
    console.log("error", error);
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_URL}/auth/signin`,
      reqData.userData
    );
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurants");
    } else {
      reqData.navigate("/");
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    window.location.reload();

    console.log("login success", data);
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });

    console.log("error", error);
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await api.get(`${API_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_USER_SUCCESS, payload: data });

    console.log("usser profile", data);
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error });

    console.log("error", error);
  }
};

export const addToFavorite =
  ({ jwt, restaurantId }) =>
  async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST });
    try {
      const { data } = await api.put(
        `${API_URL}/api/restaurants/${restaurantId}/add-favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });

      console.log("add to favorite", data);
    } catch (error) {
      dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error });

      console.log("error", error);
    }
  };

export const updateAddress =
  ({ rq, jwt, addressId }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });
    try {
      const { data } = await api.put(
        `${API_URL}/api/users/address/${addressId}`, // URL chứa @PathVariable
        rq, // Đây là body, chứa request data
        {
          headers: {
            Authorization: `Bearer ${jwt}`, // JWT token được gửi trong headers
          },
        }
      );

      dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: data });
      toast("Update success");
      dispatch(fetchUserAddresses(jwt));
      console.log("update address success", data);
    } catch (error) {
      dispatch({ type: UPDATE_ADDRESS_FAILURE, payload: error });
      toast("Update failed");
      console.log("error", error);
    }
  };

export const fetchUserAddresses = (jwt) => async (dispatch) => {
  dispatch({ type: FETCH_ADDRESSES_REQUEST });
  try {
    const { data } = await api.get(`${API_URL}/api/users/address`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: FETCH_ADDRESSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ADDRESSES_FAILURE, payload: error });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.clear();
    dispatch({ type: LOGOUT });
    console.log("logout success");
  } catch (error) {
    console.log("error", error);
  }
};
