import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London');
  const [error, setError] = useState(null);
  const [weatherClass, setWeatherClass] = useState('');

 
 const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
        setError(null);

        const weatherCondition = response.data.weather[0].main.toLowerCase();
        if (weatherCondition === 'clear') {
          setWeatherClass('sunny');
        } else if (weatherCondition === 'rain') {
          setWeatherClass('rainy');
        } else if (weatherCondition === 'smoke') {
          setWeatherClass('smoky');
        } else if (weatherCondition === 'snow') {
          setWeatherClass('snowy');
        } else {
          setWeatherClass('');
        }
      } catch (err) {
        setError('City not found!');
        setWeather(null);
        setWeatherClass('');
      }
    };

    fetchWeather();
  }, [city, apiKey]);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      setCity(event.target.value);
    }
  };

  return (
    <div className={`app ${weatherClass}`}>
      <h1>Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          onKeyDown={handleSearch}
        />
      </div>

      {error && <p className="error">{error}</p>}

      {weather ? (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>
            <strong>Temperature:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weather.wind.speed} m/s
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
