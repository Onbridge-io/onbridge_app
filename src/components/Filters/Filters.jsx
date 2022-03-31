import { useState, useEffect, useCallback, useRef } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import classnames from 'classnames'
import Networks from '../../networks.json'
import { supportedChainIds } from '../../constants'
import { Button } from '../'
import {
  Filters as FiltersStyled,
  FiltersItem,
  FiltersChain,
  FiltersChainActive,
  FiltersItemMainButton,
  FiltersItemArrow,
  FiltersItemImage,
  FiltersMenu,
  FiltersMenuHidden,
  FiltersMenuList,
  FiltersMenuImage,
  FiltersMenuButton,
  FiltersMenuButtonContent,
} from './Filters.module.scss'
export default function Filters({ chainChecked, setChainChecked }) {
  const [chainListVisible, setChainListVisible] = useState(false)

  const chainMenuClassNames = classnames(FiltersMenu, {
    [FiltersMenuHidden]: !chainListVisible,
  })

  const filter = useRef(null)

  const networksLogos = {
    42: '/img/networks-logos/mainnet.svg',
    97: '/img/networks-logos/BSC.svg',
    80001: '/img/networks-logos/polygon.svg',
  }

  const handleCloseFilters = useCallback((event) => {
    if (
      !Array.from(filter.current.getElementsByTagName('*')).includes(
        event.target,
      )
    ) {
      setChainListVisible(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('click', handleCloseFilters)

    return () => {
      window.removeEventListener('click', handleCloseFilters)
    }
  }, [handleCloseFilters])

  return (
    <div className={FiltersStyled}>
      <div className={FiltersItem} ref={filter}>
        <button
          className={FiltersItemMainButton}
          onClick={() => {
            setChainListVisible(!chainListVisible)
          }}
        >
          <img
            src="/img/globus.svg"
            alt="chainImage"
            height="56"
            width="56"
            className={FiltersItemImage}
          />
          Select networks
          <img
            className={FiltersItemArrow}
            src="/img/chevron-down.svg"
            alt="Down"
          />
        </button>
        <div className={chainMenuClassNames}>
          <div className={FiltersMenuList}>
            {supportedChainIds.map((id) => {
              return (
                <Button
                  key={id}
                  onClick={() => {
                    setChainChecked((prevState) => {
                      return {
                        ...prevState,
                        [id]: !chainChecked[id],
                      }
                    })
                  }}
                  className={FiltersMenuButton}
                >
                  <div className={FiltersMenuButtonContent}>
                    <img
                      src={networksLogos[id]}
                      alt="networkLogo"
                      height="56"
                      width="56"
                      className={FiltersMenuImage}
                    />

                    <span>{Networks[id].name}</span>
                    <CheckIcon
                      className={` ${
                        chainChecked[id] ? FiltersChainActive : FiltersChain
                      }`}
                    />
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
