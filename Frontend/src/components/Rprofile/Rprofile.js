import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {getRestaurantData} from '../../js/actions/index';
import { connect } from "react-redux";
//import hostAddress from '../constants';
//import axios from 'axios'

class Rprofile extends Component {
    constructor(props){
            super(props);
            this.state = {  
                email : "",
                fullname: "",
                contact: "",
                address : "",
                city : "",
                zipcode : "",
                restaurant : "",
                cuisine : "" ,
                rimage : "",
                oimage :""
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
        
        this.props.getRestaurantData(data);

        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // let config = {
        //     headers:{
        //         'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        //         'Content-Type': 'application/json'
        //       }
        //   }
        // //make a post request with the user data
        // axios.post('http://'+hostAddress+':3001/rprofile/rprofile',data,config)
        //         .then((response) => {
                    
                   
        //         this.setState({
        //         cuisine : response.data.cuisine,
        //         email : response.data.email,
        //         fullname: response.data.oname,
        //         contact: response.data.contact,
        //         address : response.data.address,
        //         city : response.data.city,
        //         zipcode : response.data.zipcode,
        //         restaurant : response.data.name,
        //         oimage : "http://"+hostAddress+":3001/images/all/" + response.data.oimage+ "",
        //         rimage : "http://"+hostAddress+":3001/images/all/" + response.data.rimage+ ""
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
        if(cookie.load('cookie')=="customer"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        return(
            <div>
                {redirectVar}
                

                <div class="container split left div-left" style={{ width:"30%"}}>
                {/* <div class="container" style={{backgroundColor:"white", borderRadius:"12px",height : "300px", width : "220px"}}> */}
                <img
                src={this.props.rimage}
                id="dp"
                style={{border:"10px solid black" ,marginBottom:"10%",borderColor: "white" ,WebkitBorderRadius: "25%" , height : "200px", width : "200px"}}
                alt="User Display"
                 />
                <img
                src={this.props.oimage}
                id="dp"
                style={{border:"10px solid black" ,marginBottom:"10%",borderColor: "white" ,WebkitBorderRadius: "25%" , height : "200px", width : "200px"}}
                alt="User Display"
                />
                </div>
            
            {/* </div> */}
              
                <div class="container split right div-right" style={{backgroundColor:"white", width:"60%",opacity:"80%"}}>
                
                    <h2>Restaurant Profile</h2>
                        <table class="table">
                            <tbody>
                               
                                <tr>
                                    <td>Restaurant Name</td>
                                    <td>{this.props.restaurant}</td>
                                </tr>
                                <tr>
                                    <td>Owner Name</td>
                                    <td>{this.props.fullname}</td>
                                </tr>
                                <tr>
                                    <td>Cuisine</td>
                                    <td>{this.props.cuisine}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{this.props.address}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{this.props.city}</td>
                                </tr>
                                <tr>
                                    <td>Zipcode</td>
                                    <td>{this.props.zipcode}</td>
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
                        <a class="btn btn-primary2" href="/rupdateprofile">Update</a>
                </div> 
               
            </div> 
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      getRestaurantData: user => dispatch(getRestaurantData(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      cuisine : store.cuisine,
      email : store.email,
      fullname: store.fullname,
      contact: store.contact,
      address : store.address,
      city : store.city,
      zipcode : store.zipcode,
      restaurant : store.restaurant,
      oimage : store.oimage,
      rimage : store.rimage
    };
  }

  const RProfile = connect(mapStateToProps, mapDispatchToProps)(Rprofile);
  export default RProfile;
// //export Home Component
// export default Rprofile;