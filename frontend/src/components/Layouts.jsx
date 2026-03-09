// src/components/Layout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet /> {/* This is where the page content will render */}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
