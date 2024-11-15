import React, { useState } from "react";
import axios from "axios";
import "./weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      return;
    }

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9a1883ede133db713c9cccb8f52434d7&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);

        setCity("");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9a1883ede133db713c9cccb8f52434d7&units=metric`
      )
      .then((response) => {
        setForecastData(response.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateAverageTemperature = () => {
    if (forecastData) {
      const temperatures = forecastData.map((forecast) => forecast.main.temp);
      const sum = temperatures.reduce((acc, curr) => acc + curr, 0);
      return (sum / temperatures.length).toFixed(2);
    }
    return null;
  };

  return (
    <div className="weather-app">
      <h1 className="weather-app__title">Weather App</h1>
      <form className="weather-app__form" onSubmit={handleSubmit}>
        <input
          className="weather-app__input"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
        />
        <button className="weather-app__button" type="submit">
          Get Weather
        </button>
      </form>

      {weatherData && (
        <div className="weather-app__current">
          <h2 className="weather-app__current-title">{weatherData.name}</h2>
          <p className="weather-app__current-temp">
            Temperature: {weatherData.main.temp} °C
          </p>
          <p className="weather-app__current-weather">
            Weather: {weatherData.weather[0].description}
          </p>
        </div>
      )}

      {forecastData && (
        <div className="weather-app__forecast">
          <h2 className="weather-app__forecast-title">5-Day Forecast</h2>
          <p className="weather-app__forecast-average">
            Average Temperature: {calculateAverageTemperature()} °C
          </p>
          <div className="weather-app__forecast-list">
            {forecastData.map((forecast) => (
              <div key={forecast.dt} className="weather-app__forecast-item">
                <p className="weather-app__forecast-datetime">
                  Date/Time: {forecast.dt_txt}
                </p>
                <p className="weather-app__forecast-temp">
                  Temperature: {forecast.main.temp} °C
                </p>
                <p className="weather-app__forecast-weather">
                  Weather: {forecast.weather[0].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Weather;