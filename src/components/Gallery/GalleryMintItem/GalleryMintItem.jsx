import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Spinner from '../../Spiner/Spiner'
import { mintToken } from '../../../api/mint'
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

export function GalleryMintItem({ chainId, totalAmountOfTokens, setChange }) {
  const [transactionStatus, setTransactionStatus] = useState()
  return (
    <div className={GalleryItemWrapper}>
      <div className={GalleryItemStyled}>
        <AddIcon className={GalleryItemPicture} sx={{ fill: '#7f8084' }} />
        <div className={GalleryItemButtonsContainer}>
          <Button
            className={GalleryItemButton}
            disabled={chainId !== 97 || transactionStatus}
            onClick={() => {
              setTransactionStatus('Await confirmation..')
              mintToken(totalAmountOfTokens, setChange, setTransactionStatus)
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
