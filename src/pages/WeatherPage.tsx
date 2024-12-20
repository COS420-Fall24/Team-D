import { useState } from 'react';
import './WeatherPage.css';

type Weather = {
  main: {
    temp: number;
  };
  name: string;
  weather: [
    {
      main: string;
    }
  ];
};

const api = {
  key: "335952ee078a40533c48d62033fdf8eb",
  base: "https://api.openweathermap.org/data/2.5/",
};

function WeatherPage() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState<Partial<Weather>>({});

  const handleSubmit = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result); // Log the API response
        if (result.cod === 200) {
          setWeather(result);
        } else {
          alert(result.message || "City not found!");
          setWeather({});
        }
      })
      .catch((error) => console.error("Error fetching weather:", error));
  };
  
  return (
    <div className="app">
      <h1>Weather for the Day!</h1>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter City..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>

      {weather.main && weather.weather && (
        <div className="weather-info">
          <div className="weather-dettail">
            <p>City:</p>
            <span>{weather.name}</span>
          </div>
          <div className="weather-dettail">
            <p>Temperature:</p>
            <span>{weather.main.temp}°C</span>
          </div>
          <div className="weather-dettail">
            <p>Condition:</p>
            <span>{weather.weather[0].main}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
