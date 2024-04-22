import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageHeader from './components/PageHeader';
import config from './config';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to get weather data based on user's location
    const getWeatherData = async (latitude, longitude) => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.apiKey}&units=metric`;
      if (latitude && longitude) {
        try {
          const response = await axios.get(apiUrl);
          setWeather(response.data);
        } catch (error) {
          setError(error.message);
        }
      }
    };

    // Function to get user's current location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherData(latitude, longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        alert(error);
      }
    };

    // Call getLocation when component mounts
    getLocation();
  }, [error]);

  return (
    <div className="App">
      <nav className='navbar'>
        <a href='/' className='nav-links'> <h1>Home</h1></a>
      </nav>
      <PageHeader header="Weather at Your Location"/>
      {/* <h1 className='page-header'>Weather App</h1> */}

      {error && <p className='error'>{error}</p>}
      {weather && (
        <div className="weather-container">
        <h2>{weather.name}, {weather.sys.country}</h2>
        <div className="weather-info">
          <p className="temperature">Temperature: {weather.main.temp}°C</p>
          <p className="weather-description">Weather: {weather.weather[0].main}</p>
          <p className="weather-description">Description: {weather.weather[0].description}</p>
          <div className="weather-icon">
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather Icon" />
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
