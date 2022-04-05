import { MainWrapper } from '../../components'
import LackOfMetamask from '../../components/LackOfMetamask/LackOfMetamask'
import { provider } from '../../api/bridge'

export function Leaderboard({ currentPage, setCurrentPage }) {
  return (
    <MainWrapper currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {provider ? <>Leaderboard</> : <LackOfMetamask></LackOfMetamask>}
    </MainWrapper>
  )
}
