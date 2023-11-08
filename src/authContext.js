import { useState , useEffect, createContext, useContext, } from "react";

// firebase database
import {db} from './firebaseInit';
import { collection, addDoc, onSnapshot } from "firebase/firestore";

// toast notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// 1. create context
const authContext = createContext();

function useAuthValue(){
    const value = useContext(authContext);
    return value;
}

// 2. customProvider
function CustomAuthContext({children}){
    // List of all users in database
    const [userList, setUserList] = useState([]);
    // login user status
    const [isLoggedIn, setLoggedIn] = useState(false);
    // user who is logged in
    const [userLoggedIn, setUserLoggedIn] = useState(null);

    // getting all the users from database 
    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'buybusy'), (snapShot) => {
            const users = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            setUserList(users);
        });

        console.log('fetching data from db Unsub:: ',unsub);
    }, [isLoggedIn]);


    // creating new user
    async function createUser(data){
        // checking whether the email address aleady in use or not
        const index = userList.findIndex((user) => user.email === data.email);

        // if found email display notification
        if(index !== -1){
            toast.error("Email Address already exist, Try Again or SignIn Instead!!!");
            return;
        }

        // if email not found create new user
        const docRef = await addDoc(collection(db, 'buybusy'), {
            name: data.name,
            email: data.email,
            password: data.password,
            cart: [],
            orders: [],
            total:0,
        });
        console.log('docRef',docRef);
        toast.success("New user Created, Please LogIn to Continue !!");
    }

    // signin user
    async function signIn(data){
        // finding user in database
        const index = userList.findIndex((user) => user.email === data.email);

        // if user not found show notification
        if(index === -1){
            toast.error("Email does not exist, Try again or SignUp Instead!!!");
            return false;
        }

        if(userList[index].password === data.password){
            toast.success("Sign In Successfully!!!");
            setLoggedIn(true);
            setUserLoggedIn(userList[index]);

            // generating user's login token and store user's data
            window.localStorage.setItem('token', true);
            window.localStorage.setItem('index', JSON.stringify(userList[index]));

            return true;
        }else{
            toast.error("Wrong UserName/Password, Try Again");
            return false;
        }
    }

    // signout 
    function signOut(){
        // removing user's data and token local storage
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('index');

        // set logging status false
        setLoggedIn(false);
        setUserLoggedIn(null);
        toast.success("Sign Out Successfully!!!!");
    }


    return(
        <authContext.Provider value={ 
            {createUser,
             signIn,
             signOut,

             isLoggedIn,
             setLoggedIn,
             userLoggedIn,
             setUserLoggedIn
            }
        }>
            <ToastContainer />
            {children}
        </authContext.Provider>
    );
}


export {authContext, useAuthValue};
export default CustomAuthContext;