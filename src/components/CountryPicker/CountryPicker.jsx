import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { Bar } from "react-chartjs-2";

import { getCountries, fetchData } from "../../api/API";

import styles from "./CountryPicker.module.css";

const CountryPicker = () => {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    const fetchCountries = async () => {
      setFetchedCountries(await getCountries());
    };

    fetchCountries();
    handleChange();
  }, []);

  const handleChange = async (event) => {
    let cntry;
    if (event) {
      cntry = event.target.value;
    } else {
      cntry = "bangladesh";
    }
    const response = await fetchData(cntry);
    setCountryData(response);
  };

  //console.log(fetchedCountries);
  //console.log(countryData);

  const BarChart = countryData.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 156, 248, 0.795)",
              "rgba(19, 219, 182, 0.753)",
              "rgba(234, 57, 28, 0.829)",
            ],
            data: [
              countryData.confirmed.value,
              countryData.recovered.value,
              countryData.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${fetchedCountries}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      <h2>Country based Infected, Recovered and Death report</h2>
      <FormControl class={styles.formControl}>
        <NativeSelect onChange={handleChange}>
          <option value="bangladesh">Bangladesh</option>
          {fetchedCountries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      <div className={styles.barChart}>{BarChart}</div>
    </div>
  );
};

export default CountryPicker;
