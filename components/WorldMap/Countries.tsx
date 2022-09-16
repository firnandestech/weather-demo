const Countries = ({ features, path }: { features:any, path:any }) => {
  return (
    <g>
      {features.map((feature:any, index:number) => {
        return (
          <path
            key={index}
            d={path(feature)}
            style={{
              fill: '#d8d8d8',
              strokeWidth: 0.5,
              strokeLinejoin: 'round',
              strokeLinecap: 'round',
              stroke: '#fdfdfd',
            }}
          ></path>
        )
      })}
    </g>
  )
}

export default Countries
