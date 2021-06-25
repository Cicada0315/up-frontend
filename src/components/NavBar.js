import React from 'react'
import logo from '../images/Logo.png';

import { Navbar, Nav, Button } from 'react-bootstrap';

const NavBar=()=>{
    const user= false;
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/"><img src={logo} width="30" height="30" alt="logo"/> UP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/about">AboutUps</Nav.Link>
                <Nav.Link href="/posts">AllUps</Nav.Link>
                {!user?(<><Nav.Link href="/auth"><Button variant="primary">Sign In</Button></Nav.Link></>):
                    (<><Nav.Link href="/posts/new">CreateUp</Nav.Link>
                    <Button variant="primary">Sign Out</Button></>)
                }
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar