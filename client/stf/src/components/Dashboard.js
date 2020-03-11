import React, { useState, useEffect } from 'react'

import apiURL from '../config/keys'
import Cookies from 'js-cookie'
import axios from 'axios'
import Navbar from './Navbar'
function Dashboard() {
 
   
    const [postData, setPostData] = useState('');
    const [data, setData] = useState([]);
        // useEffect(() => {
        //     axios.get(apiURL.postURL + "getPosts" , {
        //     params:{
        //         username: Cookies.get('user')   
        //     }
        //     })
        //     .then(function (response) {
                
        //         setData([...data,response.data])
        //     })
        //     .catch(function (error) {
        //         console.log(error); 
        //     });
        // },[data]);

      const handleSubmit = function (event){
        // console.log(postData)
        event.preventDefault();
        if(postData !== ''|| undefined || null){
        axios.post(apiURL.postURL + "addPost" , {
                username: Cookies.get('user'),
                post: postData    
            })
            .then(function (response) {
                // console.log(postData)
                alert(response.data)
            })
            .catch(function (error) {
                console.log(error); 
            });
      }
    else{
        alert("Enter Post First")
    }

    }
    
      const handleChange = function (event){
        const target = event.target.name;
        if(target === "post" ){
                setPostData(event.target.value)
        } 
      }
      const showPost =(event) => {
          return (
              <div>
                    {data.map(item => {
                        return <div key={item[0].user_id}><li >{console.log(item[0])}</li></div>
                    })}
              </div>
          )
      }

    return (
        <div>
            <h1>Dashboard</h1>
            <Navbar></Navbar>
            <h1 onClick={showPost}>Hit Me</h1>
            <form action="" onSubmit={handleSubmit}>
            <textarea type="textarea" value={postData} onChange={handleChange} name="post" id="post"/>
            <button type="submit">Post</button>
           
            </form>
         {/* {showPost} */}
            {/* <div>{data}</div> */}
            {/* {console.log(data[0][0])} */}
           
        </div>
    )
}

export default Dashboard
