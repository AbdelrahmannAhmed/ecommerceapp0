import React, { useContext, useEffect } from "react"
import { NavLink } from "react-router-dom"
import logo from "../../assets/images/freshcart-logo.svg"
import { storeContext } from "../../context/storeContext"

export default function Navbar() {
  let { counter, setCounter, getUserCart } = useContext(storeContext)

  async function getCart() {
    let data = await getUserCart()
    setCounter(data.numOfCartItems)
  }

  useEffect(() => {
    getCart()
  }, [])

  const handleNavLinkClick = () => {
    // غلق الناف بار باستخدام Bootstrap
    const navbarToggle = document.getElementById("navbar-toggler")
    if (!navbarToggle.classList.contains("collapsed")) {
      navbarToggle.click()
    }
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary py-3'>
        <div className='container-fluid mx-5'>
          <NavLink className='navbar-brand' to=''>
            <img src={logo} alt='' />
          </NavLink>
          <button
            id='navbar-toggler'
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse text-end' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink className='nav-link' aria-current='page' to='/home' onClick={handleNavLinkClick}>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/products' onClick={handleNavLinkClick}>
                  Products
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/brands' onClick={handleNavLinkClick}>
                  Brands
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/allorders' onClick={handleNavLinkClick}>
                  Orders
                </NavLink>
              </li>
            </ul>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink className='nav-link position-relative' to='/cart' onClick={handleNavLinkClick}>
                  <i className='fa-solid fa-cart-shopping cartIcon mx-2' />
                  {counter ? <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{counter}</span> : ""}
                  Cart
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  onClick={() => {
                    localStorage.clear()
                    handleNavLinkClick() // غلق الناف بار عند تسجيل الخروج
                  }}
                  className='nav-link position-relative'
                  to='/signIn'
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
