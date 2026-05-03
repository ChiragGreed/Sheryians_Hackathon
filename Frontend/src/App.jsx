import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from './components/AppLayout'
import Home from './features/home/pages/Home'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import AcceptAgentInvitation from './features/auth/pages/AcceptAgentInvitation'
import ChatPage from './features/chat/pages/ChatPage'
import AdminPage from './features/admin/pages/AdminPage'
import SettingsPage from './features/admin/pages/SettingsPage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

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
          element: <PublicRoute />,
          children: [
            {
              path: "login",
              element: <Login />
            },
            {
              path: "register",
              element: <Register />
            }
          ]
        },
        {
          path: "agent/accept-invitation",
          element: <AcceptAgentInvitation />
        },
      ]
    },
    // Protected Routes (Chat, Admin, Settings)
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/chat",
          element: <ChatPage />
        },
        {
          path: "/admin",
          element: <AdminPage />
        },
        {
          path: "/settings",
          element: <SettingsPage />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App  