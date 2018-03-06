import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
//import './style.css';

class Header extends Component {
  constructor(){
    super();
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut(e){
    localStorage.clear();
    window.location.href = "http://localhost:3000/signin";
  }

  render(props) {
    let  session_link, post_project, user_profile, projects_page, bid_page, dashboard = null;
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if(isLoggedIn == "true") {
      dashboard = <a className="link-style nav-link btn-info" href="#">Dashboard</a>
      projects_page = <a className="link-style nav-link btn-info" href = "/projects"  >All Projects</a>
      post_project = <a className="link-style nav-link btn-info" href="/new-project">Post Project </a>
      user_profile = <a className="link-style nav-link btn-info" href="/edit_profile">Edit Profile </a>
      session_link = <a className="link-style nav-link btn-info" onClick = {this.handleSignOut} href="#">Sign Out</a>
    }
    else{
      session_link = <a className="btn btn-primary" href="/signin">Sign In</a>      
    }
    return (
      <div>
        <nav className="navbar navbar-light bg-light static-top">
          <div className="container">
          
          <a href="https://www.freelancer.com/" target="_blank" className="navbar-brand web-link" title="Home"><img src= {require('../img/freelancer.svg')} /></a>

          { dashboard }
          { projects_page }
          { post_project }
          { user_profile }
          { session_link }
          </div>
        </nav>
      </div>
    )
  }
}
export default Header;