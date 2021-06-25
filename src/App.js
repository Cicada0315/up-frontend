import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Posts from './components/Posts'
import Form from './components/Forms/PostForm';
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
    console.log(currentPostId)

    useEffect(()=>{
        dispatch(getPosts());
    }, [currentPostId, dispatch]);

    return (
        <Container>
            <Router>
            <NavBar />
            <Switch>
            <Route exact path="/posts/new" component={() => <Form currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>} />
            <Route exact path="/posts/" component={() => <Posts currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>} />
            <Route exact path="/posts/:currentPostId/edit" component={() => <Form currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>} />
            <Route path="/" render={() => <Posts currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>} />
            </Switch>
            </Router>
            <Footer />
        </Container>
    );
};
  
export default App;