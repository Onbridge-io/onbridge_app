import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Modal from '../TokenInfoPopUp/TokenInfoPopUp'
import Spinner from '../Spiner/Spiner'
import { getTokensInfo } from '../../api/fetchTokens'
import {
  Gallery as GalleryStyled,
  GalleryHead,
  GalleryHeadTitle,
  GalleryHeadLogo,
  GalleryHeadCounter,
  GalleryGrid,
  GalleryChainStatus,
  GallerySpinner,
} from './Gallery.module.scss'
import { GalleryItem } from './GalleryItem/GalleryItem'
import Filters from '../Filters/Filters'

import useModal from '../../utils/hooks/useModal'
import { Web3Status } from '..'

const fakeData = {
  contract: {
    logo: 'https://app.onbridge.io/img/favicon.ico',
    name: 'OnBridge Pirates',
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
  const [currentItem, setCurrentItem] = useState({
    change: true,
    owner: '0x5fCb8f7149E8aD03544157C90E6f81b26933d3a2',
    skill: 0,
    tokenId: 0,
    tokensChainId: 97,
    image: '',
  })
  const { isShowing, toggle } = useModal()

  return (
    <>
      {tokens &&
        tokens.map(({ tokenId, owner, image, chainId, skill }) => {
          return (
            <GalleryItem
              key={tokenId}
              tokenId={tokenId}
              owner={owner}
              image={image}
              chainId={chainId}
              skill={skill}
              change={change}
              setCurrentItem={setCurrentItem}
              toggleModal={toggle}
            />
          )
        })}
      <Modal
        isShowing={isShowing}
        hide={toggle}
        modalActive={isShowing}
        currentItem={currentItem}
        change={change}
        setChange={setChange}
      />
    </>
  )
}

export function Gallery() {
  const [tokensList, setTokensList] = useState([])
  const [change, setChange] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMoreTokens, setHasMoreTokens] = useState(true)
  const [totalAmountOfTokens, setTotalAmountOfTokens] = useState()

  const fetchMoreTokens = () => {
    if (tokensList.length >= totalAmountOfTokens) {
      setHasMoreTokens(false)
      return
    }

    getTokensInfo({
      page: currentPage + 1,
    })
      .then(({ results }) => {
        setCurrentPage((prev) => prev + 1)
        setTokensList((prevValue) => {
          return prevValue.concat(results)
        })
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getTokensInfo()
      .then((res) => {
        setCurrentPage(1)
        setTokensList(res.results)
        setTotalAmountOfTokens(res.count)
        setHasMoreTokens(res.results.length < res.count)
      })
      .catch((err) => console.log(err))
  }, [change])

  return (
    <>
      <Filters />
      <div className={GalleryStyled}>
        <Web3Status className={GalleryChainStatus} />
        <div className={GalleryHead}>
          <div className={GalleryHeadTitle}>
            <img className={GalleryHeadLogo} src={contract.logo} alt="Logo" />
            {contract.name}
          </div>
          <div className={GalleryHeadCounter}>
            {tokensList && totalAmountOfTokens} items
          </div>
        </div>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={tokensList.length}
          next={fetchMoreTokens}
          hasMore={hasMoreTokens}
          loader={
            <div className={GallerySpinner}>
              <Spinner />
            </div>
          }
        >
          <div className={GalleryGrid}>
            <TokensList
              tokens={tokensList}
              setChange={setChange}
              change={change}
            />
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}
