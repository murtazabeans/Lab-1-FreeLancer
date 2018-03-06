import React, { Component } from 'react';
//import UserBidProject from './UserBidProject';
import axios from 'axios';

class AllUserBidProjects extends Component {

  constructor(){
    super();
    this.state = { data: [] };
  }
  
  componentDidMount(){
    var user_id = localStorage.user_id;
    this.loadProjectsFromServer(user_id);
  }

  loadProjectsFromServer(user_id){
    var self = this;
    axios.get("http://localhost:3001/get_all_user_bid_projects?u_id=" + user_id)
    .then(function (response) {
      if(response.data.rows != null){
        let user_detail = response.data.rows;
        console.log(response);
        self.setState({
          data: response.data.rows
        })
        // axios.post("http://localhost:3001/get_avg_bids")
        //   .then(function (response) {
        //     if(response.data.rows != null){
        //       let user_detail = response.data.rows;
        //       console.log(response);
        //       self.setState({
        //         data: response.data.rows
        //       })



        return;
      }
      return;
    })
  }

  render() {
     let projectList;
    // if(this.state.data != null){
    //   projectList = this.state.data.map(project => {
    //     return(
    //       <ProjectDetail key = {project.id} id = {project.id} number_of_bids = {project.total_bids}  name={project.title} description={project.description} skills_required = {project.skills_required}
    //       max_budget = {project.max_budget} min_budget = {project.min_budget} employer_name={project.name}   />
    //     )
    //   })
    // }
    return (
      <div>
        <table class="table details-table">
          <thead class = "table-header">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Skills Required</th>
              <th scope="col">Budget Range($)</th>
              <th scope="col">Employer Name</th>
              <th scope="col">Number of Bids</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            { projectList }
          </tbody>
        </table>
      </div>
    )
  }
}
export default AllUserBidProjects;