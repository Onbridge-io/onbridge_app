import { ethers } from 'ethers'

import Networks from '../networks.json'

import L1TokenAbi from '../abis/L1Token.json'
import L1BridgeAbi from '../abis/L1Bridge.json'
import L2TokenAbi from '../abis/L2Token.json'
import L2BridgeAbi from '../abis/L2Bridge.json'

const L1TokenAddress = Networks[4].tokenAddress
const L1BridgeAddress = Networks[4].bridgeAddress
const L2TokenAddress = Networks[97].tokenAddress
const L2BridgeAddress = Networks[97].bridgeAddress

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const L1Token = new ethers.Contract(L1TokenAddress, L1TokenAbi, signer)
const L1Bridge = new ethers.Contract(L1BridgeAddress, L1BridgeAbi, signer)
const L2Token = new ethers.Contract(L2TokenAddress, L2TokenAbi, signer)
const L2Bridge = new ethers.Contract(L2BridgeAddress, L2BridgeAbi, signer)

const AddressZero = ethers.constants.AddressZero

const Contracts = {
  4: { Token: L1Token, Bridge: L1Bridge, BridgeAddress: L1BridgeAddress },
  97: { Token: L2Token, Bridge: L2Bridge, BridgeAddress: L2BridgeAddress },
}

export async function bridgeToken(chainId, tokenId, setPending) {
  console.log(chainId)

  const Token = Contracts[chainId].Token
  const Bridge = Contracts[chainId].Bridge
  const BridgeAddress = Contracts[chainId].BridgeAddress

  const signerAddress = await signer.getAddress()
  const allowance = (await Token.getApproved(tokenId)).toString()

  if (allowance === AddressZero) {
    setPending(true)
    Token.approve(BridgeAddress, tokenId)
      .then(tx => {
        tx.wait()
          .then(() => {
            Bridge.outboundTransfer(signerAddress, tokenId).then(tx => {
              tx.wait().then(() => {
                setPending(false)
              })
            })
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(() => {
        setPending(false)
      })

    return
  }

  setPending(true)
  Bridge.outboundTransfer(signerAddress, tokenId)
    .then(tx => {
      tx.wait().then(() => {
        setPending(false)
      })
    })
    .catch(() => {
      setPending(false)
    })
}
