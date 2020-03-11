import React, { useState } from 'react'
import axios from 'axios'
import authApi from './authApi/authApi'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom';
const SignIn = (props) => {
    const Auth = React.useContext(authApi)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [token, setToken] = useState(false);
    var inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
    // Similar to componentDidMount and componentDidUpdate:
  

      const handleSubmit = function (event){
        event.preventDefault();
        axios.post("http://localhost:5000/api/users/signin" , {
               
                username: username,
                password: password,
              
            })
            .then(function (response) {
                // console.log(response);
                if(response.data.login){
                Auth.setAuth(true)
                Cookies.set("user",response.data.token,{
                    expires:inThirtyMinutes
                })
            }else{
                alert("Wrong Try Again")
            }
            })
            .catch(function (error) {
                console.log(error);
                
            });
           
        
       
      
      }
    
      const handleChange = function (event){
          const target = event.target.name;
        if(target === "username" ){
                setUsername(event.target.value)
        }else{
                setPassword(event.target.value)
        }

       
       
      }

      const handleLink = () =>{
        props.history.push("/signup")
        }
        return (
            <div>
                <form action="" method="post" onSubmit={handleSubmit}>
                   
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"  value={username} onChange={handleChange} id="username"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"  value={password} onChange={handleChange} id="password"/>
                    <button type="submit" >Submit</button>
                </form>
                <button onClick={handleLink}>Sign Up</button>
            </div>
        )
    
}

export default withRouter(SignIn)
