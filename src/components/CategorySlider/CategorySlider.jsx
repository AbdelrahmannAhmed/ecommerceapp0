import axios from "axios"
import React, { useEffect, useState } from "react"
import Slider from "react-slick"

export default function CategorySlider() {
  const [categories, setCategories] = useState([])
  async function getCategories() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    setCategories(data.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div className='fixMargin'>
      <div className='container-fluid my-3'>
        <h3>Shop Popular Categories</h3>
      </div>
      <Slider {...settings}>
        {categories.map((item, index) => {
          return (
            <div className='px-1 ' key={index}>
              <img src={item.image} className='w-100' height={200} alt='' />
              <h5 className='text-center'>{item.name}</h5>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
