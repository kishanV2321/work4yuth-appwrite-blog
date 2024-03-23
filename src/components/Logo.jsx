import React from 'react'
import mainLogo from "../assets/w4y.png"

function Logo({ height = "10" }) {
  return (
    <div>
      <img
        src={mainLogo}
        className={`h-${height}`}
        alt="Logo"
      />
    </div>
  )
}

export default Logo