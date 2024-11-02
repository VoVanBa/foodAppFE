import axios from "axios";
import { API_URL, api } from "../../Config/api";
import {
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
} from "../Restaurant/ActionType";
import {
  GET_RESTAURANTS_ORDER_FAILURE,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
} from "./ActionType";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
  return async (dispatch) => {
    // Sửa từ "asyncs" thành "async"
    try {
      // Dispatch action để thông báo rằng quá trình cập nhật đã bắt đầu
      dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });

      // Gọi API để cập nhật trạng thái đơn hàng
      const response = await api.put(
        `${API_URL}/api/admin/order/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // Dispatch action nếu cập nhật thành công
      dispatch({
        type: UPDATE_RESTAURANT_STATUS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch action nếu cập nhật thất bại
      dispatch({
        type: UPDATE_RESTAURANT_STATUS_FAILURE,
        error,
      });
    }
  };
};

export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });
    try {
      debugger;
      const { data } = await api.get(
        `${API_URL}/api/admin/order/restaurant/${restaurantId}`,
        {
          params: { order_status: orderStatus },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const orders = data;
      debugger;

      console.log("Restaurant order-------", orders);
      dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, payload: orders });
    } catch (e) {
      debugger;

      console.log("Catch error", e);
      dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, e });
    }
  };
};
