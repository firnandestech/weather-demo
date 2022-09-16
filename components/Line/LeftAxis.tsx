import { select, axisLeft } from 'd3'
import { useEffect, useRef } from 'react'

const LeftAxis = ({ data, scale, width }: { data: any, scale: any, width: any }) => {
  const groupRef:any = useRef()

  useEffect(() => {
    renderAxis()
  }, [data])

  function renderAxis() {
    const node = select(groupRef?.current)

    const axis = axisLeft(scale).tickSize(-width)

    const axisGroup = node.call(axis)

    // ubah styling Axis group sesuai keinginan
    axisGroup.selectAll('.domain').attr('stroke', 'lightgray')
    axisGroup.selectAll('.tick line').attr('stroke', 'lightgray')
  }

  return <g ref={groupRef}></g>
}

export default LeftAxis
