import { useState, useEffect, useCallback, useRef } from 'react'
import classnames from 'classnames'
import Networks from '../../networks.json'
import { supportedChainIds, L1ChainIds, L2ChainIds } from '../../constants'
import { Button } from '../'
import {
  Filters as FiltersStyled,
  FiltersItem,
  FiltersItemMainButton,
  FiltersItemArrow,
  FiltersItemImage,
  FiltersMenu,
  FiltersArrows,
  FiltersMenuHidden,
  FiltersMenuList,
  FiltersMenuImage,
  FiltersMenuButton,
  FiltersMenuButtonContent,
} from './Filters.module.scss'
export default function Filters() {
  const [firstChainMenuVisible, setFirstChainVisible] = useState(false)
  const [secondChainMenuVisible, setSecondChainVisible] = useState(false)

  const [firstFilterChain, setFirstFilterChain] = useState(L1ChainIds[0])
  const [secondFilterChain, setSecondFilterChain] = useState(L2ChainIds[0])

  const firstChainMenuClassNames = classnames(FiltersMenu, {
    [FiltersMenuHidden]: !firstChainMenuVisible,
  })
  const secondChainMenuClassNames = classnames(FiltersMenu, {
    [FiltersMenuHidden]: !secondChainMenuVisible,
  })

  const firstFilter = useRef(null)
  const secondFilter = useRef(null)

  const networksLogos = {
    42: '/img/networks-logos/mainnet.svg',
    97: '/img/networks-logos/BSC.svg',
    80001: '/img/networks-logos/polygon.svg',
  }

  const handleCloseFirstFilter = useCallback(event => {
    if (
      !Array.from(firstFilter.current.getElementsByTagName('*')).includes(
        event.target
      )
    ) {
      setFirstChainVisible(false)
    }
  }, [])
  const handleCloseSecondFilter = useCallback(event => {
    if (
      !Array.from(secondFilter.current.getElementsByTagName('*')).includes(
        event.target
      )
    ) {
      setSecondChainVisible(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('click', handleCloseFirstFilter)
    window.addEventListener('click', handleCloseSecondFilter)
    return () => {
      window.removeEventListener('click', handleCloseFirstFilter)
      window.removeEventListener('click', handleCloseSecondFilter)
    }
  }, [handleCloseFirstFilter, handleCloseSecondFilter])

  useEffect(() => {
    if (
      L1ChainIds.includes(firstFilterChain) &&
      L1ChainIds.includes(secondFilterChain)
    ) {
      setSecondFilterChain(L2ChainIds[0])
    } else if (
      L2ChainIds.includes(firstFilterChain) &&
      L2ChainIds.includes(secondFilterChain)
    ) {
      setSecondFilterChain(L1ChainIds[0])
    }
  }, [firstFilterChain, secondFilterChain])
  return (
    <div className={FiltersStyled}>
      <div className={FiltersItem} ref={firstFilter}>
        <button
          className={FiltersItemMainButton}
          onClick={() => {
            setFirstChainVisible(!firstChainMenuVisible)
          }}
        >
          <img
            src={networksLogos[firstFilterChain]}
            alt='chainImage'
            height='56'
            width='56'
            className={FiltersItemImage}
          />
          {Networks[firstFilterChain].name}

          <img
            className={FiltersItemArrow}
            src='/img/chevron-down.svg'
            alt='Down'
          />
        </button>
        <div className={firstChainMenuClassNames}>
          <div className={FiltersMenuList}>
            {supportedChainIds.map(id => {
              return (
                <Button
                  key={id}
                  onClick={() => {
                    setFirstFilterChain(id)
                    setFirstChainVisible(false)
                  }}
                  className={FiltersMenuButton}
                >
                  <div className={FiltersMenuButtonContent}>
                    <img
                      src={networksLogos[id]}
                      alt='networkLogo'
                      height='56'
                      width='56'
                      className={FiltersMenuImage}
                    />
                    <span>{Networks[id].name}</span>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
      <img
        src='/img/arrows.svg'
        alt='arrows'
        height='24'
        width='30'
        className={FiltersArrows}
      />
      <div className={FiltersItem} ref={secondFilter}>
        <button
          className={FiltersItemMainButton}
          onClick={() => {
            setSecondChainVisible(!secondChainMenuVisible)
          }}
        >
          <img
            src={networksLogos[secondFilterChain]}
            alt='chainImage'
            height='56'
            width='56'
            className={FiltersItemImage}
          />
          {Networks[secondFilterChain].name}

          <img
            className={FiltersItemArrow}
            src='/img/chevron-down.svg'
            alt='Down'
          />
        </button>
        <div className={secondChainMenuClassNames}>
          <div className={FiltersMenuList}>
            {L1ChainIds.includes(firstFilterChain)
              ? L2ChainIds.map(id => {
                  return (
                    <Button
                      key={id}
                      onClick={() => {
                        setSecondFilterChain(id)
                        setSecondChainVisible(false)
                      }}
                      className={FiltersMenuButton}
                    >
                      <div className={FiltersMenuButtonContent}>
                        <img
                          src={networksLogos[id]}
                          alt='networkLogo'
                          height='56'
                          width='56'
                          className={FiltersMenuImage}
                        />
                        <span>{Networks[id].name}</span>
                      </div>
                    </Button>
                  )
                })
              : L1ChainIds.map(id => {
                  return (
                    <Button
                      key={id}
                      onClick={() => {
                        setSecondFilterChain(id)
                      }}
                      className={FiltersMenuButton}
                    >
                      <div className={FiltersMenuButtonContent}>
                        <img
                          src={networksLogos[id]}
                          alt='networkLogo'
                          height='56'
                          width='56'
                          className={FiltersMenuImage}
                        />
                        <span>{Networks[id].name}</span>
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
