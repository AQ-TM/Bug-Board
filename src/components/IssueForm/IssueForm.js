import React from 'react'

const IssueForm = ({ issue, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label></label>
      <textarea className="form-control"
        placeholder='Enter Summary'
        name='summary'
        value={issue.summary}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label></label>
      <textarea className="form-control"
        placeholder='Enter Identified Date'
        name='identifiedDate'
        value={issue.identifiedDate}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label></label>
      <textarea className="form-control"
        placeholder='Enter Target Resolution Date'
        name='targetResolutionDate'
        value={issue.targetResolutionDate}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label></label>
      <textarea className="form-control"
        placeholder='Enter Resolution Summary'
        name='resolutionSummary'
        value={issue.resolutionSummary}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label></label>
      <textarea className="form-control"
        placeholder='Enter Status'
        name='status'
        value={issue.status}
        onChange={handleChange}
      />
    </div>
    <button>Submit</button>
  </form>
)
export default IssueForm
