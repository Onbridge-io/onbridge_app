import { useEffect } from 'react'
import { MainWrapper } from '../../components'
import LackOfMetamask from '../../components/LackOfMetamask/LackOfMetamask'
import { provider } from '../../api/bridge'
import LeaderboardComponent from '../../components/Leaderboard/Leaderboard'

export function Leaderboard({ currentPage, setCurrentPage }) {
  useEffect(() => {
    setCurrentPage('Leaderboard')
  }, [])
  return (
    <MainWrapper currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {provider ? <LeaderboardComponent /> : <LackOfMetamask></LackOfMetamask>}
    </MainWrapper>
  )
}
