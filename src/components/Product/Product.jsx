import React, { useContext, useState } from "react"
import { Circles } from "react-loader-spinner"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { storeContext } from "../../context/storeContext"

export default function Product({ item }) {
  let { counter, setCounter, addToCart } = useContext(storeContext)
  const [loading, setLoading] = useState(true)

  async function addProductToCart(productId) {
    setLoading(false)
    let data = await addToCart(productId)
    if (data.status == "success") {
      toast.success("Product added Successfully")
      setCounter(data.numOfCartItems)
      setLoading(true)
    }
  }

  return (
    <div className='col-md-2'>
      <div className='product cursor-pointer rounded-3 p-3'>
        <Link to={"/product-details/" + item._id}>
          <img src={item.imageCover} className='w-100' alt='' />
          <span className='text-main'>{item.category.name}</span>
          <h6>{item.title.split(" ").slice(0, 2).join(" ")}</h6>
          <div className=' d-flex justify-content-between my-3'>
            <div>{item.price} EGP</div>
            <div>
              <i className='fa-solid fa-star rating-color' />
              {item.ratingsAverage}
            </div>
          </div>
        </Link>
        <button disabled={!loading} onClick={() => addProductToCart(item._id)} className='btn bg-main w-100 text-white d-flex justify-content-center'>
          {loading ? (
            " Add to cart"
          ) : (
            <div className=''>
              <Circles height={24} width={58.422} radius={5} color='#fff' ariaLabel='circles-loading' wrapperStyle={{}} wrapperClass='' visible={true} />
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
