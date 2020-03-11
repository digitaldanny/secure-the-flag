import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../config/keys'
import { withRouter } from 'react-router-dom';

const Register = (props) => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const  handleSubmit= (event)=>{
        event.preventDefault();
        if(confirmpassword !== password){
            alert("Passwords dont match")
            return;
        }
        if((confirmpassword || password || email || username) === '' ){
            alert("Fill in any empty fields")
            return;
        }
        axios.post(apiUrl.signupURL, {
            email: email,
            username: username,
            password: password,
            confirmpassword: confirmpassword
          })
          .then(function (response) {
            
            alert(response.data);
            // props.history.push("/")
            setconfirmPassword('')
            setPassword('')
            setEmail('')
            setUsername('')
          })
          .catch(function (error) {
             
            alert(error)
          });
       
      }
    const handleChange = (event) => {
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
