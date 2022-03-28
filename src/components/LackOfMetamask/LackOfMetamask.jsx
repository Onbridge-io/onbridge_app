import React from 'react'

import {
  LackOfMetamask as LackOfMetamaskStyled,
  LackOfMetamaskHeading,
  LackOfMetamaskButton,
  LackOfMetamaskButtonLink,
} from './LackOfMetamask.module.scss'

function LackOfMetamask() {
  return (
    <div className={LackOfMetamaskStyled}>
      <h1 className={LackOfMetamaskHeading}>You need to install Metamask</h1>
      <button className={LackOfMetamaskButton}>
        <a
          target='_blank'
          className={LackOfMetamaskButtonLink}
          href='https://metamask.io/'
          rel='noreferrer'
        >
          Install
        </a>
      </button>
    </div>
  )
}

export default LackOfMetamask
