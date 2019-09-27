import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import store from '../../js/store/index';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

class Cprofile extends Component {
    constructor(props){
            super(props);
            this.state = {  
                email : "",
                fullname: "",
                contact: "",
                address : ""
                
            }

    }  
    //get the books data from backend  
    componentDidMount(){


        store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.
            this.setState({
              email: store.getState().username
            });
          });
        console.log(this.props.propData);
        console.log(cookie.load("email"));
        console.log("Blehhh");
        const data = {
            email : cookie.load("email")
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        //make a post request with the user data
        axios.post('http://localhost:3001/cprofile',data)
                .then((response) => {
                    
                   
                this.setState({
                email : response.data.email,
                fullname: response.data.name,
                contact: response.data.contact,
                address : response.data.address
                
                });
                
            });
    }
    

    render(){
      
       // let redirectProf = <Li to= "/rupdateprofile"/>;
        

        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/rlogin"/>
        }

        return(
            <div>
                {redirectVar}
                <div class="container split left div-left" style={{backgroundColor:"white", width:"25%"}}>
                   
                   <div>
                   <h2></h2>
                   
                   </div>
                </div>
                <div class="container split right div-right" style={{backgroundColor:"white", width:"60%",opacity:"80%"}}>
                    
                    <h2>Customer Profile</h2>
                        <table class="table">
                            <tbody>
                               
                                <tr>
                                    <td>Full Name</td>
                                    <td>{this.state.fullname}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{this.state.address}</td>
                                </tr>
                            
                                <tr>
                                    <td>Contact </td>
                                    <td>{this.state.contact}</td>
                                </tr>
                                <tr>
                                    <td>Email </td>
                                    <td>{this.state.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <a class="btn btn-primary" href="/cupdateprofile">Update</a>
                </div> 
               
            </div> 
        )
    }
}


  function mapStateToProps(state,propData) {
    return {
      propData: state.username
    };
  }

  const CProfile = connect(mapStateToProps, null)(Cprofile);
  export default CProfile;
//export Home Component
//export default Rprofile;