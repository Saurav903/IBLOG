import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    let token = localStorage.getItem("token");
    if(token){
        return children;
    }else {
        alert("login first");
        return <Navigate to="/login"/>
    }

}

export default PrivateRoute