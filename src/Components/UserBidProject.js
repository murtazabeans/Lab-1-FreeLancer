import React, { Component } from 'react';
import axios from 'axios';

class ProjectDetail extends Component {

  render() {
      let status_of_project;
      if(this.props.assigned_to == ""){
        status_of_project = "PENDING";
      }
      else if(this.props.assigned_to == localStorage.user_id)
      {
        status_of_project = "ASSIGNED TO YOU";
      }
      else{
        status_of_project = "ASSIGNED TO SOMEONE ELSE";
      }
      return (
          <tr>
            <td>{this.props.project_name}</td>
            <td>{this.props.employer_name}</td>
            <td>{this.props.avg_bid}</td>
            <td>{this.props.user_bid}</td>
            <td class = "status">{status_of_project}</td>
          </tr>
      )
    }
}

export default ProjectDetail;
