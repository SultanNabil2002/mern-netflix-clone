import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'

import Landing from './pages/Landing'
import Browse from "./pages/Browse"
import Watch from './pages/Watch'
import Register from './pages/Register'
import Login from './pages/Login'
import Favorite from './pages/Favorite'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/watch/:id",
    element: <Watch />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/favorite",
    element: <Favorite />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
