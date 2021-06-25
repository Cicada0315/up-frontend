import React from 'react';
import NavBar from './NavBar';
import Footer from './components/Footer';


import { Container } from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const App = () => {
    return (
        <Container>
          
          <Switch>
          
          </Switch>
          
          <Footer />
        </Container>
    );
};
  
export default App;