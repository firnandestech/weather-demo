import { useEffect, useState, useCallback } from 'react'
import { csv, json, geoNaturalEarth1, geoPath, geoGraticule } from 'd3'
import {
  width,
  height
} from 'lib/config/dimensions'
import { feature } from 'topojson-client'
import InformationBox from './InformationBox'
import Sphere from './Sphere'
import Graticule from './Graticule'
import Countries from './Countries'
import DataCenterLocations from './DataCenterLocations'

import { clientGet } from "lib/services"

const projection = geoNaturalEarth1()
const path = geoPath(projection)
const graticule = geoGraticule()

const WorldMap = () => {
  const [features, setFeatures] = useState<any[]>([])
  const [dataCenterLocations, setDataCenterLocations] = useState([])
  const [selectedDataCenter, setSelectedDataCenter] = useState(null)
  
  const loadData = async () => {
    Promise.all([
      json('/data/world-atlas-topology-json-50m.json'),
      csv('/data/data-center-locations.csv'),
    ]).then(async([worldAtlasData, dataCenterLocations]:any) => {
      const _features:any = feature(
        worldAtlasData,
        worldAtlasData?.objects?.countries
      )
      setFeatures(_features.features)
      
      const _dataCenterLocations:any = await Promise.all( [...dataCenterLocations].map(async(item:any) => {       
        const { data } = await clientGet("", { q:item.city, aqi:"no" })

        return {
          ...item,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lng),
          temp: data?.current?.temp_c,
          condition: data?.current?.condition,
          humidity: data?.current?.humidity,
        }
      }))

      setDataCenterLocations(_dataCenterLocations)
    })
  }

  function handleLocationClick(d:any) {
    setSelectedDataCenter(d)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="relative">
      <svg width={width} height={height} style={{ margin: '0 auto' }}>
        <Sphere path={path} />
        <Graticule path={path} graticule={graticule} />
        <Countries features={features} path={path} />
        <DataCenterLocations
          data={dataCenterLocations}
          handleLocationClick={handleLocationClick}
          projection={projection}
        />
      </svg>
      {selectedDataCenter && (
        <InformationBox
          data={selectedDataCenter}
          onClose={() => setSelectedDataCenter(null)}
        />
      )}
    </div>
  )
}

export default WorldMap
