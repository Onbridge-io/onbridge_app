import classnames from 'classnames'
import { useWeb3React } from '@web3-react/core'
import { Button } from '../../'
import {
  GalleryItem as GalleryItemStyled,
  GalleryItemWrapper,
  GalleryItemWrapperActive,
  GalleryItemPicture,
  GalleryItemInfo,
  GalleryItemInfoHead,
  GalleryItemNetworkLogo,
  GalleryItemButton,
  GalleryItemButtonInfo,
  GalleryItemButtonDisabled,
  GalleryItemButtonsContainer,
} from './GalleryItem.module.scss'

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
  const { account } = useWeb3React()
  const { allowedToTransferNetworks } = Networks[tokensChainId]
  const buttonClassNames = classnames(GalleryItemButton, {
    [GalleryItemButtonDisabled]: isShowing,
  })

  const wrapperClassNames = classnames(GalleryItemWrapper, {
    [GalleryItemWrapperActive]: account === owner,
  })

  return (
    <div className={wrapperClassNames}>
      <div className={GalleryItemStyled}>
        <img src={image} alt="Token" className={GalleryItemPicture} />
        <div className={GalleryItemInfo}>
          <div className={GalleryItemInfoHead}>
            OnBridge Pirate #{tokenId}
            <div className={GalleryItemNetworkLogo}>
              <img src={networksLogos[tokensChainId]} alt="Network" />
            </div>
          </div>
        </div>
        <div className={GalleryItemButtonsContainer}>
          {allowedToTransferNetworks.map((item) => {
            return (
              <Button
                key={item}
                className={buttonClassNames}
                onClick={() => {
                  setCurrentItem({
                    tokenId,
                    owner,
                    skill,
                    change,
                    tokensChainId,
                    image,
                    transferChainId: item,
                  })
                  toggleModal()
                }}
              >
                Bridge to {Networks[item].name}
                <span className={GalleryItemButtonInfo}>
                  +{Networks[tokensChainId].rewardPrice[item]} ONB
                </span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
