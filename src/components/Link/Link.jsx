import classnames from 'classnames'

import { Link as LinkStyled } from './Link.module.scss'

export function Link({ className, children, ...props }) {
  const classNames = classnames(LinkStyled, className)

  return (
    <a className={classNames} {...props}>
      {children}
    </a>
  )
}
