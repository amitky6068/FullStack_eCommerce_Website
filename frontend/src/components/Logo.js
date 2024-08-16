import React from 'react'

const Logo = ({ w, h }) => {
  return (
    <svg width={w} height={h} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          {`
            .circle {
              fill: #E11D48; /* Exact red color used in Header */
            }
            .text {
              fill: #FFFFFF; /* White text for good contrast */
              font-size: 12px;
              font-family: Arial, sans-serif;
              text-anchor: middle;
              dominant-baseline: middle;
            }
          `}
        </style>
      </defs>
      <circle cx="50" cy="50" r="45" className="circle" />
      <text x="50" y="50" className="text">E-SHOP</text>
    </svg>
  )
}

export default Logo
