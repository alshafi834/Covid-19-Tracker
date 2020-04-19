import React, { useEffect, useState } from "react";
import Card from "./components/Cards/Cards";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import Charts from "./components/Charts/Charts";
import Map from "./components/Map/Map";
import styles from "./App.module.css";

import logoImage from "./images/image.png";

import { fetchData } from "./api/API";

const App = () => {
  const [covidDatas, setCovidDatas] = useState({});

  const getCovidData = async () => {
    try {
      const data = await fetchData();
      setCovidDatas(data);
    } catch (error) {
      console.log(error);
    }
  };

  //console.log(covidDatas);

  useEffect(() => {
    getCovidData();
  }, []);

  return (
    <div className={styles.container}>
      <img src={logoImage} alt="Covid-19" className={styles.logo} />

      {covidDatas.confirmed ? <Card covidDatas={covidDatas} /> : null}

      <Charts />

      <CountryPicker />

      <Map />
    </div>
  );
};

export default App;
