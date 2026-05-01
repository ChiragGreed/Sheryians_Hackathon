import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'

const AppLayout = () => {
  return (
    <main>
        <Navbar />
        <Outlet />
    </main>
  )
}

export default AppLayout