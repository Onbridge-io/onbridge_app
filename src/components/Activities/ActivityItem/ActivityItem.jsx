import React from 'react'
import { getTimeFromTimeStamp } from '../../../utils/getTimeFromTimestamp'
import Networks from '../../../networks.json'

import {
  Activity,
  ActivityLink,
  ActivityElement,
  ActivityElementImage,
  ActivityElementSmall,
  ActivityElementExtraSmall,
  ActivityElementMedium,
  ActivityElementLarge,
  HiddenText,
} from './ActivityItem.module.scss'

const networksLogos = {
  42: '/img/networks-logos/mainnet.svg',
  97: '/img/networks-logos/BSC.svg',
  80001: '/img/networks-logos/polygon.svg',
}

const eventStatuses = {
  0: 'SIGN UP',
  1: 'INVITEE SIGNED UP',
  2: 'BRIDGE',
  3: 'MINT',
}

function ActivityItem({ network, event, date, reward, tx }) {
  return (
    <ul className={Activity}>
      <li className={`${ActivityElement} ${ActivityElementLarge}`}>
        <img
          className={ActivityElementImage}
          src={networksLogos[network]}
          alt={Networks[network].name}
          width="40"
          height="40"
        />
        <span className={HiddenText}>{Networks[network].longName}</span>
      </li>
      <li className={`${ActivityElement} ${ActivityElementMedium}`}>
        {eventStatuses[event]}
      </li>
      <li className={`${ActivityElement} ${ActivityElementMedium}`}>
        {getTimeFromTimeStamp(date)}
      </li>
      <li className={`${ActivityElement} ${ActivityElementSmall}`}>
        {reward} ONB
      </li>
      <li className={`${ActivityElement} ${ActivityElementExtraSmall}`}>
        {tx ? (
          <a
            className={ActivityLink}
            target="_blank"
            rel="noreferrer"
            href={`${Networks[network].blockExplorer}${tx}`}
          >
            TX
          </a>
        ) : (
          ''
        )}
      </li>
    </ul>
  )
}

export default ActivityItem
