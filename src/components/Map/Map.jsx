import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import MapMarker from "../MapMarker/MapMarker";

import styles from "./Map.module.css";

import { getMapDatas } from "../../api/API";

const Map = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopUp, setShowPopUp] = useState({});

  const [viewport, setViewport] = useState({
    width: "95vw",
    height: "95vh",
    latitude: 23.7805733,
    longitude: 90.279239,
    zoom: 2,
  });

  const getCovidDatas = async () => {
    const covidData = await getMapDatas();
    setLogEntries(covidData);
  };

  //console.log(logEntries);
  useEffect(() => {
    getCovidDatas();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Covid-19 Map</h2>
      {logEntries ? (
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/alshafi/ck8vtun262o8b1iqkhxrdqeti"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={setViewport}
        >
          <MapMarker
            logEntries={logEntries}
            viewport={viewport}
            showPopUp={showPopUp}
            setShowPopUp={setShowPopUp}
          />
        </ReactMapGL>
      ) : null}
    </div>
  );
};
export default Map;
