import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home  from './views/Home/Home'
import Login from './views/Login/Login'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/login',
      element: <Login/>
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App