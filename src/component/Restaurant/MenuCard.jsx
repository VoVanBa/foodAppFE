import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { categorizeIngredients } from "../State/util/categrizeIngredents";
import { addItemToCart } from "../State/Cart/Action";
const token = localStorage.getItem("jwt");

const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckBoxChange = (itemName) => {
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();

    if (token == null) {
      // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
      navigate("/account/login");
      return;
    }

    const reqData = {
      token,
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredient: selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData));
    window.location.reload();
    console.log("Cart data", reqData);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images[0]}
              alt=""
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl text-left">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>{item.price} đ</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            {Object.keys(categorizeIngredients(item.ingredients)).map(
              (category, index) => (
                <div key={index}>
                  <p>{category}</p>
                  <FormGroup>
                    {categorizeIngredients(item.ingredients)[category].map(
                      (ingredient) => (
                        <FormControlLabel
                          key={ingredient.id}
                          control={
                            <Checkbox
                              onChange={() =>
                                handleCheckBoxChange(ingredient.name)
                              }
                            />
                          }
                          label={ingredient.name}
                        />
                      )
                    )}
                  </FormGroup>
                </div>
              )
            )}
          </div>
          <div className="pt-5 text-left">
            <Button variant="contained" type="submit" disabled={false}>
              {true ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
