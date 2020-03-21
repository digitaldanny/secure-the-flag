import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../config/keys'
import { withRouter } from 'react-router-dom';

const Register = (props) => 
{
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    /*
     * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
     * SUMMARY: handleSubmit
     * This handler is triggered when the "Submit" button on the signin page is clicked.
     * On entry, the handler will perform the following actions:
     * 1. Send HTTP POST to server with XSS sanitized username/password for login.
     * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
    */
    const  handleSubmit = (event) =>
    {
        event.preventDefault();

        // print the XSS sanitized user input for debugging
        console.log("email: " + email);
        console.log("username: " + username);
        console.log("password: " + password);
        console.log("confirm: " + confirmpassword);

        if(confirmpassword !== password)
        {
            alert("Passwords dont match")
            return;
        }

        if((confirmpassword || password || email || username) === '' )
        {
            alert("Fill in any empty fields")
            return;
        }
      
        // console.log(apiUrl.signupURL + "/signup");
        axios.post(apiUrl.signupURL +"/signup", {
            email: email,
            username: username,
            password: password,
            confirmpassword: confirmpassword
        })
        .then(function (response) 
        {
            alert(response.data);
            // props.history.push("/")
            //setconfirmPassword('')
            //setPassword('')
            //setEmail('')
            //setUsername('')
        })
        .catch(function (error) 
        {
            alert(error)
        });
    }

    /*
     * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
     * SUMMARY: handleChange
     * Change the text value of the SignIn event's (username/password/email) textboxes.
     * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
    */
    const handleChange = (event) => 
    {
          const target = event.target.name;
        if(target === "username" ){
            setUsername(event.target.value)
        }
        else if(target === "email") {
            setEmail(event.target.value)
        }
        else if(target === "password"){
            setPassword(event.target.value)
        }else{
            setconfirmPassword(event.target.value)
        }
    }

    /*
     * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
     * SUMMARY: handleLink
     * Switch to SignIn page.
     * +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
    */
    const handleLink = () =>{
        props.history.push("/")
    }
    
    return (   
        <div className=" container row">
            <div className="col s6 m6 lg6">
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="Email">Email</label>
                <input type="email" name="email"  value={email} onChange={handleChange} id="email"/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username"  value={username} onChange={handleChange} id="username"/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password"  value={password} onChange={handleChange} id="password"/>
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input type="password" name="confirmpassword"  value={confirmpassword} onChange={handleChange} id="confirmpassword"/>
                <button type="submit" >Submit</button>
            </form>
            <button onClick={handleLink}>Sign In</button>
        </div>
        </div>
    )
}

export default withRouter(Register);
