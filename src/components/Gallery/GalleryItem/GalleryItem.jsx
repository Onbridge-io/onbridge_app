import {
  GalleryItem as GalleryItemStyled,
  GalleryItemPicture,
  GalleryItemInfo,
  GalleryItemInfoHead,
  GalleryItemInfoFoot,
  GalleryItemNetworkLogo,
  GalleryItemSpec,
  GalleryItemSpecLabel,
  GalleryItemSpecValue,
} from './GalleryItem.module.scss'
import { shortenAddress } from '../../../utils/web3'

const networksLogos = {
  4: '/img/networks-logos/mainnet.png',
  97: '/img/networks-logos/BSC.png',
}

export function GalleryItem({ tokenId, owner, image, chainId }) {
  return (
    <div className={GalleryItemStyled}>
      <img src={image} alt='Token' className={GalleryItemPicture} />
      <div className={GalleryItemInfo}>
        <div className={GalleryItemInfoHead}># {tokenId}</div>

        <div className={GalleryItemInfoFoot}>
          <div className={GalleryItemSpec}>
            <div className={GalleryItemSpecLabel}>Owner</div>
            <div className={GalleryItemSpecValue}>{shortenAddress(owner)}</div>
          </div>
          <div className={GalleryItemNetworkLogo}>
            <img src={networksLogos[chainId]} alt='Mainnet' />
          </div>
        </div>
      </div>
    </div>
  )
}
