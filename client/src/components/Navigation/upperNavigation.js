import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import UserImage from '../StyledComponents/UserImage';
import {UserImageXs} from '../Common/constant';
import userPathImage from '../../assets/images/userProfileImage.svg';
// Import Icons.
import { BiLogOut } from "react-icons/bi";
import { AiFillHome, AiOutlinePlusCircle } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
// Importing Navigation CSS.
import './navigationStyles.scss';
class UpperNavigation extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: "Ishwar Deoolkar"
        }
    } 

    render(){
        return (
            <div className="upperNavigation">
                <div className="screen-container">
                    <Navbar expand="lg" className="navbar-section">
                        <Navbar.Brand as={Link} to="/">{this.props.brandName}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mx-auto upper-navbar-link">
                                <Nav.Item className="navabr-item"><NavLink className="navbar-link mr-lg-14 ml-lg-14" to="/" exact activeClassName="active"><AiFillHome/></NavLink></Nav.Item>
                            </Nav>
                            <Nav className=" upper-navbar-link">
                                <NavDropdown className="navbar-dropdown-item" title={<UserImage styleObject={UserImageXs} urlPath={userPathImage} userName={this.state.userName}/>} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#"><BiLogOut/> Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
        )
    }
}
export default UpperNavigation;
