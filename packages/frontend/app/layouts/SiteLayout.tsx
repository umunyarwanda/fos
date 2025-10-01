import React from 'react'
import { Outlet } from 'react-router'
import Footer from '~/components/Footer'
import Navbar from '~/components/Navbar'

function SiteLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default SiteLayout