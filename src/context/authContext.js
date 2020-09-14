import React, { createContext, useState, useContext } from 'react'

import { firebase} from '../firebase';

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [auth, setAuth ]= useState(null);
    const [email , setEmail] = useState('');
    const authenticate = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        console.log(user);
        if (user != null) {
          setAuth(user.uid);
          setEmail(user.email);
        } else {
          setAuth(null);
        }
      });
    }

    return (
        <AuthContext.Provider value = {{ auth, authenticate, email}} >
            {children}
        </AuthContext.Provider>
    );
    
};

const useAuthValue =() => useContext(AuthContext);

export{
    AuthContext,
    AuthProvider,
    useAuthValue
} 
