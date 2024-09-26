import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/Slider/1.avif";
import img2 from "../../assets/images/Slider/2.avif";
import img3 from "../../assets/images/Slider/3.avif";
import img4 from "../../assets/images/Slider/4.avif";
import img5 from "../../assets/images/Slider/5.avif";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false
  };
  return (
    <div className="fixMargin">
      <Slider {...settings}>
        <img src={img1} className="w-100" alt="" />
        <img src={img2} className="w-100" alt="" />
        <img src={img3} className="w-100" alt="" />
        <img src={img4} className="w-100" alt="" />
        <img src={img5} className="w-100" alt="" />
      </Slider>
    </div>
  );
}
