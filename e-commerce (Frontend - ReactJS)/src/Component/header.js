import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import "../Style/header.css"
import {Link} from "react-router-dom"
import {ReactSession} from "react-client-session";
class header extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
        let username = ReactSession.get("username");
        let loginFlag = "/SignOut";
        let loginWord = "Sign Out"
        if (username == null){
            username = "Guest";
            loginFlag = "SignIn";
            loginWord = "Sign In"
        }
  return (
      <MDBNavbar color="black" dark expand="md"  >
          <MDBNavbarBrand>
          <Link to= "/">
            <strong className="white-text">Ashita</strong>
          </Link>
          </MDBNavbarBrand>

        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem className="header_search">
                  <input className="header_searchInput" type="text" placeholder="Search" aria-label="Search" />
                  <SearchIcon className= "header_searchIcon"></SearchIcon>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem active>
              <MDBNavLink to="/">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Hello {username}</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Returns and Orders</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to={loginFlag}>{loginWord}</MDBNavLink>
            </MDBNavItem>
            <Link to= "/Checkout">
              <MDBNavItem className="header_optionBasket">
                <ShoppingBasketIcon className= "basket"/>
                <span className= "header_optionLineTwo header_basketCount">0</span>
              </MDBNavItem>
            </Link>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default header;