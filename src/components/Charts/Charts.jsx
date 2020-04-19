import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api/API";
import { Line } from "react-chartjs-2";

import styles from "./Charts.module.css";

const Charts = () => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const getDailyData = async () => {
      setDailyData(await fetchDailyData());
    };
    getDailyData();
  }, []);

  const LineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map((dData) => dData.date),
        datasets: [
          {
            data: dailyData.map((dData) => dData.confirmed),
            label: "Infected",
            borderColor: "rgba(0, 156, 248, 0.795)",
            fill: true,
          },
          {
            data: dailyData.map((dData) => dData.deaths),
            label: "Deaths",
            borderColor: "rgba(234, 57, 28, 0.829)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      <h2>Infected and Death Chart of the whole world</h2>
      {LineChart}
    </div>
  );
};

export default Charts;
