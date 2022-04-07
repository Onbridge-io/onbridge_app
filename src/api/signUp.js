import axios from 'axios'

const host = process.env.REACT_APP_CONTEST_API_HOST

export function signUp(params = {}) {
  const { account, chainId } = params
  const inviter = localStorage.getItem('referrer') || undefined

  return axios
    .post(`${host}/activities/`, {
      user: account,
      chainId,
      eventType: '0',
      inviter,
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}
