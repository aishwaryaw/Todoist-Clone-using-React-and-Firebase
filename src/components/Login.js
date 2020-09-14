import React, { useState } from 'react'
import { firebase } from '../firebase';
import { useAuthValue } from '../context';
import { Redirect } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {auth, authenticate}= useAuthValue();
 
    const loginUser = (e)=>{
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
            authenticate();
            setError('');
           
        }).catch((error)=>{
            setError(error.message);
            console.log(error.message);
        });
    }
    return (
        auth ? <Redirect to={{
            pathname: "/" }} />: (
        <form onSubmit={loginUser}>
        <div className="login">
        <input type="text" 
        aria-label="email for login"
        data-testid="email-login"
        placeholder="Enter your email"
        value={email} onChange={(e)=> setEmail(e.target.value)} />

        <input
        aria-label="password for login"
        data-testid="password-login"
        placeholder="Enter your password"
         type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit" aria-label="login button" data-testid="login">Login</button>

        <p>{error}</p>
        </div>
      </form>
        )
   
    )
}

export default Login
