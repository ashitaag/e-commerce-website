import React from 'react';
import "../Style/Home.css";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import ProductList from "./ProductList";
import Header from "./header";
import {ReactSession} from 'react-client-session';
class Home extends React.Component {

    render() {
      return (
            <div>
            <Header/>
            <ProductList/>
            </div>

        );
    }
}
export default Home;