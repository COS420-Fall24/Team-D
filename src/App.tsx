import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase-config';
import Homepage from './pages/Homepage';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import TaskBar from './components/TaskBar';

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
      </Routes>
    </div>
  );
};

export default App;

