import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_EVENTS_REQUEST,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  FIND_RESTAURANT_BY_NAME_FAILURE,
  FIND_RESTAURANT_BY_NAME_REQUEST,
  FIND_RESTAURANT_BY_NAME_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_CATEGORY_BY_USER_FAILURE,
  GET_RESTAURANT_CATEGORY_BY_USER_REQUEST,
  GET_RESTAURANT_CATEGORY_BY_USER_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  GET_RESTAURANT_EVENTS_FAILURE,
  GET_RESTAURANT_EVENTS_REQUEST,
  GET_RESTAURANT_EVENTS_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
} from "./ActionType";
import { API_URL, api } from "../../Config/api";
import { toast } from "react-toastify";

// export const getAllRestaurantsAction = (token, page, limit) => {
//   return async (dispatch) => {
//     dispatch({ type: GET_ALL_RESTAURANT_REQUEST });

//     try {
//       debugger;
//       const { data } = await api.get(
//         `${API_URL}/api/restaurants?limit=${limit}&page=${page}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       debugger;

//       dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
//       console.log("all restaurant", data);
//     } catch (error) {
//       debugger;
//       console.log("erro", error);
//       dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error });
//     }
//   };
// };

export const getAllRestaurantsAction = (page, limit) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANT_REQUEST });

    try {
      const { data } = await api.get(
        `${API_URL}/api/restaurants?limit=${limit}&page=${page}`
      );

      dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
      console.log("all restaurant", data);
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error });
    }
  };
};
export const getRestaurantByUserId = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
      const { data } = await api.get(`${API_URL}/api/admin/restaurants/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Get restaurant by user id", data);
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
    } catch (err) {
      console.log("Catch error", err);
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: err });
    }
  };
};
export const getAllRestaurantsByUserId = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });

    try {
      const response = await api.get(
        `${API_URL}/api/restaurants/${reqData.restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );

      dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("erro", error);
      dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error });
    }
  };
};

// export const getRestaurantsById = (reqData) => {
//   return async (dispatch) => {
//     dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });

//     try {
//       const { data } = await api.get(
//         `${API_URL}/api/restaurants/${reqData.restaurantId}`
//         // {
//         //   headers: {
//         //     Authorization: `Bearer ${reqData.jwt}`,
//         //   },
//         // }
//       );
//       console.log("byid-------", data);
//       dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
//     } catch (error) {
//       console.log("erro", error);
//       dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
//     }
//   };
//};

export const getRestaurantsById = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
      const { data } = await api.get(
        `${API_URL}/api/restaurants/${reqData.restaurantId}`
        // {
        //   headers:{
        //       Authorization:`Bearer ${reqData.jwt}`
        //   }
        // }
      );
      dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
    } catch (err) {
      console.error("Catch error", err);
      dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: err });
    }
  };
};
export const createRestaurant = (reqData) => {
  //console.log("token -------", reqData.token);
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    debugger;
    try {
      const { data } = await api.post(
        `${API_URL}/api/admin/restaurants`,
        reqData.data,
        {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        }
      );
      debugger;
      toast.success("Thêm mới thành công");

      dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
    } catch (error) {
      debugger;
      toast.error("Thêm mới thất bại");
      console.log("erro", error);
      dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const getRestaurantsCategory = ({ restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });
    try {
      debugger;
      const res = await api.get(
        `${API_URL}/api/category/restaurant/${restaurantId}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${jwt}`,
        //   },
        // }
      );
      debugger;

      console.log("get restaurants category ", res.data);
      dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      debugger;

      dispatch({ type: GET_RESTAURANT_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getRestaurantsCategoryAdmin = ({ jwt, restaurantId }) => {
  return async (dispatch) => {
    debugger;
    dispatch({ type: GET_RESTAURANT_CATEGORY_BY_USER_REQUEST });
    try {
      const { data } = await api.get(
        `${API_URL}/api/admin/category/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      debugger;
      console.log("Get restaurant category", data);
      dispatch({
        type: GET_RESTAURANT_CATEGORY_BY_USER_SUCCESS,
        payload: data,
      });
    } catch (e) {
      debugger;

      console.log("Catch error", e);
      dispatch({ type: GET_RESTAURANT_CATEGORY_BY_USER_FAILURE, payload: e });
    }
  };
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });

    try {
      const res = await api.put(
        `/api/admin/restaurants/${restaurantId}`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: UPDATE_RESTAURANT_STATUS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("erro", error);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
  };
};

export const deleteRestaurant = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });

    try {
      const res = await api.delete(
        `${API_URL}/api/admin/restaurants/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: DELETE_RESTAURANT_SUCCESS,
        payload: restaurantId,
      });
    } catch (error) {
      console.log("erro", error);
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const updateRestaurantStatus = ({
  restaurantId,
  restaurantData,
  jwt,
}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });

    try {
      const res = await api.put(
        `${API_URL}/api/admin/restaurants/${restaurantId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: UPDATE_RESTAURANT_STATUS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("erro", error);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
  };
};

export const createEventAction = ({ data, jwt, restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });

    try {
      const res = await api.post(
        `${API_URL}/api/admin/events/restaurants/${restaurantId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("create event", res.data);
      dispatch({ type: CREATE_EVENTS_SUCCESS, payload: data });
    } catch (error) {
      console.log("erro", error);
      dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
    }
  };
};

export const getEventAction = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });

    try {
      const res = await api.get(`${API_URL}/api/events`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create event", res.data);
      dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("erro", error);
      dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
    }
  };
};
export const deleteEventAction = ({ eventId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });

    try {
      const res = await api.delete(`${API_URL}/api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create event", res.data);
      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: eventId });
    } catch (error) {
      console.log("erro", error);
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const getRestaurantEvents = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_EVENTS_REQUEST });

    try {
      const res = await api.get(
        `${API_URL}/api/admin/events/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("create event", res.data);
      dispatch({ type: GET_RESTAURANT_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("erro", error);
      dispatch({ type: GET_RESTAURANT_EVENTS_FAILURE, payload: error });
    }
  };
};

export const createCategory = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
      const res = await api.post(`${API_URL}/api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create category", res.data);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("erro", error);
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const updateCategory = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    debugger;
    try {
      const res = await api.put(`${API_URL}/api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      debugger;

      console.log("update category", res.data);
      dispatch(
        getRestaurantsCategoryAdmin({
          jwt,
          restaurantId: reqData.restaurantId.id,
        })
      );
      toast.success("Cập nhật thành công");
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      debugger;
      toast.success("Cập nhật thất bại");

      console.log("erro", error);
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getRastaurantsCategory = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });

    try {
      const res = await api.get(
        `${API_URL}/api/admin/category/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("create category", res.data);
      dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("erro", error);
      dispatch({ type: GET_RESTAURANT_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const findRestaurantByName = ({ page, limit, keyword }) => {
  return async (dispatch) => {
    dispatch({ type: FIND_RESTAURANT_BY_NAME_REQUEST });

    try {
      const { data } = await api.get(
        `${API_URL}/api/restaurants/search?keyword=${keyword}&page=${page}&limit=${limit}`,
        {
          // headers: {
          //   Authorization: `Bearer ${jwt}`,
          // },
        }
      );
      console.log("find restaurant", data);
      dispatch({ type: FIND_RESTAURANT_BY_NAME_SUCCESS, payload: data });
    } catch (error) {
      console.log("erro", error);
      dispatch({ type: FIND_RESTAURANT_BY_NAME_FAILURE, payload: error });
    }
  };
};
