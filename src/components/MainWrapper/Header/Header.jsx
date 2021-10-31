import { Header as HeaderStyled } from './Header.module.scss'
import { Web3Status } from '../../'

export function Header() {
  return (
    <div className={HeaderStyled}>
      <img src='/img/logo.png' alt='OnBridge' />
      <Web3Status />
    </div>
  )
}
