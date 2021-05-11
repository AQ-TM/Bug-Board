import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { issueIndex } from '../../api/issues_api'

class IssueIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      issues: []
    }
  }
  componentDidMount () {
    const { msgAlert, match } = this.props
    issueIndex(match.params.id)
      .then(res => this.setState({ issues: res.data }))
      .then(() => msgAlert({
        heading: 'Loaded!',
        message: 'All issues ',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load!',
          message: 'The issues have an error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { issues } = this.state
    if (issues.length === 0) {
      return (
        <h2>You have no issues, go create one to view it here.</h2>
      )
    }
    const issueJsx = issues.map(issue => (
      <div className="card" key={issue._id}>
        <div className="card-body">
          <h4 className="card-title">{issue.summary}</h4>
          <p className="card-text">{issue.username}</p>
          <p className="card-text">{issue.identifiedDate}</p>
          <p className="card-text">{issue.targetResolutionDate}</p>
          <p className="card-text">{issue.lastModifiedDate}</p>
          <p className="card-text">{issue.status}</p>
        </div>
      </div>
    ))
    return (
      <div>
        {issueJsx}
      </div>
    )
  }
}
export default withRouter(IssueIndex)
