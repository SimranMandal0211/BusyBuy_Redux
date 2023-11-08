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


// Async thunk for getting list of all the users within the firebase database
export const getInitialUserList = createAsyncThunk(
    "auth/userList", (args, thunkAPI) => {
        // getting datta from firebase
        const unsub = onSnapshot(collection(db, "buybusy-redux"), (onSnapshot) => {
            const users = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            // storing the userList inside initialState variable
            thunkAPI.dispatch(setUserList(users));
        });
    }
);



// AsyncThunk for creating new user in datatbase
export const createUserThunk = createAsyncThunk(
    "auth/createUser",
    async (data, thunkAPI) => {
        // getting userList from initialState
        const { authReducer } = thunkAPI.getState();
        const { userList } = authReducer;

        // checking whether user's email already exist or not
        const index = userList.findIndex((user) => user.email === data.email);

        // if email address already exist or not
        if(index !== -1){
            toast.error('Email address already in use !!');
            return;
        }


        // if email not found create new user 
        const docRef =await addDoc(collection(db, "buybusy-redux"), {
            name:data.name,
            email:data.email,
            password:data.password,
            cart:[],
            orders:[]
        });
        // notification 
        toast.success("New user Created, Please LogIn to Continue !!");
    }
)


// AsyncThunk for signIn user
export const createSessionThunk = createAsyncThunk(
    " auth/createSession",
    async (data, thunkAPI) => {
        // getting userList from initialState
        const { authReducer } = thunkAPI.getState();
        const { userList } = authReducer;

        // finding user inside the userList
        const index = userList.findIndex((user) => user.email === data.email);

        if(index === -1){
            toast.error("Email does not exist, Try again or SignUp Insted!!!");
            return false;
        }

        // if email found in database then metch password
        if(userList[index].password === data.password){
            toast.success("Sign In Successfully!!!");

            // Logging in user and storing its data in local variable
            thunkAPI.dispatch(setLoggedIn(true));
            thunkAPI.dispatch(setUserLoggedIn(userList[index]));

            // generating user's login token and stire user's data
            window.localStorage.setItem("token", true);
            window.localStorage.setItem("index", JSON.stringify(userList[index]));
            return true;
        }
        else{
            // if password does'nt match in database
            toast.error("wrong UaseNAme/Password, Try Again");
            return false;
        }
    }
);

// AsyncThunk for SignOut
export const removeSessionThunk = createAsyncThunk(
    "auth/removeSession", () => {
        // removing user data and token from local storage
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("index");
    }
)


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
            state.isLoggedIn = action.payload;
        },
        // data of loggedIn user
        setUserLoggedIn: (state,action) => {
            state.userLoggedIn = action.payload;
        }
    },


    extraReducers: (builder) => {
        builder.addCase(removeSessionThunk.fulfilled, (state, action) => {
            state.isLoggedIn = false;
            state.userLoggedIn = null;
            toast.success("Sign Out Successfully!!!");
        })
    }
});


// exporting the reducer
export const authReducer = authSlice.reducer;

// exporting the reducer actions
export const { setLoggedIn, setUserLoggedIn, setUserList } = authSlice.actions;

// exporting the user's state to get data
export const authSelector = (state) => state.authReducer;

