import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Error(){
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    });

    return(
        <div style={
            {
             display: 'flex',
             width: '100vw',
             height: '100vh',
             justifyContent: 'center',
             alignItems: 'center',
             flexDirection: 'column',
             border:'2px solid green',
            }
        }>
            <h1>Error, Something went wrong !!!</h1>
            <p>Redirecting back to Home Page...</p>
        </div>
    )
}