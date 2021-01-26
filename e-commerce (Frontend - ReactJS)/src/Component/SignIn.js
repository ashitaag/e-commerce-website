import React,{Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import history from "./history";
import {ReactSession} from 'react-client-session';
import {Button} from "@material-ui/core";
ReactSession.setStoreType("localStorage");
const url = "http://localhost:8080/user/";
class SignIn extends Component {
  constructor(){
    super();
    this.state= {
      email : "",
      password : "",
      newpwd: {},
      error: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validate(){
    console.log(this.state.newpwd);
    if(this.state.newpwd === null){
      alert("The user doesnot exist, please signup");
      history.push("/Signup")
      window.location.reload(false);
    }
    if(this.state.newpwd.password === this.state.password){
      console.log("data",this.state.newpwd.userName);
      ReactSession.set("username",this.state.newpwd.userName );
      ReactSession.set("email",this.state.newpwd.email );
      history.push({pathname: '/'})
      window.location.reload(false);
    }
    else{
      alert("The passowrd is incorrect");
    }
  }
  handleEmailChange(event){
    this.setState(
        {email: event.target.value}
    );
  }
    handlePwdChange(event){
    this.setState(
        {password: event.target.value}
    );
  }
  handleSubmit(event){
    event.preventDefault();
    fetch(url+"validate/" + this.state.email)
    .then((response) => response.json())
    .then(data => this.setState({ newpwd: data},()=>this.validate()))
  }



  render() {
    let data = ReactSession.get("username");
    if (data != null){
        history.push({pathname: '/'})
        window.location.reload(false);
    }

    return (
        <MDBContainer>
          <MDBRow>
            <MDBCol md={4} ></MDBCol>
            <MDBCol md="4" style={{paddingTop:"30vh"}}>
              <form onSubmit={this.handleSubmit}>
                <p className="h5 text-center mb-4">Sign in</p>
                <div className="grey-text">
                  <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                            success="right" onChange = {this.handleEmailChange.bind(this)} />
                  <MDBInput label="Type your password" icon="lock" group type="password" validate onChange = {this.handlePwdChange.bind(this)}/>
                </div>
                <div className="text-center">
                  <input type="submit" value="Sign In" />
                </div>
                <div className="text-center">
                  <a href = "/Signup" >Sign up</a>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
    );
  }
}
export default SignIn;