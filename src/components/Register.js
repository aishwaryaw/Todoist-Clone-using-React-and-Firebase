import React, { useState } from 'react'
import { firebase } from '../firebase';
import { useAuthValue } from '../context';
import { Redirect } from 'react-router-dom';

function Register() {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {auth, authenticate} = useAuthValue();
    const [error, setError] = useState('');
    
    const registerUser = ()=>{
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
            authenticate();
            setError('');
           
        }).catch(error=>{
            console.log(error.message);
            setError(error.message);    
        }
            );
    }
    return (
        auth ? <Redirect to={{
            pathname: "/" }} />: (
            <div className="login">
            <input 
            aria-label="email for register"
            data-testid="email-register"
            placeholder="Enter your email"
            type="text" value={email} onChange={(e)=> setEmail(e.target.value)} />

            <input
            aria-label="password for register"
            data-testid="password-register"
            placeholder="Enter your password"
            type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type="button" aria-label="register" data-testid="register" 
            onKeyDown = {(e)=>{
                if(e.key == 'Enter'){
                    registerUser();
                }
            }}
            onClick={registerUser} >Register</button> 
            <p>{ error }</p>
            </div>
            )
       
    )
}



export default Register
