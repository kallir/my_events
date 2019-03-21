import React, {Component} from "reactn";
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import avatar from '../avatar.png';
import './Navbar.css';

export default class Nav extends Component {
    render(){
        return(
            <Navbar fixed="top" className="navbar" bg="light">
            <Navbar.Brand>
                <Link to="/home">Hoeeeeeeeme</Link>
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Link to="/profile"><img src={avatar} width="30" height="30" alt="Profile avatar"/></Link>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}