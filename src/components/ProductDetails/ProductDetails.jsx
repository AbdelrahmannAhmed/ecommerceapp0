import axios from "axios"
import React, { useContext, useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import { storeContext } from "../../context/storeContext"

export default function ProductDetails() {
  let { counter, setCounter } = useContext(storeContext)

  const [product, setProduct] = useState({})
  const [Load, setLoad] = useState(true)

  let x = useParams()
  console.log(x.Id)
  async function getProduct() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.Id}`)
    setProduct(data.data)
    setLoad(false)
    console.log(data.data)
  }

  useEffect(() => {
    getProduct()
  }, [])
  if (Load) {
    return <Loading></Loading>
  }
  return (
    <>
      <div className='container my-5 shadow-lg rounded-4'>
        <div className='row'>
          <div className='col-md-3'>
            <img src={product.imageCover} className='w-100' alt='' />
          </div>
          <div className='col-md-9 d-flex flex-column justify-content-center'>
            <h4>{product.title}</h4>
            <p className='my-3'>{product.description}</p>
            <div>
              <div>
                <span>{product.category.name}</span>
                <div>{product.price} EGP</div>
                <div>
                  <i className='fa-solid fa-star rating-color' />
                  {product.ratingsAverage}
                </div>
                <button
                  onClick={() => {
                    setCounter(counter + 1)
                  }}
                  className='btn bg-main w-25 text-white my-3'
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
