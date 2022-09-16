const Path = ({ data, lineGenerator }: any) => {
  return (
    <path
      d={lineGenerator(data)}
      fill="none"
      strokeWidth={3}
      strokeLinejoin="round"
      stroke="orange"
    ></path>
  )
}

export default Path
