import { Header as HeaderStyled } from './Header.module.scss'
import { Button } from '../../'

export function Header() {
  return (
    <div className={HeaderStyled}>
      <img src='/img/logo.png' alt='OnBridge' />
      <Button>Connect</Button>
    </div>
  )
}
