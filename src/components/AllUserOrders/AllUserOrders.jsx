import axios from "axios"
import { jwtDecode } from "jwt-decode"
import React, { useEffect, useState } from "react"
import Loading from "../Loading/Loading"
import { Helmet } from "react-helmet"

export default function AllUserOrders() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  async function getUserOrders() {
    try {
      setIsLoading(true)
      let result = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${jwtDecode(localStorage.getItem("token")).id}`)
      setData(result.data)
      console.log(result.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserOrders()
  }, [])
  if (isLoading) {
    return <Loading></Loading>
  }
  if (data.length == 0) {
    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Orders</title>
          <link rel='canonical' href='http://mysite.com/example' />
        </Helmet>
        <h2 className='text-main text-center my-5'>No orders yet, check our products.</h2>
      </>
    )
  }
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Orders</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>
      <div className='container my-3 py-3 bg-main-light'>
        <h2>Your Orders</h2>
        <div className='row p-2'></div>
        {data.map((order, index) => {
          return (
            <div key={order._id} className='col-md-12 py-2'>
              <h4>Order Price :{order.totalOrderPrice}</h4>
              <div className='row'>
                {order.cartItems.map((orderItem) => {
                  return (
                    <div className='col-md-2'>
                      <div className='div product rounded-3 p-2'>
                        <img src={orderItem.product.imageCover} className='w-100 rounded-3' alt='' />
                        <h5>{orderItem.product.title.split(" ").slice(0, 3).join(" ")}</h5>
                        <h6>Price Each :{orderItem.price}</h6>
                        <h6>Count :{orderItem.count}</h6>
                      </div>
                    </div>
                  )
                })}
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    </>
  )
}
