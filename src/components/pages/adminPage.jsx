import React from 'react'
import Navbar from '../sections/Navbar'
import { Outlet } from 'react-router-dom'




function adminPage() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default adminPage