import React, { Component } from 'react'
import { projectShow, projectDelete } from '../../api/project_api'
import { withRouter, Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import IssueIndex from '../IssueRoutes/IndexIssues'

const patchDelete = {
  display: 'flex',
  flexDirection: 'row'
}

class ProjectShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      project: null
    }
  }
  componentDidMount () {
    const { msgAlert, match, user } = this.props
    projectShow(match.params.id, user)
      .then(res => this.setState({ project: res.data.project }))
      .then(() => msgAlert({
        heading: 'Loaded project successfully',
        message: 'Viewing project',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Could not load project',
          message: 'Failed to project: ' + error.message,
          variant: 'danger'
        })
      })
  }
  deleteProject = () => {
    const { msgAlert, user, match } = this.props
    projectDelete(match.params.id, user)
      .then(res => {
        this.setState({ deleted: true })
      })
      .then(() => msgAlert({
        heading: 'Deleted Successfully',
        message: 'Deleted',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to delete',
          message: 'Could not delete with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { project } = this.state
    let firstProjectJsx = ''
    if (!project) {
      return (
        <Spinner variant='primary' animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    if (this.props.user && this.props.user._id === project.owner) {
      firstProjectJsx = (
        <div>
          <div className="col-12"><h2>Project Name: {project.name}</h2></div>
          <div style={patchDelete}>
            <button onClick={this.deleteProject} className="btn"><small className="text-muted"><Link to={'/'}>Delete</Link></small></button>
            <button className="btn"><small className="text-muted"><Link to={'/projects/' + this.props.match.params.id + '/edit/'}>Edit</Link></small></button>
            <button className="btn"><small className="text-muted"><Link to={'/projects/' + this.props.match.params.id + '/issues'}>Create Issue</Link></small></button>
          </div>
          <div className="col-12"><h3>Target Start Date: {project.targetStartDate.substring(0, 10)}</h3></div>
          <div className="col-12"><h3>Target End Date: {project.targetEndDate.substring(0, 10)}</h3></div>
        </div>
      )
    } else {
      firstProjectJsx = (
        <div>
          <div className="col-12"><h2>Project Name: {project.name}</h2></div>
          <div className="col-12"><h3>Target Start Date: {project.targetStartDate.substring(0, 10)}</h3></div>
          <div className="col-12"><h3>Target End Date: {project.targetEndDate.substring(0, 10)}</h3></div>
        </div>
      )
    }
    return (
      <div id="main-wrapper">
        <div id="project-issue-container">
          <div className="container__sidebar">
            <div className="sidebar">
              <div className="sidebar__intro">
                <div>{firstProjectJsx}</div>
              </div>
              <ul className="sidebar__menu">
                <li><a aria-current="page" className="" href="/">Project Info</a></li>
                <li><a href="/projects/:id/issues">Create issues</a></li>
              </ul>
            </div>
          </div>
          <div className="container__body">
            <IssueIndex />
            <div className="container__mobile-header">
              <div className="mobile-header">
                <div className="mobile-header__menu">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
export default withRouter(ProjectShow)
