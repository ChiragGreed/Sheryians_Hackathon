import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router'

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
        <Navbar />
        <main className="flex-1 flex flex-col">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default AppLayout