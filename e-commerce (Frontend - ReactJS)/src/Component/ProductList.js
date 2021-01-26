import React, {Component, useCallback} from 'react';
import productService from "../productService";
import axios from "axios"
import Product from "./Product"
import history from "./history";
import Pagination from "react-js-pagination";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol,MDBRow, MDBPagination,MDBPageItem} from "mdbreact";
// import $ from "jquery";
const url = "http://localhost:8080/api/Products";
// import 'bootstrap/dist/css/bootstrap.min.css';
// const $ = require('jquery');
// window.$ = $;
// window.jQuery = $;
// require("bootstrap-less");

class ProductList extends Component {
    constructor(){
        super();
        this.state = {
            products:[],
            product:[],
            activePage: 1,
            items:[],
            color:"red"

        }
        this.handleClick = this.handleClick.bind(this);
    }
    initialization(){
        for(let i = 0; i < 10; i++) {
            this.state.items.push(<div className="col-md-4 mb-4 d-flex align-items-stretch justify-content-center">
                              <MDBCard style={{ width: "32rem" }}>
                                  <div style={{height:"12rem",width:"100%", textAlign: "center"}}>
                                       <img style={{height:"100%",width:"auto"}} src= {this.state.products[i].image.split(",")[0].substring(2,this.state.products[i].image.split(",")[0].length -1)}
                                       /></div>
                                    <MDBCardBody className='text-center'>
                                  <MDBCardTitle>{this.state.products[i].product_name}</MDBCardTitle>
                                  <MDBBtn onClick={() => this.handleClick(this.state.products[i].uniq_id)}>Click</MDBBtn>
                                </MDBCardBody>
                              </MDBCard></div>
            )
          }

    }
    getComponent(){
        console.log("hello");
        // <Product prod = {this.state.product}/>
        history.push({pathname: '/Product', state: { detail: this.state.product}});
        window.location.reload(false);
    }
    componentDidMount() {
        fetch(url)
              .then((response) => response.json())
               .then(data =>
                      this.setState({
                        products: data,
                      },()=> {
                          this.initialization();
                          this.setState({items:this.state.items})
                      })
                      )
        }

    handleClick( pid) {
    console.log('this is:', pid);
    fetch(url + "/" + pid)
      .then((response) => response.json())
        .then(data =>
                      this.setState({
                        product: data,
                      },()=>this.getComponent()))

}



    handlePageChange(pageNumber){
        this.state.items = []
        console.log(pageNumber)
        const start = 10 * (pageNumber-1)
        for(let i = start; i < start + 10; i++) {
                this.state.items.push(<div className="col-md-4 mb-4 d-flex align-items-stretch justify-content-center">
                                  <MDBCard style={{ width: "32rem" }}>
                                      <div style={{height:"12rem",width:"100%", textAlign: "center"}}>
                                           <img style={{height:"100%",width:"auto"}} src= {this.state.products[i].image.split(",")[0].substring(2,this.state.products[i].image.split(",")[0].length -1)}
                                           /></div>
                                        <MDBCardBody className='text-center'>
                                      <MDBCardTitle>{this.state.products[i].product_name}</MDBCardTitle>
                                      <MDBBtn onClick={() => this.handleClick(this.state.products[i].uniq_id)}>Click</MDBBtn>
                                    </MDBCardBody>
                                  </MDBCard></div>
                )
          }
        this.setState({activePage: pageNumber});
    }
    render() {

        return (
            <div style = {{paddingTop: "50px"}}>
                {/*<section className='text-center my-5'>*/}
                <MDBRow className="mb-4">
                    {this.state.items}
                </MDBRow>
                <MDBRow className="mb-4">
                    <MDBCol></MDBCol>
                    <MDBCol>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={100}
                  pageRangeDisplayed={10}
                  onChange={this.handlePageChange.bind(this)}
                /></MDBCol></MDBRow>

            </div>
        );
    }
}

export default ProductList;