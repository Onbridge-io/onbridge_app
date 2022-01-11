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
} from './GalleryItem.module.scss'
import { shortenAddress } from '../../../utils/web3'
import { bridgeToken } from '../../../api/bridge'
import Networks from '../../../networks.json'
import { L1ChainId, L2ChainId, debridgeHost } from '../../../constants'

const networksLogos = {
  [L1ChainId]: '/img/networks-logos/mainnet.png',
  [L2ChainId]: '/img/networks-logos/BSC.png',
}

export function GalleryItem({
  tokenId,
  owner,
  image,
  chainId: tokensChainId,
  skill,
}) {
  const { chainId } = useWeb3React()
  const [pending, setPending] = useState(false)
  const [txHash, setTxHash] = useState('')

  const blockExplorer = Networks[tokensChainId].blockExplorer
  const invertNetwork = Number(tokensChainId) === Number(L1ChainId) ? 'BSC' : 'ETH'

  const bridgeHandler = () => {
    bridgeToken({ chainId, tokenId, setPending, setTxHash })
  }

  const BridgeButton = () => {
    if (Number(chainId) === Number(tokensChainId)) {
      return (
        <Button className={GalleryItemText} onClick={bridgeHandler}>
          Bridge to {invertNetwork}
        </Button>
      )
    }

    return (
      <Button disabled className={GalleryItemText}>
        Withdraw to {invertNetwork}
      </Button>
    )
  }

  // const BridgeImage = () => {
  //   if (Number(chainId) === Number(tokensChainId)) {
  //     return (
  //       <div className={GalleryItemNetworkLogo}>
  //           <img src={networksLogos[L1ChainId]} alt='Network' />
  //         </div>
  //     )
  //   }

  //   return (
  //     <div className={GalleryItemNetworkLogo}>
  //           <img src={networksLogos[L1ChainId]} alt='Network' />
  //         </div>
  //   )
  // }

  // console.log(tokensChainId);
  // console.log(invertNetwork);
  // console.log(L1ChainId)
  console.log(chainId);
  

  
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

          {pending ? (
            <div className={GalleryItemText}>
              <span>Pending...</span>
              {txHash && (
                <>
                  <span>
                    Explorer:{' '}
                    <Link
                      className={GalleryItemSpecValueLink}
                      target='_blank'
                      href={`${blockExplorer}/tx/${txHash}`}
                    >
                      {shortenAddress(txHash)}
                    </Link>
                  </span>
                  <span>
                    Debridge:{' '}
                    <Link
                      className={GalleryItemSpecValueLink}
                      target='_blank'
                      href={`${debridgeHost}/transaction?tx=${txHash}&chainId=${chainId}`}
                    >
                      {shortenAddress(txHash)}
                    </Link>
                  </span>{' '}
                </>
              )}
            </div>
          ) : (
            <BridgeButton />
          )}

          <div className={GalleryItemNetworkLogo}>
            <img src={networksLogos[tokensChainId]} alt='Network' />
          </div>
        </div>
      </div>
    </div>
  )
}
