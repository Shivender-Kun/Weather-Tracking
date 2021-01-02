import React, { useState } from "react";

const api = {
  key: "667eaac156fbff26dc85b2c519281d40",
  base: "https://api.openweathermap.org/data/2.5/",
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

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          // console.log(weather);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? new Date().getHours() >= 20 || new Date().getHours() <= 6
            ? "App-night"
            : "App-warm"
          : "App"
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
              <div id="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div id="date">{dateBuilder(new Date())}</div>
              <div className="weather-box">
                <div id="temp">{Math.round(weather.main.temp)}°C</div>
                <br />
                <div id="weather">{weather.weather[0].main}</div>
              </div>
            </div>
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
            <div id="date1">{dateBuilder(new Date())}</div>
          </div>
        )}
        <div className="mapping"></div>
      </main>
    </div>
  );
}

export default App;
