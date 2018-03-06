import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
//import './style.css';

class Footer extends Component {
  
  render(props) {
    return (
      <div>
        <footer className="footer bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 h-100 text-center text-lg-left my-auto">
                <ul className="list-inline mb-2">
                  <li className="list-inline-item">
                    <a href="#">About</a>
                  </li>
                  <li className="list-inline-item">&sdot;</li>
                  <li className="list-inline-item">
                    <a href="#">Contact</a>
                  </li>
                  <li className="list-inline-item">&sdot;</li>
                  <li className="list-inline-item">
                    <a href="#">Terms of Use</a>
                  </li>
                  <li className="list-inline-item">&sdot;</li>
                  <li className="list-inline-item">
                    <a href="#">Privacy Policy</a>
                  </li>
                </ul>
                <p className="text-muted small mb-4 mb-lg-0">&copy; Your Website 2018. All Rights Reserved.</p>
              </div>
              <div className="col-lg-6 h-100 text-center text-lg-right my-auto">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item mr-3">
                    <a href="#">
                      <i className="fa fa-facebook fa-2x fa-fw"></i>
                    </a>
                  </li>
                  <li className="list-inline-item mr-3">
                    <a href="#">
                      <i className="fa fa-twitter fa-2x fa-fw"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-instagram fa-2x fa-fw"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
export default Footer;