import { useEffect, useState } from 'react'

import { getTokensInfo } from '../../api/fetchTokens'
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
    name: 'Battleverse',
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
const { contract } = fakeData

function TokensList({ tokens, change, setChange }) {
  return (
    tokens &&
    tokens.map(({ token_id, owner, image, chain_id, skill }) => {
      return (
        <GalleryItem
          key={token_id}
          tokenId={token_id}
          owner={owner}
          image={image}
          chainId={chain_id}
          skill={skill}
          change={change}
          setChange={setChange}
        />
      )
    })
  )
}

export function Gallery() {
  const [tokensList, setTokensList] = useState([])
  const [change, setChange] = useState(true);

  useEffect(() => {
    getTokensInfo().then(res => {
      setTokensList(res)
    })
    console.log(change);
  }, [change])

  return (
    <div className={GalleryStyled}>
      <div className={GalleryHead}>
        <div className={GalleryHeadTitle}>
          <img className={GalleryHeadLogo} src={contract.logo} alt='Logo' />
          {contract.name}
        </div>
        <div className={GalleryHeadCounter}>
          {tokensList && tokensList.length} items
        </div>
      </div>

      <div className={GalleryGrid}>
        <TokensList tokens={tokensList} setChange={setChange} change={change} />
      </div>
    </div>
  )
}
