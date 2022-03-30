import classnames from 'classnames'
import { Button, Link } from '../../'
import {
  GalleryItem as GalleryItemStyled,
  GalleryItemPicture,
  GalleryItemInfo,
  GalleryItemInfoHead,
  GalleryItemInfoFoot,
  GalleryItemInfoFootDisabled,
  GalleryItemNetworkLogo,
  GalleryItemSpec,
  GalleryItemSpecLabel,
  GalleryItemSpecValue,
  GalleryItemSpecValueLink,
  GalleryItemButton,
  GalleryItemButtonDisabled,
} from './GalleryItem.module.scss'

import { shortenAddress } from '../../../utils/web3'
import Networks from '../../../networks.json'

const networksLogos = {
  42: '/img/networks-logos/mainnet.svg',
  97: '/img/networks-logos/BSC.svg',
  80001: '/img/networks-logos/polygon.svg',
}

export function GalleryItem({
  tokenId,
  owner,
  image,
  chainId: tokensChainId,
  skill,
  change,
  setCurrentItem,
  toggleModal,
  isShowing,
}) {
  const buttonClassNames = classnames(GalleryItemButton, {
    [GalleryItemButtonDisabled]: isShowing,
  })

  const itemClassNames = classnames(GalleryItemInfoFoot, {
    [GalleryItemInfoFootDisabled]: isShowing,
  })

  const blockExplorer = Networks[tokensChainId].blockExplorer

  return (
    <div className={GalleryItemStyled}>
      <img src={image} alt="Token" className={GalleryItemPicture} />
      <div className={GalleryItemInfo}>
        <div className={GalleryItemInfoHead}>
          OnBridge Pirate #{tokenId}
          <div className={GalleryItemNetworkLogo}>
            <img src={networksLogos[tokensChainId]} alt="Network" />
          </div>
        </div>
        <div className={GalleryItemInfoFoot}>
          <div className={GalleryItemSpec}>
            <div className={GalleryItemSpecLabel}>Character points:</div>
            <div className={GalleryItemSpecValue}>{skill}</div>
          </div>
        </div>
        <div className={itemClassNames}>
          <div className={GalleryItemSpec}>
            <div className={GalleryItemSpecLabel}>Owner:</div>
            <div className={GalleryItemSpecValue}>
              <Link
                className={GalleryItemSpecValueLink}
                target="_blank"
                href={`${blockExplorer}/address/${owner}`}
              >
                {shortenAddress(owner)}
              </Link>
            </div>
          </div>
        </div>
        <Button
          className={buttonClassNames}
          disabled={isShowing}
          onClick={() => {
            setCurrentItem({
              tokenId,
              owner,
              skill,
              change,
              tokensChainId,
              image,
            })
            toggleModal()
          }}
        >
          Bridge
        </Button>
      </div>
    </div>
  )
}
