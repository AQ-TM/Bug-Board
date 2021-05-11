import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import IssueForm from '../IssueForm/IssueForm'
import { withRouter } from 'react-router-dom'
import { issueCreate } from '../../api/issues_api'

class IssueCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      issue: {
        summary: '',
        identifiedDate: '',
        targetResolutionDate: '',
        resolutionSummary: '',
        status: ''
      },
      createdIssueId: null
    }
  }
  handleChange = event => {
    event.persist()
    this.setState(state => {
      return {
        issue: { ...state.issue, [event.target.name]: event.target.value }
      }
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert, match } = this.props
    const { issue } = this.state
    console.log('this is the user: ' + user)
    issueCreate(issue, user, match.params.id)
      .then(res => this.setState({ createdIssueId: res.data._id }))
      .then(() => msgAlert({
        heading: 'Created successfully.',
        message: 'Showing created issue',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Sorry! Failed to create issue.',
          message: 'Could not create issue with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { issue } = this.state
    // if (createdProjectId) {
    //   return <Redirect to={`/projects/${createdProjectId}`} />
    // }
    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Create a Issue</h3>
          <IssueForm
            issue={issue}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}
export default withRouter(IssueCreate)
