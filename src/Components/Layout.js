import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import allreducers from '../reducers'


import '../css/bootstrap.min.css';
import '../css/font-awesome.min.css';
import '../css/simple-line-icons.css';
import '../css/landing-page.min.css'

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    if(localStorage.user_id != undefined){
      this.props.getUserName(localStorage.user_id)
    }
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

function mapStateToProps(state){
  return{
    user: state.userLoggedIn
  }
}


function mapDispatchToProps(dispatch){
  return{
    getUserName: (user_id) => {
      axios.get('http://localhost:3001/get-user-name?id=' + user_id)
      .then(response => {
        console.log(response.data);
        if(response.data.data_present){
          dispatch({type: 'LoggedIn', payload: response.data.rows});
        }
     }) 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

