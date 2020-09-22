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

  // console.log(new Date().getDay());

  return `${day} ${date} ${month} ${year}`;
};

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === 'Enter') {
      fetch(`${api.base}weather?q=Paris&units=metric&APPID=${api.key}`)
        .then(res => res.json())
          .then(result => setWeather(result));
            console.log(result);
  }
    

  }

  return (
    <div className="App-night">
      <main>
        <div className="search-bar">
          <input
            id="searchBar"
            type="text"
            placeholder="Search your city...."
          />
        </div>
        <div className="location-box">
          <div id="location">Rohtak, India</div>
          <div id="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div id="temp">15°C</div>
            <div id="weather">Sunny</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
