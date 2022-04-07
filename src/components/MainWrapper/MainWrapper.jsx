import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import Balances from '../Balances/Balances'

import {
  MainWrapper as MainWrapperStyled,
  MainWrapperContent,
} from './MainWrapper.module.scss'

export function MainWrapper({ setCurrentPage, currentPage, children }) {
  return (
    <div className={MainWrapperStyled}>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Balances />
      <div className={MainWrapperContent}>{children}</div>
      <Footer />
    </div>
  )
}
