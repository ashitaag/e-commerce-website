import React, {Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import {ReactSession} from "react-client-session";
import Header from "./header";
import history from "./history";
const url = "http://localhost:8080/user/getCart/";
var email;
class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart: [],
            products: []
        }
    }

    componentDidMount(){
    fetch(url + ReactSession.get("email"))
              .then((response) => response.json())
        .then(data => this.setState({
            cart : data
        }));
}
    render() {

        return (
            <div>
                <Header/>
                {
                    this.state.cart.map(function(prodObj, ind){
                        return (
                            <MDBRow style = {{paddingTop: "50px"}}>
                                <MDBCol style = {{textAlign: "center"}}><img  style = {{ height:"12rem",width:"12rem",}}src = {prodObj.image.split(",")[0].substring(2,prodObj.image.split(",")[0].length -1)} /></MDBCol>
                                <MDBCol style = {{textAlign: "center"}}>
                                    <div>{prodObj.name} --- {prodObj.quantity}</div></MDBCol>
                            </MDBRow>
                        )
                    })
                }
            </div>
        );
    }
}

export default Cart;