import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { useWeb3React } from '@web3-react/core'

import { GalleryItem } from '../Gallery/GalleryItem/GalleryItem'
import { Button } from '..'
import { bridgeToken } from '../../api/bridge'
import { shortenAddress } from '../../utils/web3'

import networks from '../../networks.json'
import {
  ModalWrapper as ModalWrapperStyled,
  ModalOverlay,
  ModalBlock,
  ModalContent,
  ModalInfoTransfer,
  ModalChainTransferInfo,
  ModalChainBlock,
  ModalLoadingWrapper,
  ModalLoadingBlock,
  ModalLoadingStageBlock,
  ModalLoadingProcessText,
  ModalLoadingProcessSupprotText,
  ModalChainArrow,
  ModalCloseButton,
  ModalInfoApprove,
  ModalInfoApproveText,
  ModalApproveButton,
  ModalSuccessImg,
  ModalSuccessContainer,
  ModalCloseButtonItem,
  ModalOtherNetworks,
  ModalPrice,
  ModalPriceDescription,
} from './TokenInfoPopUp.module.scss'
import {
  NetworksMenuButton,
  NetworksMenuButtonContent,
} from '../Web3Status/Web3Status.module.scss'
import Spiner from '../Spiner/Spiner'

const networksLogos = {
  42: '/img/networks-logos/mainnet.svg',
  97: '/img/networks-logos/BSC.svg',
  80001: '/img/networks-logos/polygon.svg',
}

function Modal({
  isShowing,
  hide,
  modalActive,
  currentItem,
  change,
  setChange,
}) {
  const [, setPending] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState('Pending...')
  const [txLink, setTxLink] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [disableButtons, setDisableButtons] = useState(false)
  const { chainId } = useWeb3React()

  useEffect(() => {
    setTimeout(() => {
      if (modalActive) {
        hide()
        setDisableButtons(false)
        setConfirmed(false)
      }
      setConfirmed(false)
    }, 8000)
  }, [confirmed])

  const { allowedToTransferNetworks } = networks[currentItem.tokensChainId]
  const [bridgeCurrentItemId, setBridgeCurrentItemId] = useState()
  const [bridgeCurrentPrice, setBridgeCurrentPrice] = useState('')

  useEffect(() => {
    setBridgeCurrentItemId(allowedToTransferNetworks[0])
  }, [allowedToTransferNetworks])

  useEffect(() => {
    if (bridgeCurrentItemId) {
      setBridgeCurrentPrice(
        networks[currentItem.tokensChainId].brigingPrice[bridgeCurrentItemId]
          .value,
      )
    }
  }, [bridgeCurrentItemId])

  const linkToTxDetails =
    Number(currentItem.tokensChainId) === 42
      ? 'https://kovan.etherscan.io/tx/'
      : 'https://testnet.bscscan.com/tx/'

  const bridgeInfoChainText = networks[bridgeCurrentItemId]
    ? networks[bridgeCurrentItemId].longName
    : ''
  const bridgeHandler = () => {
    setDisableButtons(true)
    setIsLoading(true)
    bridgeToken(
      chainId,
      currentItem.tokenId,
      currentItem.tokensChainId,
      change,
      setChange,
      setDisableButtons,
      setPending,
      setTransactionStatus,
      setTxLink,
      setIsLoading,
      setConfirmed,
      bridgeCurrentItemId,
    )
  }

  const [showBridgeSwitcher, setShowBridgeSwitcher] = useState(false)
  const BridgeSwitcher = ({ items }) => {
    const listItems = items.map((item) => {
      return (
        <Button
          key={item}
          className={NetworksMenuButton}
          onClick={() => {
            setBridgeCurrentItemId(item)
          }}
        >
          <div className={NetworksMenuButtonContent}>
            <img
              src={networksLogos[item]}
              alt={networks[item].name}
              width={40}
              height={40}
            />
            <span>{networks[item].name}</span>
          </div>
        </Button>
      )
    })

    return <div className={ModalOtherNetworks}>{listItems}</div>
  }

  const InfoTransfer = () => {
    if (!isLoading && !confirmed) {
      return (
        <>
          <p>The token will be transferred to another network</p>
          <div className={ModalChainTransferInfo}>
            <div className={ModalChainBlock}>
              <img
                src={networksLogos[currentItem.tokensChainId]}
                alt={bridgeInfoChainText[currentItem.tokensChainId]}
              />
              <p>{networks[currentItem.tokensChainId].longName}</p>
            </div>
            <div className={ModalChainArrow}>
              <img src="/img/arrow.svg" alt="transfer-arrow" />
            </div>
            <div
              className={ModalChainBlock}
              onClick={() => {
                if (allowedToTransferNetworks.length > 1) {
                  setShowBridgeSwitcher(!showBridgeSwitcher)
                }
              }}
            >
              <img
                src={networksLogos[bridgeCurrentItemId]}
                alt={bridgeInfoChainText}
              />
              <p>{bridgeInfoChainText}</p>
              {showBridgeSwitcher && (
                <BridgeSwitcher items={allowedToTransferNetworks} />
              )}
            </div>
          </div>
          <div className={ModalInfoApprove}>
            <p className={ModalInfoApproveText}>
              Approve and bridging token to another network. The stages of
              bridging will be shown here.
            </p>
            <p className={ModalPrice}>
              {bridgeCurrentPrice}{' '}
              {networks[currentItem.tokensChainId].params.nativeCurrency.symbol}
            </p>
            <p className={ModalPriceDescription}>Price per translation</p>
            <p className={ModalInfoApproveText}>
              The amount payable is estimated. You will pay at least{' '}
              {bridgeCurrentPrice}{' '}
              {networks[currentItem.tokensChainId].params.nativeCurrency.symbol}{' '}
              or the transaction will be rolled back
            </p>
            <Button
              disabled={disableButtons || chainId !== currentItem.tokensChainId}
              onClick={bridgeHandler}
              className={ModalApproveButton}
            >
              {chainId !== currentItem.tokensChainId
                ? `Switch to the appropriate network (${
                    networks[currentItem.tokensChainId].name
                  })`
                : 'Approve'}
            </Button>
          </div>
        </>
      )
    } else if (isLoading && !confirmed) {
      return (
        <div className={ModalLoadingWrapper}>
          <div className={ModalLoadingBlock}>
            <Spiner />
            <div className={ModalLoadingStageBlock}>
              <span className={ModalLoadingProcessText}>
                {transactionStatus}{' '}
                <a href={linkToTxDetails + txLink}>{shortenAddress(txLink)}</a>
              </span>
              <p className={ModalLoadingProcessSupprotText}>
                The token is being transferred to another network.
              </p>
            </div>
          </div>
          <p>Confirm this operation in your wallet.</p>
        </div>
      )
    } else {
      return (
        <div className={ModalLoadingWrapper}>
          <div className={ModalSuccessContainer}>
            <img
              className={ModalSuccessImg}
              src="/img/success-transaction.svg"
              alt="Success"
            />

            <span className={ModalLoadingProcessText}>Successfully!</span>
            <p className={ModalLoadingProcessSupprotText}>
              The token is being transferred to another network.
            </p>
          </div>
        </div>
      )
    }
  }

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className={ModalOverlay} />
          <div
            className={ModalWrapperStyled}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className={ModalBlock}>
              <div className={ModalCloseButton}>
                <button
                  className={ModalCloseButtonItem}
                  disabled={isLoading}
                  data-dismiss="modal"
                  onClick={() => {
                    hide()
                    setDisableButtons(false)
                  }}
                >
                  <img src="/img/close-modal.svg" alt="close" />
                </button>
              </div>
              <div className={ModalContent}>
                <GalleryItem
                  tokenId={currentItem.tokenId}
                  owner={currentItem.owner}
                  image={currentItem.image}
                  chainId={currentItem.tokensChainId}
                  skill={currentItem.skill}
                  change={change}
                  isShowing={isShowing}
                />
                <div className={ModalInfoTransfer}>
                  <InfoTransfer />
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null
}

export default Modal
