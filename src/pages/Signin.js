import {useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/signInUp.css';



// redux tool for calling acitons
import { useDispatch } from "react-redux";

// reducer actions Auth Reducer
import { createSessionThunk } from "../Redux/Reducers/authReducer";

function Signin(){
    // for calling actions
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordref = useRef();

    async function handleSubmit(e){
        e.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passwordref.current.value
        }
        console.log('input signIn ');
        // sign in user
        const status=dispatch(createSessionThunk(data));
        status ? navigate('/') : navigate('/signin'); 
    }

    return(
        <div className='sign-container'>
            <div className='sign-form-container'>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email"
                        required
                        placeholder="Enter Email"
                        ref={emailRef}
                        className='input-field'
                    />
                    <br />
                    <input type="password"
                        required
                        placeholder="Enter Password"
                        ref={passwordref}
                        className='input-field'
                    />
                    <br />
                    <button className='input-field'>Submit</button>
                </form>
                <br />
                <Link to='/signup'><span>or Create New Account</span></Link>
            </div>
        </div>
    );
}

export default Signin;