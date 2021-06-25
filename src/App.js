import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Posts from './components/Posts'
import { getPosts } from './actions/postsAction';
import { useDispatch } from 'react-redux';

import { Container } from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const App = () => {
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getPosts());
    }, [dispatch]);
    return (
        <Container>
            <Router>
            <NavBar />
            <Switch>
            <Route path="/" render={() => <Posts />} />
            </Switch>
            </Router>
            <Footer />
        </Container>
    );
};
  
export default App;