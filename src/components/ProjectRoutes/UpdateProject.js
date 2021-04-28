import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import ProjectForm from '../ProjectForm/ProjectForm'

import { projectUpdate } from '../../api/project_api'

class ProjectUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      project: {
        name: '',
        targetStartDate: '',
        targetEndDate: ''
      },
      updated: false
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

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, match, msgAlert } = this.props
    const { project } = this.state
    projectUpdate(match.params.id, project, user)
      .then(res => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Updated Successfully',
        message: 'Updated',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to update',
          message: 'Could not update with error:' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { project, updated } = this.state
    if (updated) {
      return <Redirect to={'/projects'} />
    }

    return (
      <div>
        <h3>Edit</h3>
        <ProjectForm
          project={project}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

export default withRouter(ProjectUpdate)
