import axios from 'axios'

const host = process.env.REACT_APP_CONTEST_API_HOST

export function getActivitiesInfo(params = {}) {
  const { page, account } = params

  const pageParam = page ? `&page=${page}` : ''
  return axios
    .get(`${host}/activities/?user=${account}${pageParam}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}
