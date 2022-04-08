import React, { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Spinner from '../../Spiner/Spiner'
import { mintToken } from '../../../api/mint'
import { switchNetwork } from '../../../utils/web3'
import { L1ChainIds } from '../../../constants'
import { Button } from '../..'
import {
  GalleryItem as GalleryItemStyled,
  GalleryItemNetwork,
  GalleryItemWrapper,
  GalleryItemPicture,
  GalleryItemButton,
  GalleryItemButtonInfo,
  GalleryItemButtonsContainer,
} from './GalleryMintItem.module.scss'

export function GalleryMintItem({
  chainId,
  account,
  totalAmountOfTokens,
  setChange,
}) {
  const [transactionStatus, setTransactionStatus] = useState()
  const [changeNet, setChangeNet] = useState(false)

  useEffect(() => {
    if (L1ChainIds.includes(chainId) && changeNet) {
      setTransactionStatus('Await confirmation..')
      mintToken(
        totalAmountOfTokens,
        setChange,
        setTransactionStatus,
        account,
        chainId,
      )
    }
  }, [chainId])

  return (
    <div className={GalleryItemWrapper}>
      <div className={GalleryItemStyled}>
        <AddIcon className={GalleryItemPicture} sx={{ fill: '#7f8084' }} />
        <div className={GalleryItemButtonsContainer}>
          <Button
            className={GalleryItemButton}
            disabled={transactionStatus}
            onClick={() => {
              if (!L1ChainIds.includes(chainId)) {
                switchNetwork(L1ChainIds[0]).then(() => {
                  setChangeNet(true)
                })
              } else {
                setTransactionStatus('Await confirmation..')
                mintToken(
                  totalAmountOfTokens,
                  setChange,
                  setTransactionStatus,
                  account,
                  chainId,
                )
              }
            }}
          >
            {transactionStatus ? (
              <>
                {transactionStatus}
                <div>
                  <Spinner width="20px" height="20px" />
                </div>
              </>
            ) : (
              <>
                Mint new
                <span className={GalleryItemButtonInfo}>+5 ONB</span>
                <img
                  src="/img/networks-logos/BSC.svg"
                  alt="BSC"
                  className={GalleryItemNetwork}
                />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
