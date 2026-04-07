import React from 'react'
import NavbarLink from '../desktop/NavbarLink'

export default function GuestLinks() {
  return (
    <div>
      <NavbarLink href='/login'>Login</NavbarLink>
      <NavbarLink href='/register'>Register</NavbarLink>
    </div>
  )
}
