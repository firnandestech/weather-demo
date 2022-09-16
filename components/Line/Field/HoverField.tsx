import { forwardRef } from 'react'

const HoverField = forwardRef(
  ({ width, height, toggleShowFocus, trackingMouseMove }:any, ref:any) => {
    return (
      <rect
        ref={ref}
        width={width}
        height={height}
        fill="none"
        pointerEvents="all"
        onMouseEnter={() => toggleShowFocus(true)}
        onMouseLeave={() => toggleShowFocus()}
        onMouseMove={(e) => trackingMouseMove(e)}
      ></rect>
    )
  }
)

export default HoverField
