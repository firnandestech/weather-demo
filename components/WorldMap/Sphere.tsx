const Sphere = ({ path }:{ path:any }) => {
  return (
    <g>
      <path
        d={path({ type: 'Sphere' })}
        style={{
          fill: '#fff',
        }}
      ></path>
    </g>
  )
}

export default Sphere
