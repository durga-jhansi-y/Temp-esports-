import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TrustPage from './pages/TrustPage';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <BrowserRouter>
      {/* Temporary Navigation Bar just so you can click between the pages easily */}
      <nav style={{ padding: '1rem', background: '#1a202c', display: 'flex', gap: '2rem', justifyContent: 'center', borderBottom: '1px solid #2d3748' }}>
        <Link to="/trust" style={{ color: '#00f2fe', textDecoration: 'none', fontWeight: 'bold' }}>Trust Page</Link>
        <Link to="/pricing" style={{ color: '#ff0844', textDecoration: 'none', fontWeight: 'bold' }}>Pricing Page</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<TrustPage />} />
        <Route path="/trust" element={<TrustPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
