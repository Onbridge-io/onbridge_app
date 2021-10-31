import classnames from 'classnames'

import { Button as ButtonStyled } from './Button.module.scss'

export function Button({ className, children, ...props }) {
  const classNames = classnames(ButtonStyled, className)

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  )
}
