import React from 'react'

export default ({ timeSignature }) => {
  if (timeSignature === '3') {
    return (
      <div className="timeline">
        <svg width="100%" height="8">
          <pattern id="timeline-three" x="0" y="0" width="184" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="4"/>
            <circle cx="64" cy="4" r="2"/>
            <circle cx="124" cy="4" r="2"/>
          </pattern>

          <rect x="0" y="0" width="100%" height="100%" fill="url(#timeline-three)" />
        </svg>
      </div>
    )
  }

  if (timeSignature === '4') {
    return (
      <div className="timeline">
        <svg width="100%" height="8">
          <pattern id="timeline-four" x="0" y="0" width="240" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="4"/>
            <circle cx="64" cy="4" r="2"/>
            <circle cx="124" cy="4" r="2"/>
            <circle cx="184" cy="4" r="2"/>
          </pattern>

          <rect x="0" y="0" width="100%" height="100%" fill="url(#timeline-four)" />
        </svg>
      </div>
    )
  }

  throw new Error('you done goofed')
}
