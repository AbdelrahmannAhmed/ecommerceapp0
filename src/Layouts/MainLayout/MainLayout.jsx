import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet, RouterProvider } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
        <Navbar />
        <Outlet/>
        
    </div>
  )
}
