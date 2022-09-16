const Graticule = ({ path, graticule }: { path:any, graticule:any }) => {
  return (
    <g>
      <path
        d={path(graticule())}
        style={{
          fill: 'none',
          stroke: 'lightgray',
        }}
      ></path>
    </g>
  )
}

export default Graticule
