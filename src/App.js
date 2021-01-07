import React, { useState } from "react";

const api = {
  key: "667eaac156fbff26dc85b2c519281d40",
  base: "https://api.openweathermap.org/data/2.5/",
};

const location = {
  token: "c8542d96f01f147ddc356f8291b89a0401358a6e",
  base: "https://api.waqi.info/feed/",
};

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const names = {
  pm25: "PM₂.₅ (μg/m³)",
  pm10: "PM₁₀ (μg/m³)",
  o3: "Ozone  (μg/m³)",
  no2: "Nitrogen Dioxide  (μg/m³)",
  so2: "Sulphur Dioxide  (μg/m³)",
  co: "Carbon Monoxyde  (μg/m³)",
  t: "Temperature",
  w: "Wind",
  r: "Rain (precipitation)",
  h: "Relative Humidity",
  d: "Dew",
  dew: "Dew",
  p: "Atmostpheric Pressure",
};

const show = [
  "PM₂.₅ (μg/m³)",
  "PM₁₀ (μg/m³)",
  "Ozone  (μg/m³)",
  "Nitrogen Dioxide  (μg/m³)",
  "Sulphur Dioxide  (μg/m³)",
  "Carbon Monoxyde  (μg/m³)",
];

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [locationaqi, setLocationAqi] = useState({});
  const [elements, setElements] = useState([]);
  const [pollutantsVal, setPolutantsVal] = useState([]);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
        });
      fetch(`${location.base}${query}/?token=${location.token}`)
        .then((res) => res.json())
        .then((resu) => {
          setLocationAqi(resu);
          setElements(Object.keys(resu.data.iaqi));
          setPolutantsVal(
            Object.values(resu.data.iaqi).map((i) => i["v"].toFixed(2))
          );
        });
    }
  };

  let polval = (j, l) => {
    let pol = [];
    let polnew = [];
    const n = j;

    n.forEach((j, k) => {
      const val = l[k];
      pol.push(`${names[j]}${" : "}${val}`);
    });
    if (pol && show) {
      for (let h = 0; h < pol.length; h++) {
        for (let g = 0; g < show.length; g++) {
          if (pol[h].includes(show[g])) {
            polnew.push(pol[h]);
          }
        }
      }
      return polnew.map((i) => <div key={i}>{i}</div>);
    }
  };

  return (
    <div
      className={
        new Date().getHours() >= 18 || new Date().getHours() <= 6
          ? "App-night"
          : "App-warm"
      }
    >
      <main>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="search-bar">
              <input
                id="searchBar"
                type="text"
                value={query}
                placeholder="Search your city...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
              />
            </div>
            <div className="location-box">
              <div id="country">
                <span id="location">{weather.name}</span>,{weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="weather-box">
                <div id="temp">{Math.round(weather.main.temp)}°C</div>
                <br />
                <div id="weather">{weather.weather[0].main}</div>
              </div>
            </div>

            <hr />
            {locationaqi.status === "ok" ? (
              <div className="aqi">
                Air Quality Index
                <hr />
                <div id="aqi_index">
                  {locationaqi.data.aqi}{" "}
                  {locationaqi.data.aqi > 300 ? (
                    <span id="hazardous">Hazardous</span>
                  ) : locationaqi.data.aqi > 200 ? (
                    <span id="very_Unhealthy">Very Unhealthy</span>
                  ) : locationaqi.data.aqi > 150 ? (
                    <span id="unhealthy">Unhealty</span>
                  ) : locationaqi.data.aqi > 100 ? (
                    <span id="unhealthy_4_sensitive">
                      Unhealty for sensitive groups
                    </span>
                  ) : locationaqi.data.aqi > 50 ? (
                    <span id="moderate">Moderate</span>
                  ) : locationaqi.data.aqi <= 50 ? (
                    <span id="good">Good</span>
                  ) : null}
                </div>
                <hr />
                <div className="list_flex">
                  {polval(elements, pollutantsVal)}
                </div>
              </div>
            ) : (
              <div className="notFound">Air Quality Data Not Available</div>
            )}
          </div>
        ) : (
          <div id="no_weather">
            <h1>Enter Your City</h1>
            <input
              id="searchBar1"
              type="text"
              value={query}
              placeholder="Search...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={search}
            />
            <div className="date">{dateBuilder(new Date())}</div>
            {weather.cod === "404" ? (
              <h2 className="notFound">{weather.message.toUpperCase()}</h2>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
