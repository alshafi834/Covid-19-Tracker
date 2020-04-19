import axios from "axios";

const apiUrl = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let finalApiUrl = apiUrl;
  //console.log(country);
  if (country) {
    finalApiUrl = `${apiUrl}/countries/${country}`;
  }
  try {
    const modifiedData = await fetch(finalApiUrl);

    /* const modifiedData = {
      confirmed: confirmed,
      recovered: recovered,
      deaths: deaths,
      lastUpdate: lastUpdate,
    }; */
    return modifiedData.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {}
};

export const getCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${apiUrl}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {}
};

export const getMapDatas = async () => {
  let counter = 0;
  try {
    const {
      data: { countries },
    } = await axios.get(`${apiUrl}/countries`);

    let countryDetailsData = [];

    countries.map(async (country) => {
      const { data } = await axios.get(
        `${apiUrl}/countries/${country.name}/confirmed`
      );

      data.map((d) => {
        if (d.countryRegion !== "US" && counter < 27) {
          countryDetailsData.push(d);
          counter++;
        }
      });
      //countryDetailsData.push(data);
    });
    return countryDetailsData;
    //return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
