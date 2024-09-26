import axios from "axios"
import { createContext, useState } from "react"

export let storeContext = createContext(0)

import React from "react"

async function updateQuantity(productId, count) {
  try {
    const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers: { token: localStorage.getItem("token") } })
    return data
  } catch (err) {
    return err
  }
}

async function deleteCartItem(productId) {
  try {
    const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers: { token: localStorage.getItem("token") } })
    return data
  } catch (err) {
    return err
  }
}

async function addToCart(productId) {
  try {
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId }, { headers: { token: localStorage.getItem("token") } })
    return data
  } catch (err) {
    return err
  }
}

async function getUserCart() {
  try {
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token: localStorage.getItem("token") } })
    return data
  } catch (err) {
    console.log(err)
  }
}

async function pay(cartId, shippingAddress) {
  try {
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cartId, { shippingAddress }, { headers: { token: localStorage.getItem("token") } })
    return data
  } catch (err) {
    console.log(err)
  }
}

export default function StoreContextProvider({ children }) {
  const [counter, setCounter] = useState(0)
  return <storeContext.Provider value={{ counter, setCounter, addToCart, getUserCart, deleteCartItem, updateQuantity, pay }}>{children}</storeContext.Provider>
}
