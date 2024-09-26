import React from "react"
import MainSlider from "../MainSlider/MainSlider"
import CategorySlider from "../CategorySlider/CategorySlider"
import Products from "../Products/Products"
import { Helmet } from "react-helmet"

export default function Home() {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Home</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>
      <MainSlider />
      <CategorySlider />
      {/* Products should not have a separate Helmet that overrides the Home one */}
      <Products />
    </div>
  )
}
