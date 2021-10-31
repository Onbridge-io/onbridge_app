import { Button as ButtonStyled } from './Button.module.scss'

export function Button({ children, ...props }) {
  return (
    <button {...props} className={ButtonStyled}>
      {children}
    </button>
  )
}
