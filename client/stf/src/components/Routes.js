import React from 'react'
import Register from './Register'
import authApi from './authApi/authApi'
import ProtectedRoute from './ProtectedRoute'
import {
    BrowserRouter as Router,
    Route,
   Switch
  } from 'react-router-dom'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import ProtectedLogin from './ProtectedLogin'

const Routes = () => {
    const Auth = React.useContext(authApi)
    return (
        <div>
                
        <Router>
          <Switch>
            <ProtectedRoute auth={Auth.auth} exact path="/dashboard" component={Dashboard}/>
            
            <ProtectedLogin auth={Auth.auth} component={SignIn} exact path="/"/>
            
          
            <Route exact path="/signup">
              <Register/>
            </Route>
          </Switch>
        </Router>
       
        </div>
    )
}

export default Routes
