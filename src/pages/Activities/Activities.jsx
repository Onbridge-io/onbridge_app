import { useEffect } from 'react'
import { MainWrapper } from '../../components'
import LackOfMetamask from '../../components/LackOfMetamask/LackOfMetamask'
import ActivitiesComponent from '../../components/Activities/Activities'
import { provider } from '../../api/bridge'

export function Activities({ currentPage, setCurrentPage }) {
  useEffect(() => {
    setCurrentPage('Activities')
  }, [])
  return (
    <MainWrapper currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {provider ? <ActivitiesComponent /> : <LackOfMetamask></LackOfMetamask>}
    </MainWrapper>
  )
}
