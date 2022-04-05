import { useWeb3React } from '@web3-react/core'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import CheckIcon from '@mui/icons-material/Check'
import classnames from 'classnames'
import { useCopyToClipboard } from '../../../utils/hooks/useCopyToClipboard'
import {
  Footer as FooterStyled,
  FooterIcons,
  FooterCoopyright,
  FooterLink,
  FooterLinkContainer,
  FooterLinkInput,
  FooterLinkButton,
  FooterLinkButtonSuccess,
} from './Footer.module.scss'

const host = window.location.origin

export function Footer() {
  const { account } = useWeb3React()
  const referralLink = `${host}/?referrer=${account}`

  const [
    referralLinkCopied,
    copyReferralLink,
    referralLinkRef,
  ] = useCopyToClipboard()

  const buttonClassNames = classnames(FooterLinkButton, {
    [FooterLinkButtonSuccess]: referralLinkCopied,
  })

  return (
    <div className={FooterStyled}>
      <div>
        <div className={FooterIcons}>
          <a
            href="https://medium.com/onbridge"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/img/medium.svg" alt="medium" />
          </a>
          <a
            href="https://twitter.com/onbridge_io"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/img/twitter.svg" alt="twitter" />
          </a>
          <a
            href="https://discord.com/invite/kcNqrgS7"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/img/discord.svg" alt="discord" />
          </a>
        </div>
        <div className={FooterCoopyright}>
          <p>Incubated by Binance. Supported by Polygon.</p>
          <div className={FooterLink}>
            Your Referral Link:
            <div className={FooterLinkContainer}>
              <input
                ref={referralLinkRef}
                className={FooterLinkInput}
                type="text"
                value={referralLink}
                readOnly
              />
              <button onClick={copyReferralLink} className={buttonClassNames}>
                {referralLinkCopied ? (
                  <CheckIcon style={{ color: '#44db77' }} fontSize="small" />
                ) : (
                  <FileCopyIcon fontSize="small" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
