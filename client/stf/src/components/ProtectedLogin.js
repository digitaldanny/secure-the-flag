import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedLogin = ({ auth,component: Component, ...rest }) => {
    return(
    <Route {...rest} 
    render={() => !auth?(    
        <Component  />   
           
    ):(
        // not logged in so redirect to login page with the return url
        <Redirect to={{ pathname: '/dashboard' }} />
       
    )
    } />
    )
}
export default ProtectedLogin;
    
