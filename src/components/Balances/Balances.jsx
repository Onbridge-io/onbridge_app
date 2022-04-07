import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import Networks from '../../networks.json'

import { BalancesContainer, BalancesSum } from './Balances.module.scss'

function Balances() {
  const { account, library, chainId } = useWeb3React()
  const [ethBalance, setEthBalance] = useState()

  useEffect(() => {
    if (library && account) {
      let stale = false

      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            setEthBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setEthBalance(null)
          }
        })

      return () => {
        stale = true
        setEthBalance(undefined)
      }
    }
  }, [library, account, chainId])

  return (
    <>
      {account ? (
        <div className={BalancesContainer}>
          Balance:
          <p className={BalancesSum}>
            {ethBalance &&
              parseFloat(ethers.utils.formatEther(ethBalance)).toPrecision(
                2,
              )}{' '}
            {Networks[chainId].params.nativeCurrency.symbol}
          </p>
          <p className={BalancesSum}>0.00 ONB</p>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default Balances
