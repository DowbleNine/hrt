import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SalesPage from './pages/SalesPage';
import GameInterface from './pages/GameInterface';
import TransitionScreen from './pages/TransitionScreen';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SuccessPage from './pages/SuccessPage';
import RuneBuilder from './pages/RuneBuilder';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('vga-theme') || 'manuscrito');

  useEffect(() => {
    document.body.className = theme === 'catacumba' ? 'catacumba' : '';
    localStorage.setItem('vga-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'manuscrito' ? 'catacumba' : 'manuscrito');
  };

  return (
    <div className="min-h-screen flex flex-direction-column">
      <div className="vinette-overlay"></div>
      
      {/* FORGED IRON NAVBAR */}
      <nav className="iron-navbar">
        <Link to="/" className="flex flex-col items-start no-underline">
          <span style={{ fontFamily: 'Pirata One', fontSize: '2.5rem', color: 'inherit' }}>VIRAL GAMER</span>
          <span style={{ fontFamily: 'Cinzel', fontSize: '0.7rem', letterSpacing: '4px' }}>ACADEMY</span>
        </Link>

        <div className="flex gap-10 items-center">
          <Link to="/codice" className="font-stone tracking-widest text-sm hover:text-gold transition-colors">CÓDICE</Link>
          <Link to="/login" className="font-stone tracking-widest text-sm hover:text-gold transition-colors">ENTRAR</Link>
          
          <button 
            onClick={toggleTheme}
            className="btn-wax px-6 py-2 text-sm"
          >
            {theme === 'manuscrito' ? 'CATACUMBA' : 'MANUSCRITO'}
          </button>
        </div>
      </nav>

      <main className="flex-1 relative">
        {children}
      </main>

      {/* ANCIENT FOOTER */}
      <footer className="py-10 px-20 border-t-4 border-iron bg-iron text-parchment flex justify-between items-center" style={{ borderImage: "url('/viking-border.png') 30 round" }}>
        <div className="font-stone text-xs tracking-widest">
          © MMXXVI VIRAL GAMER ACADEMY
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 opacity-50 bg-parchment rounded-full" style={{ WebkitMaskImage: "url('/assets/runes/pyros.png')", maskImage: "url('/assets/runes/pyros.png')", maskSize: 'cover' }}></div>
          <div className="w-8 h-8 opacity-50 bg-parchment rounded-full" style={{ WebkitMaskImage: "url('/assets/runes/hydros.png')", maskImage: "url('/assets/runes/hydros.png')", maskSize: 'cover' }}></div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<GameInterface />} />
          <Route path="/transition" element={<TransitionScreen />} />
          <Route path="/boss-room" element={<SalesPage />} />
          <Route path="/codice" element={<RuneBuilder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sucesso" element={<SuccessPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
