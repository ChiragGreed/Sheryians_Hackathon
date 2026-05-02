import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import ChatPage from './features/chat/pages/ChatPage'

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/chat",
          element: <ChatPage />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App  