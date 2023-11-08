import '../styles/Navbar.css';

import orderIcon from '../assets/images/order.png';
import cartIcon from '../assets/images/cart.png';
import homeIcon from '../assets/images/homeIcon.png';
import signInIcon from '../assets/images/signInIcon.png';
import signOutIcon from '../assets/images/signOut.png';

import { Link, NavLink, Outlet } from 'react-router-dom';

import { useAuthValue } from '../authContext';

function Navbar(){
    const {isLoggedIn, signOut} = useAuthValue();

    return(
    <>
        <div className='nav-container'>
            <Link to='/'>
                <h2>BuyBusy</h2>
            </Link>

            <div className='nav-btns'>
                <Link to='/'>
                    <span>
                        <img src={homeIcon} alt='home' width='40' height='40' /> Home
                    </span>
                </Link>
                
                {isLoggedIn && <NavLink to='/order'>
                    <span>
                        <img src={orderIcon} alt='order' width='40' height='40' /> Order
                    </span>
                </NavLink>}

                {isLoggedIn && <NavLink to='/cart'>
                    <span>
                        <img src={cartIcon} alt='cart' width='40' height='40' /> Cart
                    </span>
                </NavLink>}

                <NavLink to={!isLoggedIn ? '/signin' : '/'}>
                    <span>
                    {!isLoggedIn ? 
                        <>
                            <img src={signInIcon} alt='signIn' width='40' height='40' /> Sign In
                        </>
                    :
                        <>
                            <img src={signOutIcon} alt='signOut' width='40' height='40' /> 
                            <p onClick={signOut} style={{ margin: '0' }}>Sign Out</p>
                        </>
                    }
                    </span>
                
                </NavLink>
                
            </div>
        </div>
        <Outlet />
    </>
    );
}

export default Navbar;