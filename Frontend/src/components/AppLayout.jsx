import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router'

const AppLayout = () => {

  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
        {!['/register', '/login'].includes(pathname) && <Navbar />}
        <main className="flex-1 flex flex-col">
            <Outlet />
        </main>
        {!['/register', '/login'].includes(pathname) && <Footer />}
    </div>
  )
}

export default AppLayout