import React, { Component } from 'reactn';
import {Navbar, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import avatar from './avatar.png';
import Routes from './Routes';

export default class App extends Component {
  render() {
    return(
      <div className="App">
        <Navbar sticky="top" bg="light">
          <Navbar.Brand>
              <Link to="/">Home</Link>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
          <Link to="/profile">
              <NavItem><img src={avatar} width="30" height="30" alt="Profile avatar"/></NavItem>
          </Link>
          </Navbar.Collapse>
        </Navbar>
        <Routes/>
      </div>
  );
  }
}
