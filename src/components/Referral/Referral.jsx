import { useWeb3React } from '@web3-react/core'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import CheckIcon from '@mui/icons-material/Check'
import classnames from 'classnames'
import { useCopyToClipboard } from '../../utils/hooks/useCopyToClipboard'

import {
  ReferralLink,
  ReferralLinkContainer,
  ReferralLinkInput,
  ReferralLinkButton,
  ReferralLinkButtonSuccess,
} from './Referral.module.scss'

const host = window.location.origin

function Referral() {
  const { account } = useWeb3React()
  const referralLink = `${host}/?referrer=${account}`

  const [
    referralLinkCopied,
    copyReferralLink,
    referralLinkRef,
  ] = useCopyToClipboard()

  const buttonClassNames = classnames(ReferralLinkButton, {
    [ReferralLinkButtonSuccess]: referralLinkCopied,
  })

  return (
    <div className={ReferralLink}>
      Your Referral Link:
      <div className={ReferralLinkContainer}>
        <input
          ref={referralLinkRef}
          className={ReferralLinkInput}
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
  )
}

export default Referral
