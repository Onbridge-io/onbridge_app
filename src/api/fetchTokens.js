import axios from 'axios'

const host = process.env.REACT_APP_API_HOST

export function getTokensInfo(userStatus, userAccount) {
  return axios
    .get(!userStatus ? `${host}/tokens/` : `${host}/tokens/?owner=${userAccount}`)
    .then(response => {
      return response.data.results
    })
    .catch(error => {
      console.log(error)
    })
}
