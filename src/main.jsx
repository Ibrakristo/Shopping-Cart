import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Navbar from './components/Navbar'
import ErrorPage from './components/ErrorPage '
import Homepage from './components/Homepage'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react';

import Cart from './components/Cart'
import Shop from './components/Shop'
import Details from './components/details'
import Search from './components/Search'
import Spinner from './components/Spinner'
import ProtectedRoutes from './components/ProtectedRoutes'
import UnProtectedRoutes from './components/UnProtectedRoutes'
import Login from './components/Login'
import Register from './components/Register'


import '@stripe/stripe-js'
import Checkout from './components/Checkout'
import OrdersList from './components/OrdersList'
import Profile from './components/Profile'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true, element: <Homepage />
          },
          {
            path: "/shop",
            element: <Shop />
          }, {
            path: "/details/:id",
            element: <Details />,
          },
          {
            path: "/search",
            element: <Search />
          }, {
            path: "/spin",
            element: <Spinner />
          }, {
            element: <ProtectedRoutes />,
            children: [
              {
                path: "/cart",
                element: <Cart />
              },
              {
                path: "/checkout",
                element: <Checkout />
              },
              {
                path: "profile",
                element: <Profile />
              }
            ]
          },
          {
            element: <UnProtectedRoutes />,
            children: [
              {
                path: "/login",
                element: <Login />
              },
              {
                path: "/register",
                element: <Register />
              }
            ]
          }
        ]
      },
    ]
  }


])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>

    </Provider>
  </React.StrictMode>,
)
