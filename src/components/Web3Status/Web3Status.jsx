import { useState, useEffect } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import classnames from 'classnames'

import Networks from '../../networks.json'
import { supportedChainIds } from '../../constants'
import {
  Web3Status as Web3StatusStyled,
  Web3StatusAddressWrapper,
  Web3StatusAddress,
  Web3StatusHolder,
  NetworksMenu,
  NetworksMenuImage,
  NetworksMenuImageHidden,
  NetworksMenuTitle,
  NetworksMenuHidden,
  NetworksMenuTranslated,
  NetworksMenuWrapper,
  NetworksMenuList,
  NetworksMenuButton,
  NetworksMenuButtonActive,
  NetworksMenuButtonContent,
  NetworksMenuMainButton,
  NetworksMenuArrow,
} from './Web3Status.module.scss'
import { injected } from '../../utils/web3/connectors'
import { useEagerConnect, useInactiveListener } from '../../utils/web3/hooks'
import { shortenAddress, switchNetwork } from '../../utils/web3'
import { Button } from '../'

const connectorsByName = {
  Injected: {
    text: 'Connect',
    connector: injected,
  },
}

const networksLogos = {
  42: '/img/networks-logos/mainnet.svg',
  97: '/img/networks-logos/BSC.svg',
  80001: '/img/networks-logos/polygon.svg',
}

function NetworkSwitcher() {
  const { error, chainId } = useWeb3React()
  const [menuIsVisible, setMenuIsVidible] = useState(false)
  const wrongNetwork = error instanceof UnsupportedChainIdError

  const imageClassNames = classnames(NetworksMenuImage, {
    [NetworksMenuImageHidden]: wrongNetwork,
  })

  const menuClassNames = classnames(NetworksMenu, {
    [NetworksMenuHidden]: !menuIsVisible,
    [NetworksMenuTranslated]: wrongNetwork,
  })

  const selectButtonText = wrongNetwork
    ? 'Wrong Network'
    : Networks[chainId].name

  return (
    <div className={NetworksMenuWrapper}>
      <button
        className={NetworksMenuMainButton}
        onClick={() => {
          setMenuIsVidible(!menuIsVisible)
        }}
      >
        <img
          src={networksLogos[chainId]}
          alt='chainImage'
          height='24'
          width='24'
          className={imageClassNames}
        />
        {selectButtonText}
        <img
          className={NetworksMenuArrow}
          src='/img/chevron-down.svg'
          alt='Down'
        />
      </button>
      <div className={menuClassNames}>
        <div className={NetworksMenuTitle}>Select network</div>

        <div className={NetworksMenuList}>
          {supportedChainIds.map(id => {
            if (chainId === id) {
              return (
                <Button
                  key={id}
                  onClick={() => {
                    switchNetwork(id)
                  }}
                  className={(NetworksMenuButton, NetworksMenuButtonActive)}
                >
                  <div className={NetworksMenuButtonContent}>
                    <img
                      src={networksLogos[id]}
                      alt={Networks[id].name}
                      height='24'
                      width='24'
                    />
                    <span>{Networks[id].name}</span>
                  </div>
                  <img src='/img/active-network-ind.svg' alt='active-network' />
                </Button>
              )
            }

            return (
              <Button
                key={id}
                onClick={() => {
                  switchNetwork(id)
                }}
                className={NetworksMenuButton}
              >
                <div className={NetworksMenuButtonContent}>
                  <img
                    src={networksLogos[id]}
                    alt={Networks[id].name}
                    height='24'
                    width='24'
                  />
                  <span>{Networks[id].name}</span>
                </div>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function Web3Status({ ...props }) {
  const { connector, account, activate, deactivate, error } = useWeb3React()
  const wrongNetwork = error instanceof UnsupportedChainIdError

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  const address = account && (
    <>
      <div className={Web3StatusHolder}>
        <span className={Web3StatusAddress}>{shortenAddress(account)}</span>
      </div>
    </>
  )

  const StatusContent = () => {
    const TryAgain = () => (
      <Button
        onClick={() => {
          if (connector === injected) {
            deactivate()
          }
        }}
      >
        Try again
      </Button>
    )

    if (connector === injected) {
      if (error && !wrongNetwork) {
        return <TryAgain />
      }

      return <NetworkSwitcher />
    }

    return Object.keys(connectorsByName).map(name => {
      const currentConnector = connectorsByName[name].connector
      const connected = currentConnector === connector
      const disabled =
        !triedEager || !!activatingConnector || connected || !!error

      const connectFunction = () => {
        setActivatingConnector.call(this, currentConnector)
        activate.call(this, connectorsByName[name].connector)
      }

      return (
        <Button disabled={disabled} key={name} onClick={connectFunction}>
          {connectorsByName[name].text}
        </Button>
      )
    })
  }

  return (
    <div className={Web3StatusStyled} {...props}>
      <StatusContent />
      <div className={Web3StatusAddressWrapper}>{address}</div>
    </div>
  )
}
