import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import {getUserData} from '../../js/actions/index';
// import hostAddress from '../constants';
// import axios from 'axios';

class Cprofile extends Component {
    constructor(props){
            super(props);
            this.state = {  
                email : "",
                fullname: "",
                contact: "",
                address : "",
                oimage : ""
            }

    }  
    //get the books data from backend  
    componentDidMount(){


        // store.subscribe(() => {
        //     // When state will be updated(in our case, when items will be fetched), 
        //     // we will update local component state and force component to rerender 
        //     // with new data.
        //     this.setState({
        //       email: store.getState().username
        //     });
        //   });
        // console.log(this.props.propData);
        console.log(cookie.load("email"));
        console.log("Blehhh");
        const data = {
            email : cookie.load("email")
        }

        console.log(data);
        this.props.getUserData(data);
        // console.log(config);
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;

        // //make a post request with the user data
        // axios.post('http://'+hostAddress+':3001/cprofile/cprofile',data,config)
        //         .then((response) => {
                    
                   
        //         this.setState({
        //         email : response.data.email,
        //         fullname: response.data.name,
        //         contact: response.data.contact,
        //         address : response.data.address,
        //         oimage : "http://"+hostAddress+":3001/images/all/" + response.data.image+ "" 
        //         });
                
        //     });
    }
    

    render(){
      
       // let redirectProf = <Li to= "/rupdateprofile"/>;
        

        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        if(cookie.load('cookie')=="restaurant"){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container split left div-left" style={{width:"30%"}}>
                 
                           
                   <img
                src={this.props.oimage}
                id="dp"
                style={{border:"10px solid black" ,marginBottom:"10%",borderColor: "white" ,WebkitBorderRadius: "25%" , height : "200px", width : "200px"}}
                alt="User Display"
              />
              </div>
             
                 
                <div class="container split right div-right" style={{backgroundColor:"white", width:"60%",opacity:"80%"}}>
                    
                    <h2>Customer Profile</h2>
                        <table class="table">
                            <tbody>
                               
                                <tr>
                                    <td>Full Name</td>
                                    <td>{this.props.fullname}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{this.props.address}</td>
                                </tr>
                            
                                <tr>
                                    <td>Contact </td>
                                    <td>{this.props.contact}</td>
                                </tr>
                                <tr>
                                    <td>Email </td>
                                    <td>{this.props.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <a class="btn btn-primary2" href="/cupdateprofile">Update</a>
                </div> 
               
            </div> 
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      getUserData: user => dispatch(getUserData(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      email : store.email,
      fullname: store.fullname,
      contact: store.contact,
      address : store.address,
      oimage : store.oimage
    };
  }

  const CProfile = connect(mapStateToProps, mapDispatchToProps)(Cprofile);

export default CProfile;