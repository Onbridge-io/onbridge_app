import { MainWrapper } from '../../components'
import LackOfMetamask from '../../components/LackOfMetamask/LackOfMetamask'
import { provider } from '../../api/bridge'

export function Activities({ currentPage, setCurrentPage }) {
  return (
    <MainWrapper currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {provider ? <>Activities</> : <LackOfMetamask></LackOfMetamask>}
    </MainWrapper>
  )
}
