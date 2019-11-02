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
import hostAddress from '../constants';

let config2 = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }

class Rupdateprofile extends Component {
    constructor(props){
            super(props);
            this.state = {  
                rid : "",
                file1 : "",
                file2 : "",
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
            this.oimageChangeHandler = this.oimageChangeHandler.bind(this);
            this.rimageChangeHandler = this.rimageChangeHandler.bind(this);
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
axios.get('http://'+hostAddress+':3001/getCuisine/getCuisine')
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
        axios.post('http://'+hostAddress+':3001/rprofile/rprofile',data,config2)
                .then((response) => {
                this.setState({
                rid : response.data.rid,
                email: response.data.email,
                fullname: response.data.oname,
                contact: response.data.contact,
                address : response.data.address,
                city : response.data.city,
                cuisine : response.data.cuisine,
                zipcode : response.data.zipcode,
                restaurant : response.data.name,
                oimage : "http://"+hostAddress+":3001/images/all/" + response.data.oimage+ "",
                rimage : "http://"+hostAddress+":3001/images/all/" + response.data.rimage+ ""
                });  
            });
    }
    cuisineChangeHandler = (value) => {
        console.log(value.value);
        this.setState({
            cuisine : value.value
        })
        
    }
    rimageChangeHandler = e => {
        this.setState({
          file2: e.target.files[0]
        })
      }
      oimageChangeHandler = e => {
        this.setState({
          file1: e.target.files[0]
        })
      }

    onChangeHandler = (e) => {
        this.setState({
           [e.target.name] : e.target.value
        });
    }
    submitProfile = (e) => {
        var headers = new Headers();
// Owner Image
        e.preventDefault()
        let config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
          }
        if(this.state.file1!="" || this.state.file2!=""){
        let formData = new FormData()
        console.log(this.state.file1.name)
        formData.append('myImage', this.state.file1, this.state.file1.name)
        formData.append('rid', this.state.email)
        
        axios
          .post('http://'+hostAddress+':3001/rprofileuploadimage', formData)
          .then(response => {
            console.log('Image uploaded')
            console.log(response.data.filename)
            this.setState({
              oimage: "http://"+hostAddress+":3001/images/all/" + response.data.filename+ ""
            })
       
            const formData2 = new FormData()
            console.log(this.state.file2.name)
            formData2.append('myImage', this.state.file2, this.state.file2.name)
            formData2.append('rid', this.state.email)
            
            axios
              .post('http://'+hostAddress+':3001/restaurantuploadimage', formData2)
              .then(response => {
                console.log('Image uploadedfddf')
                console.log(response.data.filename)
                this.setState({
                  rimage: "http://"+hostAddress+":3001/images/all/" + response.data.filename+ ""
                })
              })
              .catch(error => { })
          })
          .catch(error => { })
        }
          //Restaurant Image
          
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
            cuisine : this.state.cuisine   
        }

       // this.props.updateRProfile(data);
       console.log("processing in reducer")
       //set the with credentials to true
       axios.defaults.withCredentials = true;
       //make a post request with the user data
       axios.post('http://'+hostAddress+':3001/rprofileupdate/rprofileupdate',data,config2)
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
        if(cookie.load('cookie')=="customer"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        return(
            <div>
                {redirectVar}
                
                   
                <div class="container split left div-left" style={{ width:"30%"}}>
                {/* <div class="container" style={{backgroundColor:"white", borderRadius:"12px",height : "300px", width : "220px"}}> */}
                <img
                src={this.state.rimage}
                id="dp"
                style={{border:"10px solid black" ,marginBottom:"10%",borderColor: "white" ,WebkitBorderRadius: "25%" , height : "200px", width : "200px"}}
                alt="User Display"
                 />
                <img
                src={this.state.oimage}
                id="dp"
                style={{border:"10px solid black" ,marginBottom:"10%",borderColor: "white" ,WebkitBorderRadius: "25%" , height : "200px", width : "200px"}}
                alt="User Display"
                />
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
                                    <td><input  name="rimage" type="file" accept="image/png, image/jpeg" onChange={this.rimageChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Owner Image </td>
                                    <td><input  name= "oimage" type="file" accept="image/png, image/jpeg" onChange={this.oimageChangeHandler}></input></td>
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

  


