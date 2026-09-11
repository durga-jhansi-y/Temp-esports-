import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Authentication
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import WorkspaceLayout from './layouts/WorkspaceLayout';

// Public pages
import LandingPage from './pages/LandingPage';
import TrustPage from './pages/TrustPage';
import PricingPage from './pages/PricingPage';
import QuestionsPage from './pages/QuestionsPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import LeagueLookupPage from './pages/LeagueLookupPage';
import TutorialRunCollegeTournament from './pages/TutorialRunCollegeTournament';
import Compare from './pages/Compare';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDetailPage from './pages/TournamentDetailPage';
import LiveCenter from './pages/LiveCenter';
import MatchDetailPage from './pages/MatchDetailPage';
import TeamsPage from './pages/TeamsPage';
import TeamDetailPage from './pages/TeamDetailPage';
import RankingsPage from './pages/RankingsPage';
import PlayersPage from './pages/PlayersPage';
import PlayerPublicProfilePage from './pages/PlayerPublicProfilePage';
import SchedulePage from './pages/SchedulePage';

// Login-required workspace pages
import LeagueRegistration from './pages/LeagueRegistration';
import OrganizerDashboardPage from './pages/workspace/OrganizerDashboardPage';
import TournamentManagerPage from './pages/workspace/TournamentManagerPage';
import TeamWorkspacePage from './pages/workspace/TeamWorkspacePage';
import OrganizerAnalyticsPage from './pages/workspace/OrganizerAnalyticsPage';
import BrandingPage from './pages/workspace/BrandingPage';
import MonetizationPage from './pages/workspace/MonetizationPage';
import BillingPage from './pages/workspace/BillingPage';
import AccountIntegrationsPage from './pages/workspace/AccountIntegrationsPage';
import HelpPage from './pages/workspace/HelpPage';
import PlayerDashboardPage from './pages/player/PlayerDashboardPage';
import PlayerProfilePage from './pages/player/PlayerProfilePage';

// Admin-only pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminControlPage from './pages/admin/AdminControlPage';
import AdminIntegrityPage from './pages/admin/AdminIntegrityPage';
import AdminAuditPage from './pages/admin/AdminAuditPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/trust" element={<TrustPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />

            {/* Public league retrieval replaces the old public creation page. */}
            <Route path="/launch" element={<LeagueLookupPage />} />
            <Route path="/leagues" element={<LeagueLookupPage />} />

            {/* Public team, tournament, and match discovery/details. */}
            <Route path="/tournament" element={<TournamentsPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/tournament-detail" element={<TournamentDetailPage />} />
            <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
            <Route path="/live-center" element={<LiveCenter />} />
            <Route path="/matches/:id" element={<MatchDetailPage />} />
            <Route path="/team" element={<TeamsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamDetailPage />} />
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/players/:id" element={<PlayerPublicProfilePage />} />
            <Route path="/schedule" element={<SchedulePage />} />

            {/* Login-required workspace */}
            <Route element={<ProtectedRoute />}>
              <Route element={<WorkspaceLayout />}>
                <Route path="/dashboard" element={<OrganizerDashboardPage />} />
                <Route path="/player-dashboard" element={<PlayerDashboardPage />} />
                <Route path="/player-profile" element={<PlayerProfilePage />} />
                <Route path="/league-manager" element={<LeagueRegistration />} />
                <Route path="/tournament-manager" element={<TournamentManagerPage />} />
                <Route path="/team-workspace" element={<TeamWorkspacePage />} />
                <Route path="/organizer-analytics" element={<OrganizerAnalyticsPage />} />
                <Route path="/branding" element={<BrandingPage />} />
                <Route path="/monetization" element={<MonetizationPage />} />
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/account-integrations" element={<AccountIntegrationsPage />} />
                <Route path="/help" element={<HelpPage />} />
              </Route>
            </Route>

            {/* Admin-only workspace */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route element={<WorkspaceLayout mode="admin" />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path="/admin/control" element={<AdminControlPage />} />
                <Route path="/admin/integrity" element={<AdminIntegrityPage />} />
                <Route path="/admin/audit" element={<AdminAuditPage />} />
              </Route>
            </Route>

            {/* Miscellaneous routes */}
            <Route path="/how-to-college-tourney" element={<TutorialRunCollegeTournament />} />
            <Route path="/compare/:competitor" element={<Compare />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;