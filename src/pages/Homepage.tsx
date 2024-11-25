import React from 'react';

interface HomepageProps {
  onNavigateToCalendar: () => void; // Prop to navigate to Calendar page
}

const Homepage: React.FC<HomepageProps> = ({ onNavigateToCalendar }) => {

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
          <button onClick={onNavigateToCalendar}>Go to Calendar</button>
        </section>
  
        <footer>
          <p>StyleNest &copy; 2024</p>
        </footer>
      </div>
    );
  };
  
  export default Homepage;