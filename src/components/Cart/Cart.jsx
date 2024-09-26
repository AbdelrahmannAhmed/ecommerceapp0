import React, { useContext, useEffect, useState } from "react"
import { storeContext } from "../../context/storeContext"
import Loading from "../Loading/Loading"
import { toast } from "react-toastify"
import { Circles } from "react-loader-spinner"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Cart() {
  const [loadingProdId, setLoadingProdId] = useState(null)
  const [cartItems, setCartItems] = useState(null)
  let { getUserCart, deleteCartItem, setCounter, updateQuantity } = useContext(storeContext)
  const [load, setLoad] = useState(true)

  async function getCart() {
    let data = await getUserCart()
    if (data.status == "fail") {
      setCartItems(null)
    } else {
      setCartItems(data.data)
      console.log(data.data)
    }
    setLoad(false)
  }

  useEffect(() => {
    getCart()
  }, [])

  async function updateQuantityItems(productId, count) {
    let updated = await updateQuantity(productId, count)
    if (updated.status == "success") {
      toast.success("Item updated Successfully")
      setCounter(updated.numOfCartItems)
      setCartItems(updated.data)

      setLoadingProdId(null)
    }
  }

  async function deleteFromCart(productId) {
    setLoadingProdId(productId)
    let deleted = await deleteCartItem(productId)
    if (deleted.status == "success") {
      toast.error("Item Removed Successfully")
      setCounter(deleted.numOfCartItems)
      setCartItems(deleted.data)
      setLoadingProdId(null)
    }
  }

  if (load) {
    return <Loading></Loading>
  }

  if (cartItems == null || cartItems.totalCartPrice == 0)
    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Cart</title>
          <link rel='canonical' href='http://mysite.com/example' />
        </Helmet>
        <h2 className='text-main text-center my-5'>No Products in the Cart</h2>
      </>
    )

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Cart</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>
      <div className='container my-2 bg-main-light p-3'>
        <h2>Your Cart</h2>
        <p className='text-main'>Total Cart Price: {cartItems.totalCartPrice}</p>
        <div className='row'>
          {cartItems.products.map((item) => {
            return (
              <div className='row py-2  ' key={item._id}>
                <div className='col-md-1'>
                  <img src={item.product.imageCover} className='w-100' alt='' />
                </div>
                <div className='col-md-11 d-flex justify-content-between'>
                  <div>
                    <p className='p-0 m-0'>{item.product.title.split(" ").slice(0, 2).join(" ")}</p>
                    <p className='text-main p-0 m-0'>Price : {item.price} EGP</p>
                    <button onClick={() => deleteFromCart(item.product.id)} className='btn text-main p-0 m-0 d-flex'>
                      <i className='fa-solid fa-trash-can my-1'></i>Remove{" "}
                      {loadingProdId == item.product.id && (
                        <Circles height={24} width={58.422} radius={5} color='#0aad0a' ariaLabel='circles-loading' wrapperStyle={{}} wrapperClass='' visible={true} />
                      )}
                    </button>
                  </div>
                  <div>
                    <button onClick={() => updateQuantityItems(item.product.id, item.count - 1)} className='btn borderA'>
                      -
                    </button>
                    <span className='mx-3 px-0'>{item.count}</span>
                    <button onClick={() => updateQuantityItems(item.product.id, item.count + 1)} className='btn borderA'>
                      +
                    </button>
                  </div>
                </div>
                <hr className='mt-3' />
              </div>
            )
          })}
        </div>
        <Link to={`/address/${cartItems._id}`} className='btn bg-main text-white me-auto'>
          Place Order
        </Link>
      </div>
    </div>
  )
}
