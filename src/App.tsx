import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import NavBar from './components/navBar';

// Pages
import LandingPage from './pages/LandingPage';
import TrustPage from './pages/TrustPage';
import PricingPage from './pages/PricingPage';
import QuestionsPage from './pages/QuestionsPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import LeagueRegistration from './pages/LeagueRegistration';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0B', display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/trust" element={<TrustPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            
            {/* Auth and Registration Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/launch" element={<LeagueRegistration />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;