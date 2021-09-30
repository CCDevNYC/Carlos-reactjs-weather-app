import './App.css';
import React, { useState } from 'react';

const api = {
  key: "039075196d4210940671506f1b84b146",
  base: "https://api.openweathermap.org/data/2.5/"
}
// Example of weather in Paris, FR 
// https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&APPID=039075196d4210940671506f1b84b146


function App() {

  let [query, setQuery] = useState('');
  let [weather, setWeather] = useState({});


  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        })
    }
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`
  }

  return (
    <div className="App">
      <main>
        <h2>Carlos's Weather App</h2>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter city here..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />

        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>

              <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather-icon" className="icon" />
              <div className="weather">{weather.weather[0].main}</div>
            </div>

            <div className="description">
              <div>
                <div>Feels Like</div>
                <span>{Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div>
                <div>Humidity</div>
                <span>{weather.main.humidity}%</span>
              </div>
              <div>
                <div>Wind</div>
                <span>{Math.ceil(weather.wind.speed)}mph {weather.wind.deg}deg</span>
              </div>
              <div>
                <div>Min</div>
                <span>{Math.floor(weather.main.temp_min)}°C</span>
              </div>
              <div>
                <div>Max</div>
                <span>{Math.ceil(weather.main.temp_max)}°C</span>
              </div>
              <div>
                <div>Sunrise</div>
                <span>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</span>
              </div>
              <div>
                <div>Sunset</div>
                <span>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );

}

export default App;
