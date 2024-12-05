import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the WeatherData and ForecastData interfaces at the top of the file
interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  coord: {
    lat: number;
    lon: number;
  };
}

interface ForecastData {
  daily: Array<{
    dt: number;
    temp: {
      max: number;
      min: number;
    };
    weather: Array<{ icon: string }>;
  }>;
}

const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [city, setCity] = useState<string>("Orono");
  const [isCelsius, setIsCelsius] = useState<boolean>(false);

  useEffect(() => {
    // Fetch the weather data and forecast when the component mounts or the city changes
    const fetchWeatherData = async () => {
      const apiKey = "59446b2366c35cbe45d81fb3e3545297";
      const units = isCelsius ? "metric" : "imperial"; // Toggle between °C and °F

      // Fetch current weather
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
        );
        setWeather(weatherResponse.data);

        // Fetch forecast
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherResponse.data.coord.lat}&lon=${weatherResponse.data.coord.lon}&units=${units}&appid=${apiKey}`
        );
        setForecast(forecastResponse.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city, isCelsius]); // Trigger effect on city change or unit toggle

  // Format date and time
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const toggleUnits = () => {
    setIsCelsius((prev) => !prev);
  };

  // Render current weather and forecast
  return (
    <div>
      <h1>Weather Page</h1>

      {/* Search form for city */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCity(city);
        }}
      >
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button type="submit">Search</button>
      </form>

      {/* Display weather data */}
      {weather && (
        <div>
          <h2>{city}</h2>
          <p>{formatDate(weather.dt)}</p>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
            <p>
              Temperature: {Math.round(weather.main.temp)}°
              {isCelsius ? "C" : "F"}
            </p>
            <p>Feels like: {Math.round(weather.main.feels_like)}°</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind speed: {Math.round(weather.wind.speed)} mph</p>
          </div>

          {/* Unit toggle */}
          <button onClick={toggleUnits}>
            Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
          </button>
        </div>
      )}

      {/* Display forecast data */}
      {forecast && (
        <div>
          <h3>7-day Forecast</h3>
          <div>
            {forecast.daily.map((day: { dt: number; weather: { icon: string }[]; temp: { max: number; min: number } }, index: number) => (
              <div key={index}>
                <p>{formatDate(day.dt)}</p>
                {day.weather?.[0]?.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt="forecast icon"
                  />
                )}
                <p>
                  High: {Math.round(day.temp.max)}°
                  {isCelsius ? "C" : "F"}
                </p>
                <p>
                  Low: {Math.round(day.temp.min)}°
                  {isCelsius ? "C" : "F"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
