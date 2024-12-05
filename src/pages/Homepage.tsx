import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WeatherComponent from "./WeatherPage"; // Import the weather component

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState<string>("Orono");

  const handleNavigate = () => {
    navigate("/calendar");
  };

  return (
    <div>
      <header>
        <h1>Welcome to StyleNest</h1>
        <p>Style your life, one outfit at a time!</p>
      </header>

      <section>
        <h2>What can you do here?</h2>
        <ul>
          <li>Organize your wardrobe</li>
          <li onClick={handleNavigate}>Plan your outfits with the calendar</li>
          <li>Track how confident your looks make you feel</li>
        </ul>
      </section>

      {/* Display the WeatherComponent */}
      <section>
        <h2>Current Weather</h2>
        <WeatherComponent city={city} /> {/* Pass city to WeatherComponent */}
      </section>

      <footer>
        <p>StyleNest &copy; 2024</p>
      </footer>
    </div>
  );
};

export default Homepage;
