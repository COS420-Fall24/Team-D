import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login'; 
import Homepage from './pages/Homepage'



const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('login'); // Tracks which page to show

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={() => setCurrentPage('homepage')} />;
      case 'homepage':
        return <Homepage />;
      default:
        return <Login onLogin={() => setCurrentPage('homepage')} />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
};

export default App;
