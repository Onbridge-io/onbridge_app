import NETWORKS from '../networks.json'

export const supportedChainIds = Object.keys(NETWORKS).map(id => Number(id))
