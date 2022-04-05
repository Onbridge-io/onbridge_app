import { Link } from 'react-router-dom'
import classnames from 'classnames'

import {
  Header as HeaderStyled,
  HeaderList,
  HeaderListItem,
  HeaderListItemActive,
  HeaderLogo,
  HeaderChainStatus,
} from './Header.module.scss'
import { Web3Status } from '../../'

export function Header({ currentPage, setCurrentPage }) {
  const mainClassNames = classnames(HeaderListItem, {
    [HeaderListItemActive]: currentPage === 'Main',
  })

  const activitiesClassNames = classnames(HeaderListItem, {
    [HeaderListItemActive]: currentPage === 'Activities',
  })

  const leaderboardClassNames = classnames(HeaderListItem, {
    [HeaderListItemActive]: currentPage === 'Leaderboard',
  })

  return (
    <div className={HeaderStyled}>
      <img className={HeaderLogo} src="/img/logo.svg" alt="OnBridge" />
      <ul className={HeaderList}>
        <Link
          to="/"
          className={mainClassNames}
          onClick={() => {
            setCurrentPage('Main')
          }}
        >
          My Wallet
        </Link>
        <Link
          to="/activities"
          className={activitiesClassNames}
          onClick={() => {
            setCurrentPage('Activities')
          }}
        >
          My activities
        </Link>
        <Link
          to="/leaderboard"
          className={leaderboardClassNames}
          onClick={() => {
            setCurrentPage('Leaderboard')
          }}
        >
          Leaderboard
        </Link>
      </ul>
      <Web3Status className={HeaderChainStatus} />
    </div>
  )
}
