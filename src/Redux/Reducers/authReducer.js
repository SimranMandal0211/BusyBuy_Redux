// for creating slice and Async Thunk
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// firebase database
import {db} from '../../firebaseInit';
import { collection, addDoc, onSnapshot } from "firebase/firestore";

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// initial State to store data 
// for list of all the users, if a user is  logged, data of loggedIn user
const initialState={ userList: [], isLoggedIn: false, userLoggedIn: null };

const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        // to set userList
        setUserList: (state, action) => {
            state.userList = action.payload;
        },
        // whether user isLoggedIn or not
        setLoggedIn: (state, action) => {
            state.isLoggedI = action.payload;
        },
        // data of loggedIn user
        setUserLoggedIn: (state,action) => {
            state.userLoggedIn = action.payload;
        }
    },
});


// exporting the reducer
export const authReducer = authSlice.reducer;

// exporting the reducer actions
export const { setLoggedIn, setUserLoggedIn, setUserList } = authSlice.actions;

// exporting the user's state to get data
export const authSelector = (state) => state.authReducer;

