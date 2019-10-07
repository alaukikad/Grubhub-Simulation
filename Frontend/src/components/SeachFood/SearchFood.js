import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ViewFood from '../ViewFood/ViewFood';


//Define a Login Component
class SearchFood extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            searchFood : "",
            criteria: "",
            options:["cuisine","zipcode","restaurant","foodItem"],
            restaurants : []
        }
        //Bind the handlers to this class
        
      
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.searchForm = this.searchForm.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
   componentWillMount(){
   this.setState({
       restaurants :[]
   })

    }
    criteriaChangeHandler = (value) => {
        console.log(value.value);
        this.setState({
            criteria : value.value
        })
        
    }

    
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }



    //submit Register handler to send a request to the node backend
    searchForm= (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
        criteria : this.state.criteria,
        searchFood : this.state.searchFood
        }

if(this.searchFood.value=="" ){
alert("Please fill Section Name Field!");
}else{
   
     //set the with credentials to true
     axios.defaults.withCredentials = true;
     //make a post request with the user data
 
     axios.post('http://54.196.229.70:3001/searchfood/searchfood',data)
     .then(response => {
         this.setState({
            restaurants : response.data
         })
         if(response.data==""){
             alert("Nothing to Show!:(")
         }
         console.log("Status Code : ",response.status);
         if(response.data!= null){
           console.log("Hello Search Food Section");
            this.setState({
            })
        }         
     })
    }
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(cookie.load('cookie')=="restaurant"){
            redirectVar = <Redirect to= "/login"/>
        }

        return(
            <div>
                {redirectVar}
                
            <div>
               <div style={{marginTop: "14%", marginLeft: "15%", marginRight:"5%"}}>
               <h1 style={{color:"white", marginLeft:"25%"}}>Let's get Started!</h1>
                    <form style={{display:"inline-flex", width : "100%"}}>
                        <div class="form-group" style={{width :"60%", paddingBottom : "15px"}}>
                                <input ref={(ref)=> this.searchFood=ref} style={{ padding:"1.7% " ,width: " 100%", borderRadius : "6px", height : "100%"}} onChange = {this.onChangeHandler} type="text"  name="searchFood" placeholder="Search For..." required/>
                            </div>
                            <div class="form-group" style={{marginLeft:"10px", height :"10px"}}>
                            <Dropdown ref={ref => (this.criteria = ref)}  options={this.state.options}  onChange={this.criteriaChangeHandler} name="criteria" placeholder="Criteria"  value={this.state.criteria}  />
                            </div>
                            <button style={{marginLeft : "10px" , borderRadius:"4px",  color:"white", height : "38px",width:"10%",borderColor: "red", backgroundColor:"red"}} onClick = {this.searchForm} class="glyphicon glyphicon-search" type="submit"></button>                 

                            </form>
                    </div>
                   
                    </div>


                    <div style={{marginTop:"10%", height:"100%",width:"100%",background:"white", borderRadius:"12px"}}>
               <ViewFood key='viewfood' restaurants={this.state.restaurants}></ViewFood>
            </div>
            </div>
            

        )
    }
}


export default SearchFood;