import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteFoodAction,
  getMenuItemsByAdminRestaurantId,
  getMenuItemsByRestaurantId,
} from "../../component/State/Menu/Action";
const MenuTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, menu } = useSelector((store) => store);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      getMenuItemsByAdminRestaurantId({
        restaurantId: restaurant.usersRestaurant.id,
        jwt,
        vegetarian: false,
        seassonal: false,
        nonveg: false,
        foodCategory: "",
      })
    );
  }, []);
  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt }));
  };
  return (
    <div>
      <Box>
        <Card className="mt-2">
          <CardHeader
            title={"Menu"}
            sx={{ pt: 2, alignItems: "center" }}
            action={
              <IconButton
                onClick={() => navigate("/admin/restaurants/add-menu")}
                aria-label="settings"
              >
                <EditIcon />
              </IconButton>
            }
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Ingredients</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Availability</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menu.menuItems.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Avatar src={item.images[0]}></Avatar>
                    </TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      {item.ingredients.map((ingredient) => (
                        <Chip className="mr-1" label={ingredient.name}></Chip>
                      ))}
                    </TableCell>
                    <TableCell align="center">{item.price} USD</TableCell>
                    <TableCell align="center">
                      {item.available ? "In Stoke" : "Out of Stoke"}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleDeleteFood(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </div>
  );
};

export default MenuTable;
