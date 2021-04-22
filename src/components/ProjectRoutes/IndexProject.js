import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { projectIndex } from '../../api/project_api'

class ProjectIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: []
    }
  }
  componentDidMount () {
    const { msgAlert } = this.props
    projectIndex()
      .then(res => this.setState({ projects: res.data }))
      .then(() => msgAlert({
        heading: 'Loaded Projects!',
        message: 'All projects ',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load the projects!',
          message: 'The projects have an error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { projects } = this.state
    if (projects.length === 0) {
      return (
        <h2>You have no projects, go create one to view it here.</h2>
      )
    }
    const projectJsx = projects.map(project => (
      <div className="card" key={project._id}>
        <Link to={`/projects/${project._id}`} key={project._id}>
          <div className="card-body">
            <h4 className="card-title">{project.name}</h4>
            <p className="card-text">{project.createdDate.substring(0, 10)}</p>

            {/* <p className="card-text"><small className="text-muted">Created: {journal.date.substring(0, 10)}</small></p> */}
          </div>
        </Link>
      </div>
    ))
    return (
      <div>
        <h2>Projects: </h2>
        {projectJsx}
      </div>
    )
  }
}
export default withRouter(ProjectIndex)
