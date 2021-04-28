import axios from 'axios'
import apiUrl from '../apiConfig'
// Create
export const projectCreate = (project, user) => {
  console.log(`user is: ${user} | project is: ${project}`)
  return axios({
    url: apiUrl + '/projects',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { project }
  })
}
// Read / Show
export const projectShow = (id, user) => {
  return axios({
    url: apiUrl + '/projects/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
// Read / Index
export const projectIndex = () => {
  return axios({
    url: apiUrl + '/projects',
    method: 'GET'
  })
}
