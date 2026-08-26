import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import TrustPage from './pages/TrustPage';
import PricingPage from './pages/PricingPage';
import QuestionsPage from './pages/QuestionsPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import LeagueRegistration from './pages/LeagueRegistration';
import TutorialRunCollegeTournament from './pages/TutorialRunCollegeTournament';
import Compare from './pages/Compare';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDetailPage from './pages/TournamentDetailPage';
import LiveCenter from './pages/LiveCenter';
import TeamsPage from './pages/TeamsPage';
import RankingsPage from './pages/RankingsPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/trust" element={<TrustPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/questions" element={<QuestionsPage />} />

          {/* Auth and Registration Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/launch" element={<LeagueRegistration />} />
          <Route path="tournament" element={<TournamentsPage />} />
          <Route path="tournament-detail" element={<TournamentDetailPage />} />
          <Route path="live-center" element={<LiveCenter />} />
          <Route path="team" element={<TeamsPage />} />
          <Route path="rankings" element={<RankingsPage />} />

          {/* Miscellanous routes */}
          <Route path="/how-to-college-tourney" element={<TutorialRunCollegeTournament />} />
          <Route path="/compare/:competitor" element={<Compare />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;