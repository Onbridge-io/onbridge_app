import React from 'react'
import { getTimeFromTimeStamp } from '../../../utils/getTimeFromTimestamp'
import Networks from '../../../networks.json'

import {
  Activity,
  ActivityElement,
  ActivityElementImage,
  ActivityElementSmall,
  ActivityElementMedium,
  ActivityElementLarge,
  HiddenText,
} from './ActivityItem.module.scss'

const networksLogos = {
  42: '/img/networks-logos/mainnet.svg',
  97: '/img/networks-logos/BSC.svg',
  80001: '/img/networks-logos/polygon.svg',
}

function ActivityItem({ network, event, date, reward }) {
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
      <li className={`${ActivityElement} ${ActivityElementSmall}`}>{event}</li>
      <li className={`${ActivityElement} ${ActivityElementMedium}`}>
        {getTimeFromTimeStamp(date)}
      </li>
      <li className={`${ActivityElement} ${ActivityElementSmall}`}>
        {reward} ONB
      </li>
    </ul>
  )
}

export default ActivityItem
