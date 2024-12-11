import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const OrderCard = ({ order }) => {
  // Ensure order and order.items are defined and contain valid items
  const groupedItems = (order?.items || []).reduce((acc, item) => {
    // Check if the item and item.food are defined
    if (item && item.food) {
      const foodId = item.food.id;
      if (!acc[foodId]) {
        acc[foodId] = { item: item, quantity: 0 };
      }
      acc[foodId].quantity += 1;
    }
    return acc;
  }, {});

  console.log(groupedItems, "Grouped items");

  return (
    <Card className="p-4 shadow-md rounded-lg border border-gray-200 mb-4">
      <CardContent>
        {Object.values(groupedItems).map((groupedItem) => (
          <div
            key={groupedItem.item.food.id}
            className="flex justify-between items-center mb-4"
          >
            <div className="flex items-center space-x-4">
              <CardMedia
                component="img"
                image={groupedItem.item.food.images[0] || "/default-image.jpg"} // Fallback image
                alt={groupedItem.item.food.name}
                className="h-20 w-20 object-cover rounded-md"
              />
              <div>
                <Typography variant="h6" className="font-semibold">
                  {groupedItem.item.food.name}
                </Typography>
                <Typography color="textSecondary" className="text-sm w-[130px]">
                  Price: {groupedItem.item.totalPrice}đ
                </Typography>
                <Typography color="textSecondary" className="text-sm">
                  Quantity: {groupedItem.item.quantity}{" "}
                  {/* Fixed quantity display */}
                </Typography>
              </div>
            </div>
            <Button
              variant="contained"
              color={order.orderStatus === "Delivered" ? "success" : "primary"}
              className="cursor-not-allowed"
              disabled
            >
              {order.orderStatus}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
