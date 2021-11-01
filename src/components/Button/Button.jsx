import classnames from 'classnames'

import { Button as ButtonStyled, ButtonDisabled } from './Button.module.scss'

export function Button({ className, children, disabled, onClick, ...props }) {
  const classNames = classnames(ButtonStyled, className, {
    [ButtonDisabled]: disabled,
  })

  return (
    <button
      className={classNames}
      onClick={() => !disabled && onClick()}
      {...props}
    >
      {children}
    </button>
  )
}
