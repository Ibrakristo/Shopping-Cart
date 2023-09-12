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
import store from './store'
import Cart from './components/Cart'
import Shop from './components/Shop'
import Details from './components/details'
import Search from './components/Search'
import Spinner from './components/Spinner'
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
            path: "/cart",
            element: <Cart />
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
          }
        ]
      },
    ]
  }


])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
