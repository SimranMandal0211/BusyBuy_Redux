import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainContent from "../components/Home/MainContent";
import FilterBar from '../components/Home/FilterBar';
import Loader from '../components/Loader';

import styles from '../styles/home.module.css';

import { authSelector, getInitialUserList, setLoggedIn, setUserLoggedIn } from "../Redux/Reducers/authReducer";
import { getInitialCartOrdersThunk } from "../Redux/Reducers/productReducer";


function Home(){
    // for calling actions
    const dispatch = useDispatch();

    // data from Auth Reducers
    const { isLoggedIn, userLoggedIn } = useSelector(authSelector);
    
    const [search, setSearch] = useState('');
    const [price, setPrice] = useState(5000);
    const [category, setCategory] = useState('none');

    const [isLoading, setLoading] = useState(true);

     // get the initial data of cart and previous orders history
     useEffect(() => {
        dispatch(getInitialCartOrdersThunk());
    },[userLoggedIn]);

    
    useEffect(() => {
        // show/hide load spinner
        setTimeout(() => {
            setLoading(false);
        }, 600);

        // getting user's token from local Storage on first render
        const token=window.localStorage.getItem("token");
        if(token){
            // if user is logged in
            // getting loggedIn user's data 
            const index=window.localStorage.getItem("index");
            const user=JSON.parse(index);
            // set token and loggedIn user
            dispatch(setLoggedIn(token));
            dispatch(setUserLoggedIn(user));
        }
    }, []);


    // get list of all the user's in database
    useEffect(()=>{
        dispatch(getInitialUserList());
    },[isLoggedIn]);


    return(
        <>
            {isLoading ? <Loader /> :
            <div className={styles.homeContainer}>
                <div className={styles.searchInputBox}>
                    <input type='text' placeholder='Search Item...'
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className={styles.filterMainContainer}>
                    <FilterBar price={price}
                        setPrice={setPrice}
                        setCategory={setCategory}
                    />
                    <MainContent search={search} 
                        price={price}
                        category={category}
                    />
                </div>
            </div>
            }
        </>
    )
}

export default Home;