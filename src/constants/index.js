import NETWORKS from '../networks.json'

export const supportedChainIds = Object.keys(NETWORKS).map(id => Number(id))

export const L1ChainIds = [97]
export const L2ChainIds = [42, 80001]

export const L1ChainId = process.env.REACT_APP_L1_CHAIN_ID
export const L2ChainId = process.env.REACT_APP_L2_CHAIN_ID

export const debridgeHost = 'https://testnet.debridge.finance'
