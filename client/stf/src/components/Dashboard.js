import apiURL from '../config/keys'
import Cookies from 'js-cookie'
import axios from 'axios'
import Navbar from './Navbar'
import React, { Component } from 'react'
import SearchPost from './SearchPost'


export class Dashboard extends Component {
        constructor(props){
            super(props)
            this.state = {
                postData:'',
                data:[] 
            }
           
        }
        componentDidMount(){
            let currentComponent = this;
            axios.get(apiURL.postURL + "getPosts" , {
                params:{
                    username: Cookies.get('user')   
                }
                })
                .then(function (response) {
                    currentComponent.setState({data:response.data})
                })
                .catch(function (error) {
                    console.log(error); 
                });
     
        }
        handleSubmit = (event) => {
            // console.log(postData)
            // event.preventDefault();
            if(this.state.postData !== ''|| undefined || null){
                axios.post(apiURL.postURL + "addPost" , {
                    username: Cookies.get('user'),
                    post: this.state.postData    
                })
                .then(function (response) {
                    // location.reload()
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

        handleChange =(event) =>{
            const target = event.target.name;
            if(target === "post" ){
                this.setState({postData:event.target.value})
            } 
        }
        

    render() {
        const listItems = this.state.data.map((item) =>
        <div key={item.user_id} className="col s6 m6">
    
            <div className="card horizontal">
            <div className="card-stacked">
            <div className="card-header">
            <h6 style={{paddingLeft:10}} className="header">{item.user_id}</h6>
                </div>
                <div className="card-content">
                {item.post}
                </div>
               
            </div>
            </div>
        </div>
          
            );
        return (
            <div className="container row">
                 <h1>Dashboard</h1>
            <Navbar></Navbar>
            <div className="col s6 m6 lg6">
            <SearchPost/>
            </div>
            <div className="col s6 m6 lg6">
           
            {/* <h1 onClick={showPost}>Hit Me</h1> */}
            <form style={{marginTop:20}} action="" onSubmit={this.handleSubmit}>
            <textarea  type="textarea" value={this.state.postData} onChange={this.handleChange} name="post" id="post"/>
            <button type="submit">Post</button>
           
            </form>
            {listItems}
             </div>
            </div>
        )
    }
}

export default Dashboard
