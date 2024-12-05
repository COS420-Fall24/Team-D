import React, { useState, useEffect } from "react";
import axios from "axios";

interface WeatherComponentProps {
  city: string; // Accept city as a prop
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({ city }) => {
  const [weather, setWeather] = useState<any>(null); // Store weather data
  const [units, setUnits] = useState<string>("metric"); // Units: Celsius or Fahrenheit

  // Fetch weather data from OpenWeatherMap API
  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
        );
        setWeather(response.data); // Save weather data
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeatherData();
  }, [city, units]); // Fetch weather data when city or units change

  // Convert timestamp to readable date format
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Toggle between Celsius and Fahrenheit
  const toggleUnits = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  return (
    <div>
      {/* Display loading message if data isn't available yet */}
      {!weather ? (
        <p>Loading weather data...</p>
      ) : (
        <div>
          <h3>Weather in {city}</h3>
          <p>{formatDate(weather.dt)}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>{weather.weather[0].description}</p>
          <p>
            Temperature: {Math.round(weather.main.temp)}°
            {units === "metric" ? "C" : "F"}
          </p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} {units === "metric" ? "m/s" : "mph"}</p>
          
          {/* Unit toggle button */}
          <button onClick={toggleUnits}>
            Switch to {units === "metric" ? "Fahrenheit" : "Celsius"}
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
