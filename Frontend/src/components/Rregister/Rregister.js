import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
//import { connect } from "react-redux";
//import { registerRestaurant } from "../../js/actions/index";
//import store from '../../js/store/index';
import hostAddress from '../constants';

//Define a Login Component
class Rregister extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            fullname: "",
            contact: "",
            address : "",
            city : "",
            zipcode : "",
            restaurant : "",
            username : "",
            authFlag : false,
            cuisine :"",
            options : []
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.fullnameChangeHandler = this.fullnameChangeHandler.bind(this);
        this.contactChangeHandler = this.contactChangeHandler.bind(this);
        this.addressChangeHandler = this.addressChangeHandler.bind(this);
        this.restaurantChangeHandler = this.restaurantChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.cuisineChangeHandler= this.cuisineChangeHandler.bind(this);
        this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
   componentWillMount(){
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

     //set the with credentials to true
     axios.defaults.withCredentials = true;

     //make a post request with the user data
     axios.get('http://'+hostAddress+':3001/getCuisine/getCuisine')
             .then((response) => {
                 
             this.setState({
             options : response.data
             });
             
         });

    }


    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    addressChangeHandler = (e) => {
        this.setState({
            address : e.target.value
        })
    }

    contactChangeHandler = (e) => {
        this.setState({
            contact : e.target.value
        })
    }

    fullnameChangeHandler = (e) => {
        this.setState({
            fullname : e.target.value
        })
    }

    fullnameChangeHandler = (e) => {
        this.setState({
            fullname : e.target.value
        })
    }

    zipcodeChangeHandler = (e) => {
        this.setState({
            zipcode : e.target.value
        })
    }

    cityChangeHandler = (e) => {
        this.setState({
            city : e.target.value
        })
    }

    restaurantChangeHandler = (e) => {
        this.setState({
            restaurant : e.target.value
        })
    }

    cuisineChangeHandler = (value) => {
        console.log(value.value);
        this.setState({
            cuisine : value.value
        })
        
    }



    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }


    //submit Register handler to send a request to the node backend
    submitForm= (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password,
            fullname: this.state.fullname,
            contact: this.state.contact,
            address : this.state.address,
            city : this.state.city,
            zipcode : this.state.zipcode,
            restaurant : this.state.restaurant,
            cuisine : this.state.cuisine
        }

if(this.restaurant.value=="" || this.email.value=="" ||this.fullname.value=="" ||this.contact.value=="" ||this.address.value==""||this.city.value=="" ||this.password.value=="" ||this.zipcode.value==""  ){
alert("Please fill all Fields!");
}else{
    // this.props.registerRestaurant(data);
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


     //set the with credentials to true
     axios.defaults.withCredentials = true;
     //make a post request with the user data
 
     axios.post('http://'+hostAddress+':3001/rregister/rregister',data)
     .then(response => {
         alert(response.data);
         console.log("Status Code : ",response.status);
         if(response.data.trim() == "Restaurant Added Successfully!"){
           console.log("Hello New Restaurant");
            this.setState({
                authFlag: true
            })
         }
     })
        }
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/rhome"/>
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                <div class="login-form">
                    <div class="main-div">
                    <form>
                        <div class="panel">
                            
                            <h2>Restaurant Registration</h2>
                            
                        </div>
                        <div class="form-group">
                                <input ref={(ref)=> this.restaurant=ref} onChange = {this.restaurantChangeHandler} type="text" class="form-control" name="restaurant" placeholder="Restaurant Name" required/>
                            </div>
                            
                            <div class="form-group">
                                <input ref={(ref)=> this.fullname=ref} onChange = {this.fullnameChangeHandler} type="text" class="form-control" name="fullname" placeholder="Owner's Full Name" required/>
                            </div>
                            <div class="form-group">
                            <Dropdown ref={ref => (this.cuisine = ref)}  options={this.state.options}  onChange={this.cuisineChangeHandler} name="cuisine" placeholder="Cuisine"  value={this.state.cuisine}  />
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.email=ref} onChange = {this.emailChangeHandler} type="email" class="form-control" name="email" placeholder="Email" required/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.contact=ref} onChange = {this.contactChangeHandler} type="number" class="form-control" name="contact" placeholder="Contact" required/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.address=ref} onChange = {this.addressChangeHandler} type="text" class="form-control" name="address" placeholder="Address" required/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.city=ref} onChange = {this.cityChangeHandler} type="text" class="form-control" name="city" placeholder="City" required/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.zipcode=ref} onChange = {this.zipcodeChangeHandler} type="number" class="form-control" name="zipcode" placeholder="Zipcode" required/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.password=ref} onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" required/>
                            </div>
                            <button onClick = {this.submitForm} class="btn btn-primary" type="submit">Register</button>                 
                            <div style={{paddingTop:"10px"}}>
                            <a href="/rlogin" >Restaurant already registered? Login</a>
                            </div>
                            </form>
                    </div>
                   
                </div>
            </div>
            </div>
        )
    }
}


// function mapDispatchToProps(dispatch) {
//     return {
//       registerRestaurant: user => dispatch(registerRestaurant(user))
//     };
//   }
//   function mapStateToProps(state,propData) {
//     return {
//       propData: state.username
//     };
//   }

//   const RegisterRest = connect(mapStateToProps, mapDispatchToProps)(Rregister);
//   export default RegisterRest;

export default Rregister;