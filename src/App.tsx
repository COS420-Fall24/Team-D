import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase-config';
import Homepage from './pages/Homepage';
import Calendar from './pages/calendar';
import Login from './pages/Login';
import TaskBar from './components/TaskBar';
<<<<<<< Updated upstream
import Weather from './pages/WeatherPage';
import Wardrobe from './pages/Wardrobe';
=======
import Collections from './pages/Collections';
>>>>>>> Stashed changes

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

<<<<<<< Updated upstream
  useEffect(() => {
    if (user) {
    }
  }, [user, navigate]);

=======
>>>>>>> Stashed changes
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/login" replace /> : <Navigate to="/homepage" replace />} />
        <Route path="/login" element={<Login onLogin={() => console.log('Login successful!')} />} />
        <Route path="/homepage" element={<><Homepage /><TaskBar /></>} />
        <Route path="/collections" element={<><Collections /><TaskBar /></>} />
        <Route path="/calendar" element={<><Calendar /><TaskBar /></>} />
        <Route path="/wardrobe" element={<><Wardrobe /><TaskBar /></>} />
        <Route path="/weather" element={<><Weather /><TaskBar /></>} />
      </Routes>
    </div>
  );
};

export default App;

