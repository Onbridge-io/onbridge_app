import axios from 'axios'
import { ethers } from 'ethers'
import Networks from '../networks.json'
import L1TokenAbi from '../abis/L1Token.json'

const host = process.env.REACT_APP_API_HOST

const BSCTokenAddress = Networks[97].tokenAddress

export let provider = null
let signer = null
let BSCToken = null

try {
  provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  signer = provider.getSigner()
  BSCToken = new ethers.Contract(BSCTokenAddress, L1TokenAbi, signer)
} catch (e) {
  console.log(e)
}

export async function mintToken(
  totalAmountOfTokens,
  setChange,
  setTransactionStatus,
) {
  const signerAddress = await signer.getAddress()
  BSCToken.mint(signerAddress)
    .then((tx) => {
      setTransactionStatus('Await tx mained..')
      tx.wait().then(() => {
        setTimeout(function testTokens() {
          axios
            .get(`${host}/tokens/?owner=${signerAddress}`)
            .then((response) => {
              if (response.data.count !== totalAmountOfTokens) {
                setChange((change) => !change)
                setTransactionStatus('Token added')
              } else {
                setTimeout(testTokens, 2000)
                setTransactionStatus('Token adding..')
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }, 1000)
      })
    })
    .catch((e) => {
      console.log(e)
      setTransactionStatus()
    })
}
