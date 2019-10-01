import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
//import { connect } from "react-redux";
//import { registerUser } from "../../js/actions/index";


//Define a Login Component
class Cregister extends Component{
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
            username : "",
            authFlag : "" 
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.fullnameChangeHandler = this.fullnameChangeHandler.bind(this);
        this.contactChangeHandler = this.contactChangeHandler.bind(this);
        this.addressChangeHandler = this.addressChangeHandler.bind(this);


        this.submitForm = this.submitForm.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
  /*  componentWillMount(){
        this.setState({
            authFlag : false
        })
    }*/


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

    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    

    //submit Register handler to send a request to the node backend
      submitForm =(e) =>{
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password,
            fullname: this.state.fullname,
            contact: this.state.contact,
            address : this.state.address
        }
            if( this.email.value=="" ||this.fullname.value=="" ||this.contact.value=="" ||this.address.value==""||this.password.value==""  ){
            alert("Please fill all Fields!");
            }else{



            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/cregister',data)
            .then(response => {
            alert(response.data);
            console.log("Status Code blyi : ",response.status);
            if(response.data.trim() == "User Added Successfully!"){
            console.log("Hello New User!");
            this.setState({
              authFlag : true
            })
            }
        })
            // this.props.registerUser(data);

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
            }
  
        
    }

     
    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            console.log("HSHGSHH")
            redirectVar = <Redirect to= "/chome"/>
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                <div class="login-form">
                    <div class="main-div">
                    <form action="http://127.0.0.1:3000/cregister" method="post">
                        <div class="panel">
                            
                            <h2>Customer Registration</h2>
                            
                        </div>
                        
                            <div class="form-group">
                                <input ref={(ref)=> this.fullname=ref} onChange = {this.fullnameChangeHandler} type="text" class="form-control" name="fullname" placeholder="Full Name" required/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.email=ref} onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.contact=ref} onChange = {this.contactChangeHandler} type="text" class="form-control" name="contact" placeholder="Contact"/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.address=ref} onChange = {this.addressChangeHandler} type="text" class="form-control" name="address" placeholder="Address"/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.password=ref} onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitForm} class="btn btn-primary2" type="submit">Register</button>                 
                            <div style={{paddingTop:"10px"}}>
                            <a href="/login" >Already a member? Login</a>
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
//       registerUser: user => dispatch(registerUser(user))
//     };
//   }
//   function mapStateToProps(state,propData) {
//     return {
//       propData: state.username
//     };
//   }
//   const RegisterForm = connect(mapStateToProps, mapDispatchToProps)(Cregister);
//   export default RegisterForm;

export default Cregister;