import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
//import store from '../../js/store/index';
//import { connect } from "react-redux";
//import { updateRProfile } from "../../js/actions/index";

class Rupdateprofile extends Component {
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
                rimage : "",
                oimage : "",
                username : "",
                cuisine : "",
                options : ""

            }
        
            // store.subscribe(() => {
            //   // When state will be updated(in our case, when items will be fetched), 
            //   // we will update local component state and force component to rerender 
            //   // with new data.
            //   this.setState({
            //     email: store.getState().email
            //   });
            // });
          
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitProfile = this.submitProfile.bind(this);
    }  
    //get the books data from backend  
    componentDidMount(){
        // store.subscribe(() => {
        //     // When state will be updated(in our case, when items will be fetched), 
        //     // we will update local component state and force component to rerender 
        //     // with new data.
        //     console.log(cookie.load('cookie'));
        //     console.log(this.props.propData);
        //     this.setState({
        //       username: store.getState().username
        //     });
        //   });
        // console.log(this.props.propData);
        
//set the with credentials to true
axios.defaults.withCredentials = true;

//make a post request with the user data
axios.get('http://localhost:3001/getCuisine')
        .then((response) => {
            
        this.setState({
        options : response.data
        });
        
    });

        console.log(cookie.load("email"))
        const data = {
            email : cookie.load("email")
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        //make a post request with the user data
        axios.post('http://localhost:3001/rprofile',data)
                .then((response) => {
                this.setState({
                email: response.data.email,
                fullname: response.data.oname,
                contact: response.data.contact,
                address : response.data.address,
                city : response.data.city,
                cuisine : response.data.cuisine,
                zipcode : response.data.zipcode,
                restaurant : response.data.name
                });
                
            });
    }
    cuisineChangeHandler = (value) => {
        console.log(value.value);
        this.setState({
            cuisine : value.value
        })
        
    }


    onChangeHandler = (e) => {
        this.setState({
           [e.target.name] : e.target.value
        });
    }
    submitProfile = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            pemail :cookie.load("email"),
            email : this.state.email,
            fullname: this.state.fullname,
            contact: this.state.contact,
            address : this.state.address,
            city : this.state.city,
            zipcode : this.state.zipcode,
            restaurant : this.state.restaurant,
            rimage : this.state.rimage,
            oimage : this.state.oimage,
            cuisine : this.state.cuisine   
        }

       // this.props.updateRProfile(data);
       console.log("processing in reducer")
       //set the with credentials to true
       axios.defaults.withCredentials = true;
       //make a post request with the user data
       axios.post('http://localhost:3001/rprofileupdate',data)
       .then(response => {
       alert(response.data);
       console.log("Status Code : ",response.data);
       if(response.data.trim() == "Details Updated!"){
           console.log("Hello peps I'm in R profile updatereducer");
         }
           
   })
 
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
                    <form>
                        <table class="table">
                            <tbody>
                               
                                <tr>
                                    <td>Restaurant Name</td>
                                    <td><input value={this.state.restaurant} name="restaurant" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Owner Name</td>
                                    <td><input value={this.state.fullname} name="fullname" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Cuisine</td>
                            <td><Dropdown ref={ref => (this.cuisine = ref)}  options={this.state.options}  onChange={this.cuisineChangeHandler} name="cuisine" placeholder="Cuisine"  value={this.state.cuisine}  /></td>
                            </tr>
                                <tr>
                                    <td>Address</td>
                                    <td><input value={this.state.address} name="address" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td><input value={this.state.city} name="city" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Zipcode</td>
                                    <td><input value={this.state.zipcode} name="zipcode" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Contact </td>
                                    <td><input value={this.state.contact} name="contact" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Email </td>
                                    <td><input value={this.state.email} name="email" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Restaurant Image </td>
                                    <td><input value={this.state.rimage} name="rimage" type="file" accept="image/png, image/jpeg" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Owner Image </td>
                                    <td><input value={this.state.oimage} name= "oimage" type="file" accept="image/png, image/jpeg" onChange={this.onChangeHandler}></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" onClick={this.submitProfile} class="btn btn-primary2">Submit</button>
                        </form>
                </div> 
              
               
            </div> 
        )
    }
}
//export Home Component
export default Rupdateprofile;


// function mapStateToProps(state,propData) {
//     return {
//       propData: state.username
//     };
//   }

//   function mapDispatchToProps(dispatch) {
//     return {
//       updateRProfile: user => dispatch(updateRProfile(user))
//     };
//   }

//   const RUpdateProfile = connect(mapStateToProps, mapDispatchToProps)(Rupdateprofile);
//   export default RUpdateProfile;

  


