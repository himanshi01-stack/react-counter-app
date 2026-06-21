import React from 'react'
import '../styles/button.css'

function Button({ onClick, className, children, ...props }) {
  return (
    <button onClick={onClick} className={`btn ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
