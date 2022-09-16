const Tooltip = ({ x, y, label }: any) => {
  return (
    <g transform={`translate(${x}, ${y + 8})`}>
      <circle r="5" cy="-5" fill="steelblue"></circle>
      <rect
        fill="white"
        stroke="gray"
        strokeWidth="1"
        x="7"
        y="-25"
        width="100"
        height="50"
        rx="5"
      ></rect>
      <text fontSize="0.5em" x="18" y="-8">
        {label.timestamp}
      </text>
      <text fontSize="0.8em" x="18" y="8">
        {label.temperature} C
      </text>
    </g>
  )
}

export default Tooltip
