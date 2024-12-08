import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase-config';
import Homepage from './pages/Homepage';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import TaskBar from './components/TaskBar';
import Weather from './pages/WeatherPage';
import Wardrobe from './pages/Wardrobe';
import Collections from './pages/Collections';
import ErrorBoundary from './components/ErrorBoundary'


const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/homepage');
    }
  }, [user, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/homepage" replace /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login onLogin={() => console.log('Login successful!')} />} />
        <Route path="/homepage" element={<><Homepage /><TaskBar /></>} />
        <Route path="/calendar" element={<><Calendar /><TaskBar /></>} />
        <Route path="/weather" element={<><Weather /><TaskBar /></>} />
        <Route path="/wardrobe" element={<><Wardrobe /><TaskBar /></>} />
        <Route path="/collections" element={<><Collections /><TaskBar /></>} />
      </Routes>
    </div>
  );
};

export default App;

