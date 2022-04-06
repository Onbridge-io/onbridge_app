import React from 'react'
import ActivityItem from './ActivityItem/ActivityItem'

import {
  ActivitiesContainer,
  ActivitiesTable,
  ActivitiesTableHeader,
  ActivitiesTableHeaderItem,
  ActivitiesTableHeaderItemLarge,
  ActivitiesTableHeaderItemMedium,
  ActivitiesTableHeaderItemSmall,
  ActivitiesTableBody,
} from './Activities.module.scss'

function Activities() {
  return (
    <div className={ActivitiesContainer}>
      <div className={ActivitiesTable}>
        <ul className={ActivitiesTableHeader}>
          <li
            className={`${ActivitiesTableHeaderItem} ${ActivitiesTableHeaderItemLarge}`}
          >
            Network
          </li>
          <li
            className={`${ActivitiesTableHeaderItem} ${ActivitiesTableHeaderItemSmall}`}
          >
            Event
          </li>
          <li
            className={`${ActivitiesTableHeaderItem} ${ActivitiesTableHeaderItemMedium}`}
          >
            Date
          </li>
          <li
            className={`${ActivitiesTableHeaderItem} ${ActivitiesTableHeaderItemSmall}`}
          >
            Reward
          </li>
        </ul>
        <div className={ActivitiesTableBody}>
          {Array.from(Array(5)).map((_, index) => (
            <ActivityItem
              key={index}
              network="42"
              event="Bridge"
              date="1649238456"
              reward="10"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Activities
