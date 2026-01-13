
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import BuilderPage from './pages/BuilderPage';
import TemplatesPage from './pages/TemplatesPage';
import SettingsPage from './pages/SettingsPage';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('cv_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('cv_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cv_user');
  };

  if (loading) return null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={!user ? <AuthPage onLogin={login} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={logout} /> : <Navigate to="/auth" />} />
        <Route path="/builder/:resumeId" element={user ? <BuilderPage /> : <Navigate to="/auth" />} />
        <Route path="/templates" element={user ? <TemplatesPage /> : <Navigate to="/auth" />} />
        <Route path="/settings" element={user ? <SettingsPage user={user} onUpdate={setUser} /> : <Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
