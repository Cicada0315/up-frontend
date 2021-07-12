import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import logo from '../images/Logo.png';

import { Navbar, Nav, Button } from 'react-bootstrap';
import {  useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import decode from 'jwt-decode';

const NavBar=()=>{
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser]=useState(JSON.parse(localStorage.getItem('userinfo')));

    useEffect(() => {
        if(user){
            if(user.jwt){
                const decodedToken = decode(user.jwt);
                if (decodedToken.exp * 1000 < new Date().getTime()){
                    logout();
                } 
            }
        }
        setUser(JSON.parse(localStorage.getItem('userinfo')));
    }, [location]);

    const logout=(e)=>{
        dispatch({type: 'SIGN_OUT'});
        history.push('/login');
        setUser(null);
    }

    return(
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="/"><img src={logo} width="30" height="30" alt="logo"/> UP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/about">AboutUps</Nav.Link>
                <Nav.Link href="/posts">AllUps</Nav.Link>
                {!user?(<><Button variant="outline-light" onClick={()=>{history.push("/login")}}> Sign In</Button></>):
                    (<><Nav.Link href="/posts/new">CreateUp</Nav.Link>
                    <Button variant="outline-light" onClick={logout}>Sign Out</Button></>)
                }
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar