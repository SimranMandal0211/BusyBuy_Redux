import {useRef} from 'react';
// css style
import '../styles/signInUp.css';

// navigation router
import { useNavigate } from "react-router-dom";

// redux tool for calling actions
import { useDispatch } from "react-redux";

// Auth Reducer actions for creating a new user 
import { createUserThunk } from "../Redux/Reducers/authReducer";

function Signup(){
    // for calling actions
    const dispatch = useDispatch();

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    // navigation variable
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();

        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password:passwordRef.current.value
        }

        console.log('signUp done');
        // creating user
        dispatch(createUserThunk(data));
        // if user created redirect to corresponding page
        navigate("/signin");
    }

    return(
        <div className='sign-container'>
            <div className='sign-form-container'>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input type='text'
                        required
                        placeholder='Enter Name'
                        ref={nameRef} 
                        className='input-field'
                    />
                    <br />
                    <input type='email'
                        required
                        placeholder='Enter Email'
                        ref={emailRef} 
                        className='input-field'
                    />
                    <br />
                    <input type='password'
                        required
                        placeholder='Enter Password'
                        ref={passwordRef} 
                        className='input-field'
                    />
                    <br />
                    <button className='input-field'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;