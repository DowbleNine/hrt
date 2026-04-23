import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SalesPage from './pages/SalesPage';
import GameInterface from './pages/GameInterface';
import TransitionScreen from './pages/TransitionScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tela do Quiz/Gamificada */}
        <Route path="/" element={<GameInterface />} />
        
        {/* Tela de Loading e Validação do Quiz */}
        <Route path="/transition" element={<TransitionScreen />} />
        
        {/* A Landing Page Principal de Oferta (Boss Room) */}
        <Route path="/boss-room" element={<SalesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
