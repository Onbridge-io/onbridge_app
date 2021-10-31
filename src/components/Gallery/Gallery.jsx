import {
  Gallery as GalleryStyled,
  GalleryHead,
  GalleryHeadTitle,
  GalleryHeadLogo,
  GalleryHeadCounter,
  GalleryGrid,
} from './Gallery.module.scss'
import { GalleryItem } from './GalleryItem/GalleryItem'

const fakeData = {
  contract: {
    logo: 'https://avatars.githubusercontent.com/u/45615063?s=200&v=4',
    name: 'Crypto Punks',
  },
  tokens: [
    {
      colectionName: 'Unofficial Punks',
      name: 'Cryptonatrix ',
      imageSrc:
        'https://lh3.googleusercontent.com/ZQG5lomHgYynSNFZwDFETow-i6BxtJ7AIb5AUHkjH-PbGHKpzEIq5J0g-ohtFeB-gvu2QTMBUkVo2aKS_GnzZc-X3nIWiRLVwzcpfw=w600',
      network: 'mainnet',
    },
  ],
}
const { contract, tokens } = fakeData

const tokensList = tokens.map(({ ...props }) => {
  return <GalleryItem {...props} />
})

export function Gallery() {
  return (
    <div className={GalleryStyled}>
      <div className={GalleryHead}>
        <div className={GalleryHeadTitle}>
          <img className={GalleryHeadLogo} src={contract.logo} alt='Logo' />
          {contract.name}
        </div>
        <div className={GalleryHeadCounter}>4 items</div>
      </div>

      <div className={GalleryGrid}>{tokensList}</div>
    </div>
  )
}
