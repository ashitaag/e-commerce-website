import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol,MDBRow,  MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView,} from "mdbreact";
import Header from "./header";
import history from "./history";
import {ReactSession} from "react-client-session";
const axios = require('axios');
const url = "http://localhost:8080/user/";


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.location.state["detail"]
        }
    }

    handleClick(event){
        axios.post(url+"addToCart", {
            email: ReactSession.get("email"),
            uniq_id: this.state.data.uniq_id
        },{headers:{"Access-Control-Allow-Origin": "*"}}).then(function(response){
            console.log(response);
            history.push("/Cart");
            window.location.reload(false);
        })
         .catch(error=>{
            console.log(error.response)
  });
    }

    render() {
        let prod_image = []
        // const data = this.props.location.state["detail"];
        console.log(this.state.data.image)
        console.log(this.state.data.image.split(",").length)
        for(var i = 1; i <= this.state.data.image.split(",").length; i++){
            // console.log(data.image.split(",")[i].substring(2,data.image.split(",")[i].length-1))
            prod_image.push(<MDBCarouselItem itemId ={i.toString()} >
                    <MDBView style = {{textAlign: "center"}} >
                      <img
                        style={{maxHeight:"75vh", maxWidth:"75%", width:"auto"}}
                        className="d-block w-100"
                        src ={this.state.data.image.split(",")[i-1].substring(2,this.state.data.image.split(",")[i-1].length-1)}
                        alt="First slide"
                      />
                    </MDBView>
                  </MDBCarouselItem>)
        }

        return (
            <div>
                <Header />
               <MDBRow className="mb-4" style = {{paddingTop: "50px"}}>
                   <MDBCol size="6">
                         <MDBCarousel
                            activeItem={1}
                            length={3}
                            showControls={true}
                            showIndicators={true}
                            className="z-depth-1"
                            slide>
                            <MDBCarouselInner >
                                {prod_image}
                            </MDBCarouselInner>
                        </MDBCarousel>
                   </MDBCol>
        <MDBCol size = "6">
            <div><h2>{this.state.data.product_name}</h2></div>

            <div><h3>Rs.{this.state.data.retail_price}</h3></div>
            <button onClick={this.handleClick.bind(this)}>Add To Cart</button>
        </MDBCol>
        </MDBRow>
            </div>
        );
    }
}

export default Product;