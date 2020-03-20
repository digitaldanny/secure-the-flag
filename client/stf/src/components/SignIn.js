import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../config/keys'
import authApi from './authApi/authApi'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom';

const SignIn = (props) => 
{
    const Auth = React.useContext(authApi)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [token, setToken] = useState(false);
    var inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
    // Similar to componentDidMount and componentDidUpdate:

    /*
     * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
     * SUMMARY: handleSubmit
     * This handler is triggered when the "Submit" button on the signin page is clicked.
     * On entry, the handler will perform the following actions:
     * 1. Send HTTP POST to server with XSS sanitized username/password for login.
     * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
    */
    const handleSubmit = function (event)
    {
        event.preventDefault();

        // print the XSS sanitized user input for debugging
        console.log("username: " + username);
        console.log("password: " + password);

        // POST username/password signin to server.
        axios.post(apiUrl.signinURL + "/signin" , {
           
            username: username,
            password: password,
          
        })
        .then(function (response) 
        {
            if(response.data.login)
            {
                Auth.setAuth(true)
                Cookies.set("user",response.data.token,{expires:inThirtyMinutes})
            }
            else
            {
                alert("Wrong Try Again")
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
    }
    
    /*
     * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
     * SUMMARY: handleChange
     * Change the text value of the SignIn event's (username/password) textboxes.
     * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
    */
    const handleChange = function (event)
    {
        const target = event.target.name;
        if(target === "username" )
        {
            setUsername(event.target.value)
        }
        else
        {
            setPassword(event.target.value)
        }
    }

    /*
     * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
     * SUMMARY: handleLink
     * Switch to SignUp page.
     * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
    */
    const handleLink = () => 
    {
        props.history.push("/signup")
    }

    // HTML page to load on render
    return (
        <div className="row">
            <div className="col s6 m6 lg6">
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username"  value={username} onChange={handleChange} id="username"/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password"  value={password} onChange={handleChange} id="password"/>
                <button type="submit" >Submit</button>
            </form>
            <button onClick={handleLink}>Sign Up</button>
        </div>
        </div>
    )
}

export default withRouter(SignIn)
