import React from "react"
import { Offline } from "react-detect-offline"
import { createHashRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Authlayout from "./Layouts/AuthLayout/Authlayout.jsx"
import MainLayout from "./Layouts/MainLayout/MainLayout.jsx"
import Protectedroutes from "./ProtectedRoutes/Protectedroutes.jsx"
import Address from "./components/Address/Address.jsx"
import AllUserOrders from "./components/AllUserOrders/AllUserOrders.jsx"
import Brands from "./components/Brands/Brands.jsx"
import Cart from "./components/Cart/Cart.jsx"
import Categories from "./components/Categories/Categories.jsx"
import Home from "./components/Home/Home.jsx"
import Notfound from "./components/Notfound/Notfound.jsx"
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx"
import Products from "./components/Products/Products.jsx"
import Signin from "./components/Signin/Signin.jsx"
import Signup from "./components/Signup/Signup.jsx"
import Wishlist from "./components/Wishlist/Wishlist.jsx"
import StoreContextProvider from "./context/storeContext.js"

export default function App() {
  let routes = createHashRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          index: true,
          element: (
            <Protectedroutes>
              <Home />
            </Protectedroutes>
          ),
        },
        {
          path: "/home",
          element: (
            <Protectedroutes>
              <Home></Home>{" "}
            </Protectedroutes>
          ),
        },
        {
          path: "/categories",
          element: (
            <Protectedroutes>
              {" "}
              <Categories></Categories>
            </Protectedroutes>
          ),
        },
        {
          path: "/products",
          element: (
            <Protectedroutes>
              <Products></Products>{" "}
            </Protectedroutes>
          ),
        },
        {
          path: "/brands",
          element: (
            <Protectedroutes>
              <Brands></Brands>{" "}
            </Protectedroutes>
          ),
        },
        {
          path: "/cart",
          element: (
            <Protectedroutes>
              <Cart></Cart>
            </Protectedroutes>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <Protectedroutes>
              {" "}
              <Wishlist></Wishlist>{" "}
            </Protectedroutes>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <Protectedroutes>
              <Wishlist></Wishlist>
            </Protectedroutes>
          ),
        },
        {
          path: "/allorders",
          element: (
            <Protectedroutes>
              <AllUserOrders></AllUserOrders>
            </Protectedroutes>
          ),
        },
        {
          path: "/product-details/:Id",
          element: (
            <Protectedroutes>
              <ProductDetails></ProductDetails>
            </Protectedroutes>
          ),
        },
        {
          path: "/address/:Id",
          element: (
            <Protectedroutes>
              <Address></Address>
            </Protectedroutes>
          ),
        },
        { path: "*", element: <Notfound></Notfound> },
      ],
    },
    {
      path: "/",
      element: <Authlayout></Authlayout>,
      children: [
        {
          path: "/signup",
          element: <Signup></Signup>,
        },
        {
          path: "/signin",
          element: <Signin></Signin>,
        },
      ],
    },
  ])
  return (
    <>
      <Offline>
        <div className='offline'>You are Offline now !</div>{" "}
      </Offline>
      <ToastContainer autoClose={1000} theme='light' />
      <StoreContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </StoreContextProvider>
    </>
  )
}
