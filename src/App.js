import './App.css';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Error from './pages/Error';


// react toasts
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store';

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        {index: true, element: <Home />},
        { path: 'signin',
          element: <Signin />,
        },
        {
          path: 'signup',
          element: <Signup />
        },
        {
          path: 'order',
          element: <Order />
        },
        {
          path: 'cart',
          element: <Cart />
        }
      ]
    }
  ])
  return (
    <Provider store={store}>
      <RouterProvider router={browserRouter}/>
      <ToastContainer />
    </Provider>
  );
}

export default App;
