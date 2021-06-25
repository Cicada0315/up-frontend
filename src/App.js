import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Posts from './components/Posts'

import { Container } from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const App = () => {
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