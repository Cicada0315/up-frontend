import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux';
import logo from '../images/Logo.png';

import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import {  useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getSearchedPosts } from '../actions/postsAction';
import decode from 'jwt-decode';

const NavBar=()=>{
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser]=useState(JSON.parse(localStorage.getItem('userinfo')));
    const [search, setsearch] = useState({ query: ''});

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

    const handleonChange = (e) => {
        setsearch({
            ...search,
            query: e.target.value
        });
        
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(getSearchedPosts(search));
        setsearch({
            query: ''
        })
    };


    return(
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="/"><img src={logo} width="30" height="30" alt="logo"/> UP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/about">AboutUps</Nav.Link>
                <Nav.Link href="/posts">AllUps</Nav.Link>
                {!user?(<><Button variant="outline-light" onClick={()=>{history.push("/login")}}> Sign In</Button></>):
                    (<><Nav.Link href="/posts/new">CreateUp</Nav.Link>
                    <Button variant="outline-light" onClick={logout}>Sign Out</Button></>)
                }
            </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
            <Form inline onSubmit={handleSubmit}>
                <FormControl onChange={handleonChange} type="text" placeholder="Search" value={search.query} className="mr-sm-2" />
                <Button variant="outline-light" type="submit">Search</Button>
            </Form>
            </Navbar.Collapse>
            
        </Navbar>
    )
}

export default NavBar