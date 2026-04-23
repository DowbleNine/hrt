import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, CheckCircle2, LockOpen } from 'lucide-react';

export default function TransitionScreen() {
  const navigate = useNavigate();
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    // Simular processamento (Loading Bar progress)
    const timers = [
      setTimeout(() => setLoadingStep(1), 1000), // Análise concluída
      setTimeout(() => setLoadingStep(2), 2500), // Match revelado
      setTimeout(() => setLoadingStep(3), 3500)  // Botão ativado
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-slate-text flex items-center justify-center p-4 cyber-grid scanlines">
      <AnimatePresence mode="wait">
        
        {loadingStep < 2 ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center w-full max-w-md"
          >
            <Activity className="w-16 h-16 text-neon-cyan mx-auto mb-6 animate-pulse" />
            <h2 className="text-2xl text-neon-cyan uppercase tracking-[0.2em] font-mono mb-8">
              {loadingStep === 0 ? "Analisando Atributos..." : "Sincronizando Perfil..."}
            </h2>
            <div className="w-full h-1 bg-slate-900 overflow-hidden relative">
              <motion.div 
                className="h-full bg-neon-cyan"
                initial={{ width: "0%" }}
                animate={{ width: loadingStep === 0 ? "40%" : "100%" }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>
            <div className="mt-4 font-mono text-xs text-slate-500 text-left space-y-1">
              <div>&gt; _VERIFICANDO SCORE: OK</div>
              {loadingStep === 1 && <div>&gt; _PROCESSANDO MATCHING: ACESSO ENCONTRADO</div>}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg card glitch-box p-8 md:p-12 text-center relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-neon-green" />
            <CheckCircle2 className="w-20 h-20 text-neon-green mx-auto mb-6" />
            
            <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-2">
              Match <span className="neon-text">Perfeito!</span>
            </h1>
            
            <div className="inline-block px-3 py-1 bg-neon-green/10 text-neon-green font-mono text-xs border border-neon-green/20 mb-8 rounded">
              98% DE COMPATIBILIDADE DETECTADA
            </div>
            
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              O sistema confirmou. Seus atributos indicam que você tem o perfil exato de quem consegue faturar pesado nos bastidores (sem colocar o rosto). O seu próximo nível foi desbloqueado!
            </p>

            {loadingStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button 
                  onClick={() => navigate('/boss-room')}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <LockOpen size={18} />
                  ACESSAR MEU LOOT (OFERTA DESBLOQUEADA)
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
        
      </AnimatePresence>
    </div>
  );
}
