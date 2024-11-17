import React from 'react';

const Homepage: React.FC = () => {
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
            <li>Plan your outfits with the calendar</li>
            <li>Track how confident your looks make you feel</li>
          </ul>
        </section>
  
        <footer>
          <p>StyleNest &copy; 2024</p>
        </footer>
      </div>
    );
  };
  
  export default Homepage;