import React, { Component } from 'react';
import axios from 'axios';

class ProjectDetail extends Component {

  constructor(){
    super();
    this.handleProjectView = this.handleProjectView.bind(this);
  }

  handleProjectView(e){
    localStorage.setItem('project_id', e.target.dataset.id);
    window.location.href = "http://localhost:3000/project-detail"
  }

  handleBidsView(e){
    // project_id = 
    localStorage.setItem('project_id', e.target.dataset.id);
    window.location.href = "http://localhost:3000/project-bids"
  }

  render() {
    
      return (
          <tr>
            <td>{this.props.name}</td>
            <td>{this.props.description}</td>
            <td>{this.props.skills_required}</td>
            <td>{this.props.min_budget} - {this.props.max_budget}</td>
            <td>{this.props.employer_name}</td>
            <td>{this.props.number_of_bids}</td>
            <td>
              <a href = "#" data-id = {this.props.id} className="link-style nav-link btn-info action-link" onClick={this.handleProjectView}>View Project</a>
              <a href = "#" data-id = {this.props.id} className="link-style nav-link btn-info action-link" onClick={this.handleBidsView}>View Bids</a>
            </td>
          </tr>
      )
    }
}

export default ProjectDetail;
