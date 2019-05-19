import React from 'react'

import Icon from './Icon'

export default ({className, to, onClick}) => (
  <button type="button" onClick={onClick} className={`button button--text button--icon ${className}`} aria-label={to}>
    <Icon className="icon" icon={to} />
  </button>
)