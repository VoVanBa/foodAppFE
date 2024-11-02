import React from "react";
import Slider from "react-slick";
import CarouselItem from "./CarouselItem.jsx";
import { topMeel } from "./topMeels";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MultilItemCarousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div>
      <Slider {...settings}>
        {topMeel.map((item) => (
          <CarouselItem image={item.image} title={item.title} />
        ))}
      </Slider>
    </div>
  );
};

export default MultilItemCarousel;
