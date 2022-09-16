import { useEffect, useState } from 'react'
import { csv, scaleLinear, scaleTime, extent, line } from 'd3'
import {
  width,
  height,
  innerWidth,
  margin,
  innerHeight,
} from 'lib/config/dimensions'
import BottomAxis from './BottomAxis'
import LeftAxis from './LeftAxis'
import Field from './Field'

const Line = () => {
  const [data, setData] = useState([])

  const loadData = async () => {
    await csv('/data/temperature-in-san-francisco.csv').then((responseData) => {
      const _data = responseData.map((d) => {
        return {
          temperature: parseFloat(d.temperature),
          timestamp: new Date(d.timestamp),
        }
      })

      setData([..._data])
    })
  }

  const xValue = (d) => d.timestamp
  const yValue = (d) => d.temperature

  const xScale = scaleTime().domain(extent(data, xValue)).range([0, innerWidth])

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice()

  const lineGenerator = line()
    .x((d) => xScale(d.timestamp))
    .y((d) => yScale(d.temperature))

  useEffect(() => {
    loadData()
  }, [])

  return (
    <svg width={width} height={height} style={{ margin: '0 auto' }}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <BottomAxis data={data} scale={xScale} height={innerHeight} />
        <LeftAxis data={data} scale={yScale} width={innerWidth} />
        <Field
          data={data}
          lineGenerator={lineGenerator}
          width={innerWidth}
          height={innerHeight}
          xScale={xScale}
          yScale={yScale}
        />
      </g>
    </svg>
  )
}

export default Line
