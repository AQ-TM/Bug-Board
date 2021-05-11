import axios from 'axios'
import apiUrl from '../apiConfig'

// Create
export const issueCreate = (issue, user, id) => {
  console.log(`user is: ${user} | issue is: ${issue}`)
  return axios({
    url: apiUrl + '/projects/' + id + '/issues',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { issue }
  })
}

export const issueIndex = (id) => {
  return axios({
    url: apiUrl + '/projects/' + id + '/view-issues',
    method: 'GET'
  })
}
