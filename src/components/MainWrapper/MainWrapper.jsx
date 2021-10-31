import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'

import {
  MainWrapper as MainWrapperStyled,
  MainWrapperContent,
} from './MainWrapper.module.scss'

export function MainWrapper({ children }) {
  return (
    <div className={MainWrapperStyled}>
      <Header />
      <div className={MainWrapperContent}>{children}</div>
      <Footer />
    </div>
  )
}
