import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
//import cookie from 'react-cookies';
//import {Redirect} from 'react-router';

class Calc extends Component {
    constructor(){
        super();
        this.state = {  
            inputText:""
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.inputButtonCall = this.inputButtonCall.bind(this);
        this.submitString = this.submitString.bind(this);
    }  
  
    inputChangeHandler = (e) => {
        this.setState({
            inputText : e.target.value
        })
    }

    inputButtonCall = (i)=>{
        if(i==="C"){
            this.inputString.value="";
            this.setState({
                inputText: ""
            })
        }else if(i==="B"){
        let str=this.state.inputText;
        str=str.substring(0, str.length-1);
        this.setState({
            inputText: str
        })
        this.inputString.value=str;
        }else{
          let temp=this.state.inputText;
          let temp3= temp.substring(temp.length-1,temp.length);
          console.log(temp3);
          if((temp3==="+" || temp3==="-" || temp3=== "*"|| temp3==="/"|| temp3===".")&& (i==="+" || i==="-" || i=== "*"|| i==="/"|| i===".")){
            temp=temp.substring(0, temp.length-1);
            console.log(" I am here");
          }
           temp=temp+""+i; 
           this.inputString.value=temp;
           this.setState({
           inputText : temp
       })
     }
    }

    submitString = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            iText : this.state.inputText
        }
        axios.post('http://localhost:3001/calc',data)
            .then(response => {
                this.inputString.value=response.data;  
            });
    }

    render(){
        return(
            <div>
            
               <form action="http://127.0.0.1:3000/calc" method="post">
                <div class="container">
                    <div class="main-div">
                    <input ref={(ref)=> this.inputString=ref} style={{padding: '30px', marginBottom: '20px'}} type="text" onChange = {this.inputChangeHandler} class="form-control" name="inputString" placeholder="0"></input>
                        <table class="table">
                            <tbody>
                                <tr style={{padding: '15px'}}>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"C")} style={{padding: '10px 15px', width : '120px'}} >C</button>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"B")} style={{padding: '10px 15px', width : '60px'}} >Bk</button>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"+")} style={{padding: '10px 15px', width : '60px'}} >+</button>
                                    
                                </tr>
                                <tr style={{padding: '15px'}}>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"1")} style={{padding: '10px 15px', width : '60px'}} >1</button>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"2")} style={{padding: '10px 15px', width : '60px'}} >2</button>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"3")} style={{padding: '10px 15px', width : '60px'}} >3</button>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"-")} style={{padding: '10px 15px', width : '60px'}} >-</button>
                                </tr>
                                <tr style={{padding: '15px'}}>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"4")} style={{padding: '10px 15px', width : '60px'}} >4</button>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"5")} style={{padding: '10px 15px', width : '60px'}} >5</button>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"6")} style={{padding: '10px 15px', width : '60px'}} >6</button>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"*")} style={{padding: '10px 15px', width : '60px'}} >*</button>
                                </tr>
                                <tr style={{padding: '15px'}}>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"7")} style={{padding: '10px 15px', width : '60px'}} >7</button>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"8")} style={{padding: '10px 15px', width : '60px'}} >8</button>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"9")} style={{padding: '10px 15px', width : '60px'}} >9</button>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"/")} style={{padding: '10px 15px', width : '60px'}} >/</button>
                                </tr>
                                <tr style={{padding: '15px'}}>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,".")} style={{padding: '10px 15px', width : '60px'}} >.</button>
                                    <button type="button" onClick = {this.inputButtonCall.bind(this,"0")} style={{padding: '10px 15px', width : '60px'}} >0</button>
                                    <button type="button" onClick = {this.submitString} class="btn btn-success" style={{padding: '10px 15px', width : '120px'}} type="submit">Enter</button>
                                </tr>
                            </tbody>
                        </table>
                        
                </div> 
            
               
            </div> 
         ]
            </form>
            </div> 
        )
    }
}
//export Calc Component
export default Calc;