import { API_URL, api } from "../../Config/api";
import {
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  GET_INGREDIENTS,
  UPDATE_STOCK,
} from "./ActionType";

export const getIngredientsOfRestaurant = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const { data } = await api.get(
        `${API_URL}/api/ingredients/restaurant/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: GET_INGREDIENTS,
        payload: data,
      });
      console.log("Get all ingredients", data);
    } catch (e) {
      console.log("Catch error", e);
    }
  };
};
export const createIngredientCategory = ({ data, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        `${API_URL}/api/admin/ingredients/category`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("create ingredients = ", response.data);
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_FAILURE, // Bạn có thể thêm một action type để xử lý lỗi.
        payload: error.message,
      });
    }
  };
};
export const createIngredient = ({ data, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        `${API_URL}/api/admin/ingredients`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Create ingredient", response.data);
      dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
    } catch (e) {
      console.log("Catch error", e);
    }
  };
};

export const getIngredientCategory = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.get(
        `${API_URL}/api/ingredients/restaurant/${id}/category`,

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("get ingredients = ", response.data);
      dispatch({
        type: GET_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const updateStockIngredient = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const { data } = await api.put(
        `${API_URL}/api/admin/ingredients/${id}/stoke`,
        {},

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: UPDATE_STOCK,
        payload: data,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};
