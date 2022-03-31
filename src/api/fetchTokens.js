import axios from 'axios'

const host = process.env.REACT_APP_API_HOST

export function getTokensInfo(params = {}) {
  const { page, chainId, account } = params
  const chainParam = chainId ? `&chainId=${chainId}` : ''
  const pageParam = page ? `&page=${page}` : ''
  return axios
    .get(`${host}/tokens/?owner=${account}${chainParam}${pageParam}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}
