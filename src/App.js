import './App.css';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Error from './pages/Error';

import CustomAuthContext from './authContext';
import CustomProductContext from './productContext';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

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
    <CustomAuthContext>
      <CustomProductContext>
        <RouterProvider router={browserRouter}/>
      </CustomProductContext>
    </CustomAuthContext>
  );
}

export default App;
