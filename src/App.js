import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './components/About';
import Posts from './components/Posts'
import IndividualPost from './components/IndividualPost';
import Form from './components/Forms/PostForm';
import Auth from './components/Forms/Auth'
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
    const [currentPostId, setCurrentPostId] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(()=>{
        dispatch(getPosts());
    }, [currentPostId, dispatch, submitted]);

    return (
        <Container>
            <Router>
            <NavBar />
            <Switch>
            <Route exact path="/login" component={() => <Auth />} />
            <Route exact path="/posts/new" component={() => <Form currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>} />
            <Route exact path="/posts/" component={() => <Posts currentPostId={currentPostId} setCurrentPostId={setCurrentPostId} setSubmitted={setSubmitted}/>} />
            <Route exact path="/posts/:id" component={() => <IndividualPost currentPostId={currentPostId} setCurrentPostId={setCurrentPostId} setSubmitted={setSubmitted}/>} />
            <Route exact path="/posts/:currentPostId/edit" component={() => <Form currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>} />
            <Route path="/about" component={() => <About />} />
            <Route path="/" render={() => <Posts currentPostId={currentPostId} setCurrentPostId={setCurrentPostId} setSubmitted={setSubmitted}/>} />
            </Switch>
            </Router>
            <Footer />
        </Container>
    );
};
  
export default App;