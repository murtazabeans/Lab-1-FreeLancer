import React, { Component } from 'react';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';
import swal from 'sweetalert2'

class ProjectBid extends Component {

  constructor(){
    super();
    this.handleHireButton = this.handleHireButton.bind(this);
  }

  handleHireButton(e){
    e.preventDefault();
    let form_values = { p_id: localStorage.project_id, free_lancer_id: e.target.id };
    axios.post("http://localhost:3001/hire_user", form_values)
    .then(function (response) {
        swal({
          type: 'success',
          title: 'Thank You',
          text: 'You have Hired FreeLancer Successfully! Contact Details will be shared with you soon!'
        })
    })
  }


  render() {
    let hire_button = null;
    let image_tag = <img id = "profile_image" src= { require('../images/' + this.props.image_name) } alt="Smiley face" height="80px" width="80px" />
    if(this.props.isProjectOwner){
        hire_button = <a href = "#" id = {this.props.free_lancer_id} className="link-style nav-link btn-info action-link" onClick = {this.handleHireButton}>Hire</a>
      }
    return (
        <tr>
          <td>
            {image_tag}

          </td>
          <td>{this.props.freelancer_name}</td>
          <td>{this.props.price}</td>
          <td>{this.props.days}</td>
          <td>
            {hire_button}
          </td>
        </tr>
    )
  }
}

export default ProjectBid;
