const DataCenterLocations = ({ data, handleLocationClick, projection }: { data:any, handleLocationClick:any, projection:any }) => {
  return (
    <>
      {data.map((d:any, index:number) => {
        const [x, y] = projection([d.lng, d.lat])
        return (
          <>
            <g
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleLocationClick(d)}
            >
              <circle
                cx={x}
                cy={y}
                r="10"
                onClick={() => {}}
                style={{ fill: 'steelblue' }}
              ></circle>
               <text height="28" x={x - 18} y={y + 30} font-size="12" fill="steelblue" stroke="steelblue" stroke-width=".06">{d?.temp}℃</text>
               <text width="28"  x={x - 18} y={y + 43} font-size="12" fill="steelblue" stroke="steelblue" stroke-width=".06">Hum:{d?.humidity}</text>
              <image
                href={d?.condition?.icon}
                height="28"
                width="28"
                x={x - 18}
                y={y - 10}
              ></image>
            </g>
          </>
        )
      })}
    </>
  )
}

export default DataCenterLocations
