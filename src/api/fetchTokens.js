import axios from 'axios'

const host = process.env.REACT_APP_API_HOST

export function getTokensInfo(params = {}) {
  const { page, account, chains } = params
  const chainsId = {}
  Object.keys(chains).forEach((key) => {
    if (chains[key]) {
      chainsId[key] = chains[key]
    }
  })

  const pageParam = page ? `&page=${page}` : ''
  return axios
    .get(
      `${host}/tokens/?owner=${account}&chainId=${Object.keys(chainsId).join(
        ',',
      )}${pageParam}`,
    )
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}
