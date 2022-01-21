import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { Button, Link } from '../../'
import {
  GalleryItem as GalleryItemStyled,
  GalleryItemText,
  GalleryItemPicture,
  GalleryItemInfo,
  GalleryItemInfoHead,
  GalleryItemInfoFoot,
  GalleryItemNetworkLogo,
  GalleryItemSpecsWrapper,
  GalleryItemSpec,
  GalleryItemSpecLabel,
  GalleryItemSpecValue,
  GalleryItemSpecValueLink,
  GalleryItemBridgeInfo,
} from './GalleryItem.module.scss'
import { shortenAddress } from '../../../utils/web3'
import { bridgeToken } from '../../../api/bridge'
import Networks from '../../../networks.json'
import { L1ChainId, debridgeHost } from '../../../constants'


const networksLogos = {
  1337: '/img/networks-logos/mainnet.png',
  1338: '/img/networks-logos/BSC.png',
}

export function GalleryItem({
  tokenId,
  owner,
  image,
  chainId: tokensChainId,
  skill,
  change,
  setChange
}) {
  const { chainId } = useWeb3React()
  const [pending, setPending] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState('Pending...');
  const [disableButtons, setDisableButtons] = useState(false);
  
  const blockExplorer = Networks[tokensChainId].blockExplorer
  const invertNetwork = Number(tokensChainId) === 1337 ? 'BSC' : 'ETH'

  const bridgeHandler = () => {
    setDisableButtons(true)
    bridgeToken(chainId, tokenId, setPending, setTransactionStatus, setChange, change, setDisableButtons)
  }

  const BridgeButton = () => {
    
    const bridgeButtonText = Number(L1ChainId) === Number(tokensChainId) ? 'Bridge to' : 'Withdraw to';
    return (
      <Button disabled={chainId !== tokensChainId || disableButtons} className={GalleryItemText} onClick={bridgeHandler}>
          {bridgeButtonText} {invertNetwork}
      </Button>
    )
  }

  return (
    <div className={GalleryItemStyled}>
      <img src={image} alt='Token' className={GalleryItemPicture} />
      <div className={GalleryItemInfo}>
        <div className={GalleryItemInfoHead}>Baby Battle Bot #{tokenId}</div>

        <div className={GalleryItemInfoFoot}>
          <div className={GalleryItemSpecsWrapper}>
            <div className={GalleryItemSpec}>
              <div className={GalleryItemSpecLabel}>Owner</div>
              <div className={GalleryItemSpecValue}>
                <Link
                  className={GalleryItemSpecValueLink}
                  target='_blank'
                  href={`${blockExplorer}/address/${owner}`}
                >
                  {shortenAddress(owner)}
                </Link>
              </div>
            </div>
            <div className={GalleryItemSpec}>
              <div className={GalleryItemSpecLabel}>Skill</div>
              <div className={GalleryItemSpecValue}>{skill}</div>
            </div>
          </div>
            <div className={GalleryItemBridgeInfo}>
            {pending ? (
              <div className={GalleryItemText}>{transactionStatus}</div>
            ) : (
              <BridgeButton />
            )}

            <div className={GalleryItemNetworkLogo}>
              <img src={networksLogos[tokensChainId]} alt='Network' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
