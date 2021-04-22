import React from 'react'
import { Form } from 'react-bootstrap'

const ProjectForm = ({ project, handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Enter a name for your new project.</label>
      <textarea className="form-control"
        placeholder='Enter name here'
        name='name'
        value={project.name}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>What is your projects target start date?</label>
      <textarea className="form-control"
        placeholder='Enter start date here'
        name='targetStartDate'
        value={project.targetStartDate}
        onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label>What is your projects target end date?</label>
      <textarea className="form-control"
        placeholder='Enter end date here'
        name='targetEndDate'
        value={project.targetEndDate}
        onChange={handleChange}></textarea>
    </div>
    <button>Submit</button>
  </Form>
)

export default ProjectForm
