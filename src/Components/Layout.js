import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import allreducers from '../reducers'

import '../css/bootstrap.min.css';
import '../css/font-awesome.min.css';
import '../css/simple-line-icons.css';
import '../css/landing-page.min.css'

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <Header/>
        {this.props.children}
      <Footer/>
    </div>
    )
  }
}
export default Layout;

