import { axisBottom, select, timeFormat } from 'd3'
import { useEffect, useRef } from 'react'

const BottomAxis = ({ data, scale, height }: any) => {
  const groupRef:any = useRef()

  useEffect(() => {
    renderAxis()
  }, [data])

  function renderAxis() {
    const node = select(groupRef.current)

    const axis = axisBottom(scale)
      .tickSize(-height)
      .tickFormat((time:any) => timeFormat('%d-%B-%Y')(time))
      .ticks(5)

    const axisGroup = node.call(axis)

    // ubah styling Axis group sesuai keinginan
    axisGroup.attr('transform', `translate(0, ${height})`)
    axisGroup.selectAll('.domain').attr('stroke', 'lightgray')
    axisGroup.selectAll('.tick line').attr('stroke', 'lightgray')
  }

  return <g ref={groupRef}></g>
}

export default BottomAxis
