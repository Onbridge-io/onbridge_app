import {
  GalleryItem as GalleryItemStyled,
  GalleryItemPicture,
  GalleryItemInfo,
  GalleryItemNetworkLogo,
} from './GalleryItem.module.scss'

export function GalleryItem({ name, network, imageSrc }) {
  return (
    <div className={GalleryItemStyled}>
      <img src={imageSrc} alt='Token' className={GalleryItemPicture} />
      <div className={GalleryItemInfo}>
        {name}
        <div className={GalleryItemNetworkLogo}>
          <img src='/img/networks-logos/mainnet.png' alt='Mainnet' />
        </div>
      </div>
    </div>
  )
}
