import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
import Tasks from '../Tasks';
import Login from '../Login';
import { useAuthValue } from '../../context';
import { Redirect } from 'react-router-dom';
import {firebase} from '../../firebase';

function Content() {
   const {auth, authenticate} = useAuthValue();
   useEffect(()=>{
    authenticate();
   });
   
    
    return (
       
            auth ? (
            <section className="content">
            <Sidebar />
            <Tasks />
            </section>
           
            ) : <Redirect to={{
                pathname: "/login"}}/>
    )
}

export default Content
