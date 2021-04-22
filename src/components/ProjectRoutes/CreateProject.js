import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ProjectForm from '../ProjectForm/ProjectForm'
import { projectCreate } from '../../api/project_api'

class ProjectCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      project: {
        name: '',
        targetStartDate: '',
        targetEndDate: ''
      },
      createdProjectId: null
    }
  }
  handleChange = event => {
    event.persist()
    this.setState(state => {
      return {
        project: { ...state.project, [event.target.name]: event.target.value }
      }
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { project } = this.state
    console.log('this is the user: ' + user)
    projectCreate(project, user)
      .then(res => this.setState({ createdProjectId: res.data.project._id }))
      .then(() => msgAlert({
        heading: 'Created project successfully.',
        message: 'Showing created project',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Sorry! Failed to create project.',
          message: 'Could not create project with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { project, createdProjectId } = this.state
    if (createdProjectId) {
      return <Redirect to={`/projects/${createdProjectId}`} />
    }
    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Create a Project</h3>
          <ProjectForm
            project={project}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}
export default ProjectCreate
