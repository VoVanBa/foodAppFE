import {
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  CREATE_ORDER_SUCCESS,
  GET_USERS_NOTIFICATION_SUCCESS,
  GET_USERS_ORDERS_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  orders: [],
  error: null,
  //notifications: []
};
export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_ORDERS_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_USERS_ORDERS_SUCCESS:
      return { ...state, error: null, loading: false, orders: payload };
    case GET_USERS_ORDERS_FAILURE:
      return { ...state, error: payload, loading: false };
    case CREATE_ORDER_SUCCESS:
      return { ...state, orders: [...state.orders, payload] };
    case CONFIRM_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case CONFIRM_ORDER_SUCCESS:
      return { ...state, loading: false, orders: [...state.orders, payload] };
    case CONFIRM_ORDER_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
