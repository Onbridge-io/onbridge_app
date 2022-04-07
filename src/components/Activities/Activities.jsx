import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useWeb3React } from '@web3-react/core'
import { getActivitiesInfo } from '../../api/fetchActivities'
import Spinner from '../Spiner/Spiner'
import ActivityItem from './ActivityItem/ActivityItem'

import {
  ActivitiesContainer,
  ActivitiesWrapper,
  ActivitiesInfo,
  ActivitiesInfoText,
  ActivitiesTable,
  ActivitiesTableHeader,
  ActivitiesTableHeaderItem,
  ActivitiesTableHeaderItemLarge,
  ActivitiesTableHeaderItemMedium,
  ActivitiesTableHeaderItemSmall,
  ActivitiesTableHeaderItemExtraSmall,
  ActivitiesTableBody,
} from './Activities.module.scss'

function Activities() {
  const { account } = useWeb3React()
  const [activitiesList, setActivitiesList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMoreActivities, setHasMoreActivities] = useState(true)
  const [totalAmountOfTokens, setTotalAmountOfTokens] = useState()
  const fetchMoreActivities = () => {
    if (activitiesList.length >= totalAmountOfTokens) {
      setHasMoreActivities(false)
      return
    }

    getActivitiesInfo({
      page: currentPage + 1,
      account: account,
    })
      .then(({ results }) => {
        setCurrentPage((prev) => prev + 1)
        setActivitiesList((prevValue) => {
          return prevValue.concat(results)
        })
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (account) {
      setIsLoading(true)
      getActivitiesInfo({ account: account })
        .then((res) => {
          setCurrentPage(1)
          setIsLoading(false)
          setActivitiesList(res.results)
          setTotalAmountOfTokens(res.count)
          setHasMoreActivities(res.results.length < res.count)
        })
        .catch((err) => console.log(err))
    }
  }, [account])

  return (
    <>
      {!account ? (
        <div className={ActivitiesInfo}>
          <p className={ActivitiesInfoText}>
            Please connect your wallet to proceed
          </p>
        </div>
      ) : (
        <div className={ActivitiesContainer}>
          {isLoading ? (
            <div className={ActivitiesWrapper}>
              <Spinner />
            </div>
          ) : activitiesList.length > 0 ? (
            <div className={ActivitiesTable}>
              <ul className={ActivitiesTableHeader}>
                <li
                  className={`${ActivitiesTableHeaderItem} ${ActivitiesTableHeaderItemLarge}`}
                >
                  Network
                </li>
                <li
                  className={`${ActivitiesTableHeaderItem} ${ActivitiesTableHeaderItemMedium}`}
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
                <li
                  className={`${ActivitiesTableHeaderItem} ${ActivitiesTableHeaderItemExtraSmall}`}
                ></li>
              </ul>
              <div className={ActivitiesTableBody}>
                <InfiniteScroll
                  style={{ overflow: 'hidden' }}
                  dataLength={activitiesList.length}
                  next={fetchMoreActivities}
                  hasMore={hasMoreActivities}
                  loader={
                    <div className={ActivitiesWrapper}>
                      <Spinner />
                    </div>
                  }
                >
                  {activitiesList.map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      network={activity.chainId}
                      event={activity.eventType}
                      date={activity.creationTime}
                      reward={activity.reward}
                      tx={activity.tx}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          ) : (
            <div className={ActivitiesWrapper}>You have no activities</div>
          )}
        </div>
      )}
    </>
  )
}

export default Activities
