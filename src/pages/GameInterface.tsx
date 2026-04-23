import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import TerminalLog from '../components/TerminalLog';
import AttributePanel from '../components/AttributePanel';
import { Terminal, ShieldAlert, Cpu } from 'lucide-react';

export default function GameInterface() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0 = Intro, 1-4 = Questions, 5 = GameOver
  const [xp, setXp] = useState(0);
  const [logs, setLogs] = useState<string[]>(['Inicializando sistema...', 'Conexão segura estabelecida.']);
  const [attributes, setAttributes] = useState({ foco: 10, resiliencia: 10, visao: 10 });

  const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

  const questions = [
    {
      title: "Qual é o seu status atual no jogo da vida real?",
      options: [
        { label: "A", text: "Jogo muito, mas a conta bancária tá no modo Hard.", attr: 'foco', pts: 20 },
        { label: "B", text: "Trabalho muito, mas queria viver de internet.", attr: 'resiliencia', pts: 25 },
        { label: "C", text: "Já crio conteúdo, mas o algoritmo é o Boss final.", attr: 'visao', pts: 30 }
      ]
    },
    {
      title: "Se você fosse começar a criar conteúdo hoje, qual seria sua skin?",
      options: [
        { label: "A", text: "O Ninja (Quero viralizar sem mostrar o rosto).", attr: 'foco', pts: 20 },
        { label: "B", text: "O Bardo (Gosto de aparecer e falar com a câmera).", attr: 'visao', pts: 15 },
        { label: "C", text: "O Estrategista (Foco só nos bastidores e edição).", attr: 'resiliencia', pts: 30 }
      ]
    },
    {
      title: "Qual é o 'loot' (recompensa) que você busca nos próximos 30 dias?",
      options: [
        { label: "A", text: "Pagar o lanche do final de semana.", attr: 'visao', pts: 10 },
        { label: "B", text: "Tirar meus primeiros R$ 1.000 a R$ 3.000 online.", attr: 'foco', pts: 30 },
        { label: "C", text: "Escalar e fazer disso minha profissão principal.", attr: 'resiliencia', pts: 40 }
      ]
    },
    {
      title: "Você entende que não existe 'hack de dinheiro', mas sim método e repetição?",
      options: [
        { label: "A", text: "Sim, estou pronto para o grind.", attr: 'foco', pts: 40 },
        { label: "B", text: "Achei que era só apertar um botão.", attr: 'gameover', pts: 0 }
      ]
    }
  ];

  const handleStart = () => {
    addLog('Instrução recebida: [INICIAR GRIND].');
    addLog('Carregando Quest 1...');
    setStep(1);
  };

  const handleSelect = (option: any) => {
    addLog(`Opção [${option.label}] selecionada.`);
    
    if (option.attr === 'gameover') {
      addLog('ERROR: Mentalidade incompatível detectada.');
      setStep(5); // Game Over
      return;
    }

    // Update state
    setXp((prev) => Math.min(prev + option.pts, 100));
    setAttributes((prev) => ({
      ...prev,
      [option.attr]: Math.min((prev as any)[option.attr] + option.pts, 100)
    }));

    if (step < 4) {
      addLog(`Progresso salvo. Carregando Quest ${step + 1}...`);
      setStep(step + 1);
    } else {
      addLog('Analisando perfil do usuário...');
      setTimeout(() => {
        navigate('/transition');
      }, 1500);
    }
  };

  const currentQ = questions[step - 1];

  return (
    <div className="min-h-screen bg-dark-bg text-slate-text p-4 md:p-8 font-sans cyber-grid scanlines flex flex-col">
      {/* Header Fixo Técnico */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-mono text-xs rounded-sm">
            LVL {(xp / 20).toFixed(0)}
          </div>
          <div className="font-mono text-sm">
            User: <span className="text-neon-green">Infiltrado_Anon</span>
          </div>
        </div>
        <div className="font-mono text-xs text-slate-500 hidden sm:block">
          IP: 192.168.1.XX // SECURE
        </div>
      </header>

      {/* Grid Central */}
      <div className="w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Painel Esquerdo */}
        <div className="lg:col-span-3 hidden lg:block">
          <AttributePanel attributes={attributes} />
        </div>

        {/* Main Central */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          
          {/* XP Bar */}
          <div className="w-full max-w-md mb-8">
            <div className="flex justify-between text-xs font-mono mb-2 text-neon-green">
              <span>XP_PROGRESS</span>
              <span>{xp}%</span>
            </div>
            <div className="w-full h-2 bg-slate-900 border border-neon-green/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-neon-green shadow-[0_0_10px_rgba(0,255,157,0.5)]" 
                animate={{ width: `${xp}%` }} 
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full card glitch-box p-8 md:p-12 text-center"
              >
                <Cpu className="mx-auto text-neon-cyan w-16 h-16 mb-6" />
                <h1 className="text-3xl md:text-4xl uppercase mb-4 text-white">Preparado para o Grind?</h1>
                <p className="text-slate-400 mb-8 font-mono text-sm max-w-sm mx-auto">
                  Este terminal testará suas habilidades, visão e resiliência. Conclua para desbloquear a sala do chefe.
                </p>
                <button 
                  onClick={handleStart}
                  className="w-full bg-neon-green text-black uppercase font-bold tracking-widest py-4 rounded-sm hover:-translate-y-1 transition-transform border border-transparent shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                >
                  [ Iniciar Sistema ]
                </button>
              </motion.div>
            )}

            {step >= 1 && step <= 4 && (
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col gap-6"
              >
                <div className="card glitch-box p-8 border-l-4 border-l-neon-green">
                  <div className="text-neon-cyan font-mono text-xs mb-4">QUEST_0{step}</div>
                  <h2 className="text-xl md:text-2xl text-white font-medium">
                    {currentQ.title}
                  </h2>
                </div>

                <div className="flex flex-col gap-3">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(opt)}
                      className="group flex items-center p-4 bg-[#0d1117] border border-white/5 hover:border-neon-green hover:bg-neon-green/5 transition-all text-left group-hover:-translate-y-1"
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-slate-800 group-hover:bg-neon-green group-hover:text-black font-mono font-bold text-sm mr-4 transition-colors">
                        {opt.label}
                      </div>
                      <span className="text-slate-300 group-hover:text-white transition-colors text-sm md:text-base">
                        {opt.text}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div 
                key="gameover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full card border border-red-500/50 bg-red-950/20 p-8 md:p-12 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZjAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
                <ShieldAlert className="mx-auto text-red-500 w-16 h-16 mb-6 animate-pulse" />
                <h1 className="text-4xl font-extrabold text-red-500 uppercase tracking-widest mb-4">
                  GAME OVER
                </h1>
                <p className="text-red-200/70 mb-8 font-mono text-sm max-w-sm mx-auto">
                  Fatal Error: Mindset incompatível. Se você está buscando apenas apertar um botão, a Academia Viral não é seu loot.
                </p>
                <button 
                  onClick={() => { setStep(0); setXp(0); addLog('[SYSTEM] Reiniciando simulação.'); }}
                  className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-black uppercase font-bold tracking-widest py-4 transition-all"
                >
                  Reiniciar o Grind
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Console Log Direito */}
        <div className="lg:col-span-3 hidden lg:block">
          <TerminalLog logs={logs} />
        </div>
        
      </div>

      <footer className="w-full max-w-7xl mx-auto pt-8 flex justify-between font-mono text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          SYSTEM_ONLINE
        </div>
        <div>V 1.0.4 // BASTIDORES</div>
      </footer>
    </div>
  );
}
