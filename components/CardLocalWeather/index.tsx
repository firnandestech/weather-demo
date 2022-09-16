//library package
import { useEffect, useState, useCallback } from "react";
import { csv, json } from "d3";
import TextField from "@mui/material/TextField";
import { feature } from "topojson-client";
import Grid from "@mui/material/Grid";

// service
import { clientGet } from "lib/services";
// style
import styles from "styles/components/cardLocalWeather.module.scss";
//type
type TFilterDataCenter = {
  city: string;
};

const CardLocalWeather = () => {
  const today: Date = new Date();
  const [features, setFeatures] = useState<any[]>([]);
  const [dataCenterLocations, setDataCenterLocations] = useState([]);
  const [selectedDataCenter, setSelectedDataCenter] = useState(null);

  const handleOnchage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const seachVal = e.target.value;

      if(seachVal) {
        const dataFilter = dataCenterLocations.filter((v: TFilterDataCenter) => {
          return v.city.toLowerCase().includes(seachVal);
        });
  
        setDataCenterLocations(dataFilter);
      } else {
        loadData()
      }
    },
    [setDataCenterLocations, dataCenterLocations]
  );

  const loadData = async () => {
    Promise.all([
      json("/data/world-atlas-topology-json-50m.json"),
      csv("/data/data-center-locations.csv"),
    ]).then(async ([worldAtlasData, dataCenterLocations]: any) => {
      const _features: any = feature(
        worldAtlasData,
        worldAtlasData?.objects?.countries
      );
      setFeatures(_features.features);

      const _dataCenterLocations: any = await Promise.all(
        [...dataCenterLocations].map(async (item: any) => {
          const { data } = await clientGet("", { q: item.city, aqi: "no" });

          return {
            ...item,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lng),
            temp: data?.current?.temp_c,
            condition: data?.current?.condition,
            humidity: data?.current?.humidity,
          };
        })
      );

      setDataCenterLocations(_dataCenterLocations);
    });
  };

  const padZero = (num: Number) => {
    return num.toString().padStart(2, "0");
  }

  const handleRemoveSearch = useCallback(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.cardLocalWeather}>
      <h2>Current Weather</h2>
      <Grid className={styles.cardLocalWeatherSearchContainer}>
        <TextField
          required
          id="outlined-required"
          label="City"
          onChange={handleOnchage}
          // onKeyDown={handleOnchage}
          placeholder="Search for city Or airport"
        />
      </Grid>

      <div className={styles.cardLocalWeatherListContainer}>
        {dataCenterLocations.map((v: any, i: number) => {
          return (
            <div key={i} className={styles.cardLocalWeatherItem}>
              <div className={styles.cardLocalWeatherGrid}>
                <h3>{v.city}</h3>
                <p>{padZero(today.getHours())}:{padZero(today.getMinutes())}</p>
                <p>{v?.condition?.text}</p>
              </div>

              <div className={styles.cardLocalWeatherGrid}>
                <h2>
                  {v?.temp}℃{" - "}
                </h2>
                <p>H:{v?.humidity}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardLocalWeather;
