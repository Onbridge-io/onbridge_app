import { MainWrapper, Gallery } from '../../components'
import LackOfMetamask from '../../components/LackOfMetamask/LackOfMetamask'
import { provider } from '../../api/bridge'

export function Main() {
  return (
    <MainWrapper>
      {provider ? <Gallery /> : <LackOfMetamask></LackOfMetamask>}
    </MainWrapper>
  )
}
