import React, { Component } from 'react'
import apiURL from '../config/keys'
import axios from 'axios'
class SearchPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            otherPostData:'',
            data:[] 
        }
       
    }
    handleSubmit = (event) => {
       
        event.preventDefault();
        let currentComponent = this;
        if(this.state.otherPostData !== ''|| undefined || null){
            // console.log(apiURL.postURL);
            axios.get(apiURL.postURL + "getOtherPost" ,{
            params: {
                username: currentComponent.state.otherPostData,  
            }})
            .then(function (response) {
                // location.reload()
                // console.log(response)
                currentComponent.setState({
                    data:response.data,
                    otherPostData:''
                })
              
            })
            .catch(function (error) {
                console.log(error); 
            });
        }
        else{
            alert("No User with that Name")
        }

        }
        handleChange =(event) =>{
            const target = event.target.name;
            if(target === "otherPost" ){
                this.setState({otherPostData:event.target.value})
            } 
            
        }
    render() {
        const cond = this.state.data.length;
        let listItems ;
        if(cond > 0){
        listItems = (this.state.data.map((item) =>
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
        </div>)
          
            );
        }
        else{
          listItems =  <div></div>
        }
        return (
            <div className="container row">
                <div className="col ">
                    <form style={{marginTop:20}} action="" onSubmit={this.handleSubmit}>
                    <label>Enter Username to search for Post </label>
                    <input  type="input" value={this.state.otherPostData} onChange={this.handleChange} name="otherPost" id="otherPost"/>
                    <button type="submit">Search</button>
                
                    </form>
                    {listItems}
                </div>
        </div>
        )
    }
}

export default SearchPost
