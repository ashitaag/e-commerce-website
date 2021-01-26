import React, {Component} from 'react';
import {MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import history from "./history";
import {ReactSession} from "react-client-session";
const axios = require('axios');
const url = "http://localhost:8080/user/";
class Signup extends Component {
    constructor(){
    super();
    this.state= {
        email: "",
        username: "",
        password:""
    }
    }

    handleEmailChange(event){
        this.setState(({
            email: event.target.value
        }))
    }

    handlePwdChange(event){
        this.setState(({
            password: event.target.value
        }))
    }

    handleUnameChange(event){
        this.setState(({
            username: event.target.value
        }))
    }
    handleSubmit(event){
        event.preventDefault();
        console.log("submit");
        axios.post(url + "insert", {
        email : this.state.email,
        userName: this.state.username,
        password: this.state.password
      }, {headers:{"Access-Control-Allow-Origin": "*"}})
      .then(function (response) {
        console.log("comiong response is: ",response);
        if (response.data == ""){
            alert("Email already Exists");
            return;
        }
        ReactSession.set("username", response.data.userName);
        ReactSession.set("email", response.data.email);
        history.push({pathname: '/'})
        window.location.reload(false);
      })
    }


    render() {
        return (
            <div>
            <MDBContainer>
                <MDBRow>
                <MDBCol md={4} ></MDBCol>
                <MDBCol md="4" style={{paddingTop:"30vh"}}>
                <form onSubmit = {this.handleSubmit.bind(this)}>
                <p className="h5 text-center mb-4">Sign Up</p>
                <div className="grey-text">
                  <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                            success="right" onChange={this.handleEmailChange.bind(this)}/>
                    <MDBInput label="Type your UserName" icon="envelope" group type="text" validate error="wrong"
                            success="right" onChange={this.handleUnameChange.bind(this)} />
                  <MDBInput label="Type your password" icon="lock" group type="password" validate onChange={this.handlePwdChange.bind(this)} />
                </div>
                <div className="text-center">
                  <input type="submit" value="Sign Up" />
                </div>
                </form>
                </MDBCol>
                </MDBRow>
            </MDBContainer>
            </div>
        );
    }
}

export default Signup;