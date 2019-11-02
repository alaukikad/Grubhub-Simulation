import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import { checkUser } from "../../js/actions";

//import axios from 'axios';
//import hostAddress from '../constants';

let redirectVar = null;

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        this.props.checkUser(data);
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
if(this.props.msg!=null){
    alert(this.props.msg);

if(this.props.msg=="Login Successful"){
    cookie.save("cookie","customer",{maxAge: 900000, httpOnly: false, path : '/'});
    cookie.save("user",this.props.user,{maxAge: 900000, httpOnly: false, path : '/'});
    cookie.save("email",this.state.username,{maxAge: 900000, httpOnly: false, path : '/'});
    this.setState({       
    });
}
}

//set the with credentials to true
// axios.defaults.withCredentials = true;
// //make a post request with the user data
// axios.post('http://'+hostAddress+':3001/login/login',data)
//     .then(response => {
//      alert(response.data.msg);
//         console.log("Status Code : ",response.data);
//          if(response.data.msg.trim() == "Login Successful"){
//             console.log("Hello peps");
//             console.log(cookie.load('cookie'));
//             localStorage.setItem("jwtToken",response.data.token)
//             this.setState({
//             authFlag : true
//             })
//         }
//     })
//     .catch(
//         console.log("error")
    
//     )
       
    }

    render(){
        //redirect based on successful login
        let redirectVar=null;
        if(cookie.load('cookie')){
            console.log('haha');
            redirectVar = <Redirect to= "/chome"/>
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Customer Login</h2>
                            <p>Please enter your email and password</p>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>                 
                            <div style={{paddingTop:"10px"}}>
                            <a href="/cregister" >Create a new Profile!</a>
                            </div>
                    </div>
                   
                </div>
            </div>
            </div>
        )
    }
}
//export Login Component
//export default Login;

function mapDispatchToProps(dispatch) {
    return {
      checkUser: user => dispatch(checkUser(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      msg: store.cloginMsg,
      user : store.user
    };
  }
 
  const LoginForm = connect(mapStateToProps, mapDispatchToProps)(Login);
  export default LoginForm;