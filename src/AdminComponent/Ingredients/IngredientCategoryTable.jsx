import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm";
import { getIngredientCategory } from "../../component/State/Ingredients/Action";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const IngredientCategoryTable = () => {
  const { restaurant, ingredients } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(
      getIngredientCategory({
        id: restaurant.usersRestaurant.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, []);
  return (
    <div>
      <Box>
        <Card className="mt-2">
          <CardHeader
            title={"Ingredient Category"}
            sx={{ pt: 2, alignItems: "center" }}
            action={
              <IconButton onClick={handleOpen} aria-label="settings">
                <EditIcon />
              </IconButton>
            }
          />
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="left">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredients.category.map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateIngredientCategoryForm />
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default IngredientCategoryTable;
