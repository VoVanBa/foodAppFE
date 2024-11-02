import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  IconButton,
} from "@mui/material";
import { getRestaurantsCategoryAdmin } from "../../component/State/Restaurant/Action";
import UpdateFoodCatogoryForm from "./UpdateFoodCatogoryForm";
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";
import EditIcon from "@mui/icons-material/Edit";

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

const FoodCategoryTable = () => {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // Biến để kiểm tra đang tạo mới hay cập nhật
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(
      getRestaurantsCategoryAdmin({
        jwt,
        restaurantId: restaurant.usersRestaurant.id,
      })
    );
  }, [dispatch, jwt, restaurant.usersRestaurant.id]);

  const handleOpenCreate = () => {
    setIsCreating(true); // Đang tạo mới
    setSelectedCategory(null); // Đảm bảo không có danh mục nào được chọn khi tạo mới
    setOpen(true);
  };

  const handleRowClick = (category) => {
    setIsCreating(false); // Đang cập nhật
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  return (
    <Box>
      <Card className="mt-2">
        <CardHeader
          title={"Category"}
          sx={{ pt: 2, alignItems: "center" }}
          action={
            <IconButton onClick={handleOpenCreate} aria-label="create">
              <EditIcon /> {/* Có thể thay bằng icon khác như AddIcon */}
            </IconButton>
          }
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleRowClick(item)}
                  style={{ cursor: "pointer" }}
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
          {isCreating ? (
            <CreateFoodCategoryForm />
          ) : (
            selectedCategory && (
              <UpdateFoodCatogoryForm category={selectedCategory} />
            )
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default FoodCategoryTable;
