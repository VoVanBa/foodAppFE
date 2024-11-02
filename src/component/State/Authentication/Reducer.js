import { isPresentInFavorites } from "../../Config/logic";
import {
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  FETCH_ADDRESSES_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
} from "./ActionType";

const initalState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  favourites: [],
  addresses: [],
  success: null,
};
export const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
    case ADD_TO_FAVORITE_REQUEST:
      return { ...state, isLoading: true, error: null, success: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        success: "Register success",
      };
    case FETCH_ADDRESSES_SUCCESS:
      // Lưu danh sách địa chỉ mới vào state
      return {
        ...state,
        addresses: action.payload,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        favourites: action.payload.favourites,
        addresses: action.payload.addresses,
      };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addresses: state.addresses.map((address) =>
          address.id === action.payload.id ? action.payload : address
        ),
      };
    case ADD_TO_FAVORITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        favourites: isPresentInFavorites(state.favourites, action.payload)
          ? state.favourites.filter((item) => item.id !== action.payload.id)
          : [action.payload, ...state.favourites],
      };
    case LOGOUT:
      return initalState;

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVORITE_FAILURE:
    case UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };
    default:
      return state;
  }
};
