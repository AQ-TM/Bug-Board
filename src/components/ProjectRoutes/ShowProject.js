import React, { Component, Fragment } from 'react'
import { projectShow } from '../../api/project_api'
import { withRouter } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

class ProjectShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      project: null
    }
  }
  componentDidMount () {
    const { msgAlert, match } = this.props
    projectShow(match.params.id)
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
  // deleteJournal = () => {
  //   const { msgAlert, user, match } = this.props
  //   journalDelete(match.params.id, user)
  //     .then(res => {
  //       this.setState({ deleted: true })
  //     })
  //     .then(() => msgAlert({
  //       heading: 'Deleted Journal Successfully',
  //       message: 'Journal Deleted',
  //       variant: 'success'
  //     }))
  //     .catch(error => {
  //       msgAlert({
  //         heading: 'Failed to delete journal',
  //         message: 'Could not delete journal with error:' + error.message,
  //         variant: 'danger'
  //       })
  //     })
  // }
  render () {
    const { project } = this.state
    let projectJsx = ''
    if (!project) {
      return (
        <Spinner variant='primary' animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    } else if (project) {
      projectJsx = (
        <Fragment>
          <h2>Project Name: {project.name}</h2>
          <h3>Target Start Date: {project.targetStartDate.substring(0, 10)}</h3>
          <h3>Target End Date: {project.targetEndDate.substring(0, 10)}</h3>
          {/* <button><Link to={'/journal/' + this.props.match.params.id + '/edit/'}>Update Entry</Link></button> */}
          {/* <button onClick={this.deleteJournal}><Link to={'/'}>Delete</Link></button> */}
        </Fragment>
      )
    }
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          {projectJsx}
        </div>
      </div>
    )
  }
}
export default withRouter(ProjectShow)
