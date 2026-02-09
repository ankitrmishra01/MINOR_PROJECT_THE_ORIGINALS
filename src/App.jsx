import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RiskAssessment from './pages/RiskAssessment';
import MarketsPage from './pages/MarketsPage';

import { UserProvider } from './context/UserContext';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/risk" element={
              <ProtectedRoute>
                <RiskAssessment />
              </ProtectedRoute>
            } />
            <Route path="/markets" element={
              <ProtectedRoute>
                <MarketsPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
