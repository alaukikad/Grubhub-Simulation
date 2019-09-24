import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Rprofile extends Component {
    constructor(){
        super();
        this.state = {  
            email : "",
            fullname: "",
            contact: "",
            address : "",
            city : "",
            zipcode : "",
            restaurant : "" 
        }
    }  
    //get the books data from backend  
    componentDidMount(){

        const data = {
            email : cookie.load('email')
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        //make a post request with the user data
        axios.get('http://localhost:3001/rprofile',data)
                .then((response) => {
                    
                   
                this.setState({
                email : response.data.email,
                fullname: response.data.oname,
                contact: response.data.contact,
                address : response.data.address,
                city : response.data.city,
                zipcode : response.data.zipcode,
                restaurant : response.data.name
                });
                
            });
    }

    render(){
      
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
                   <h2>Hiii</h2>
                   
                   </div>
                </div>
                <div class="container split right div-right" style={{backgroundColor:"white", width:"60%",opacity:"80%"}}>
                    
                    <h2>Restaurant Profile</h2>
                        <table class="table">
                            <tbody>
                               
                                <tr>
                                    <td>Restaurant Name</td>
                                    <td>{this.state.restaurant}</td>
                                </tr>
                                <tr>
                                    <td>Owner Name</td>
                                    <td>{this.state.fullname}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{this.state.address}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{this.state.city}</td>
                                </tr>
                                <tr>
                                    <td>Zipcode</td>
                                    <td>{this.state.zipcode}</td>
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
                        <button link="" class="btn btn-primary">Update</button>
                </div> 
               
            </div> 
        )
    }
}
//export Home Component
export default Rprofile;