import React from "react";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateRestaurantStatus } from "../../component/State/Restaurant/Action";

const RestaurantDetail = () => {
  const { restaurant } = useSelector((store) => store);

  console.log(restaurant, "444444");
  const dispatch = useDispatch();
  console.log("Chi tiết nhà hàng", restaurant);

  const handleRestaurantStatus = () => {
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant.usersRestaurant.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  return (
    <div className="lg:px-20 px-5 pb-10">
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          {restaurant.usersRestaurant?.name}
        </h1>
        <Button
          color={restaurant.usersRestaurant.open ? "error" : "primary"}
          className="py-[1rem] px-[2rem]"
          variant="contained"
          onClick={handleRestaurantStatus}
          size="large"
        >
          {restaurant.usersRestaurant.open ? "Đóng" : "Mở"}
        </Button>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<span className="text-gray-400">Nhà hàng</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Chủ sở hữu</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.owner.fullname}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Tên nhà hàng</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.name}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Loại hình ẩm thực</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.cuisineType}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Giờ mở cửa</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.openingHours}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Trạng thái</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.open ? (
                      <span className="px-5 py-2 rounded-full bg-green-500 text-gray-950">
                        Đang mở
                      </span>
                    ) : (
                      <span className="px-5 py-2 rounded-full bg-red-400 text-gray-950">
                        Đã đóng
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader
              title={<span className="text-gray-400">Địa chỉ</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Thành Phố</p>
                  <p className="text-gray-400">
                    <span className="pr-5">
                      {restaurant.usersRestaurant?.address?.city}
                    </span>
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Quận</p>
                  <p className="text-gray-400">
                    <span className="pr-5">
                      {restaurant.usersRestaurant?.address?.state}
                    </span>
                  </p>
                </div>

                <div className="flex">
                  <p className="w-48">Địa chỉ</p>
                  <p className="text-gray-400">
                    <span className="pr-5">
                      {restaurant.usersRestaurant?.address?.streetAddress}
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader
              title={<span className="text-gray-400">Liên hệ</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Email</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.contactInformation?.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Số điện thoại</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.address?.mobile}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Mạng xã hội</p>
                  <div className="text-gray-400 flex items-center space-x-3">
                    <span>-</span>
                    <a
                      href={
                        restaurant.usersRestaurant?.contactInformation
                          ?.instagram
                      }
                    >
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      href={
                        restaurant.usersRestaurant?.contactInformation?.facebook
                      }
                    >
                      <FacebookIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      href={
                        restaurant.usersRestaurant?.contactInformation?.twitter
                      }
                    >
                      <XIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      href={
                        restaurant.usersRestaurant?.contactInformation?.tiktok
                      }
                    >
                      <FontAwesomeIcon
                        icon={faTiktok}
                        style={{ fontSize: "2.75rem" }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RestaurantDetail;
