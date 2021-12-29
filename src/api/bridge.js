import { ethers } from 'ethers'

import Networks from '../networks.json'
import { L1ChainId, L2ChainId } from '../constants'

import L1TokenAbi from '../abis/L1Token.json'
import L1BridgeAbi from '../abis/L1Bridge.json'
import L2TokenAbi from '../abis/L2Token.json'
import L2BridgeAbi from '../abis/L2Bridge.json'

const L1TokenAddress = Networks[L1ChainId].tokenAddress
const L1BridgeAddress = Networks[L1ChainId].bridgeAddress
const L2TokenAddress = Networks[L2ChainId].tokenAddress
const L2BridgeAddress = Networks[L2ChainId].bridgeAddress

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const L1Token = new ethers.Contract(L1TokenAddress, L1TokenAbi, signer)
const L1Bridge = new ethers.Contract(L1BridgeAddress, L1BridgeAbi, signer)
const L2Token = new ethers.Contract(L2TokenAddress, L2TokenAbi, signer)
const L2Bridge = new ethers.Contract(L2BridgeAddress, L2BridgeAbi, signer)

const AddressZero = ethers.constants.AddressZero

const Contracts = {
  [L1ChainId]: {
    Token: L1Token,
    Bridge: L1Bridge,
    BridgeAddress: L1BridgeAddress,
  },
  [L2ChainId]: {
    Token: L2Token,
    Bridge: L2Bridge,
    BridgeAddress: L2BridgeAddress,
  },
}

export async function bridgeToken(chainId, tokenId, setPending) {
  const Token = Contracts[chainId].Token
  const Bridge = Contracts[chainId].Bridge
  const BridgeAddress = Contracts[chainId].BridgeAddress
  const fee = Networks[chainId].fee

  const signerAddress = await signer.getAddress()
  const allowance = (await Token.getApproved(tokenId)).toString()

  if (allowance === AddressZero) {
    setPending(true)
    Token.approve(BridgeAddress, tokenId)
      .then((tx) => {
        tx.wait()
          .then(() => {
            Bridge.outboundTransfer(signerAddress, tokenId, {
              value: fee,
            }).then((tx) => {
              tx.wait().then(() => {
                setPending(false)
              })
            })
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)

        setPending(false)
      })

    return
  }

  setPending(true)
  Bridge.outboundTransfer(signerAddress, tokenId, {
    value: fee,
  })
    .then((tx) => {
      tx.wait().then(() => {
        setPending(false)
      })
    })
    .catch((err) => {
      console.log(err)

      setPending(false)
    })
}
