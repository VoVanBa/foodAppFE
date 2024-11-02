import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateCategory } from "../../component/State/Restaurant/Action";
import { useDispatch, useSelector } from "react-redux";

const UpdateFoodCatogoryForm = ({ category }) => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    categoryId: category.id || "",
    categoryName: category.name || "",
    restaurantId: restaurant?.usersRestaurant?.id || "",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        categoryId: category.id,
        categoryName: category.name,
        restaurantId: restaurant?.usersRestaurant?.id || "",
      });
    }
  }, [category, restaurant]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: formData.categoryId,
      name: formData.categoryName,
      restaurantId: {
        id: formData.restaurantId,
      },
    };
    dispatch(
      updateCategory({ reqData: data, jwt: localStorage.getItem("jwt") })
    );
    console.log(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Update Food Category
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            label="Cuisine Type"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.categoryName}
          />
          <Button variant="contained" type="submit">
            Update Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFoodCatogoryForm;
