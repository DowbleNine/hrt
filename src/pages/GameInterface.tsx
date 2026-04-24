import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import TerminalLog from '../components/TerminalLog';
import AttributePanel from '../components/AttributePanel';
import { Terminal, ShieldAlert, Cpu, PackageOpen, Scissors, Brain, Trophy } from 'lucide-react';

type GameStep = 0 | 1 | 1.5 | 2 | 3 | 3.5 | 4 | 5 | 4.5;

export default function GameInterface() {
  const navigate = useNavigate();
  const [step, setStep] = useState<GameStep>(0); 
  const [xp, setXp] = useState(0);
  const [logs, setLogs] = useState<string[]>(['Inicializando sistema...', 'Conexão segura estabelecida.']);
  const [attributes, setAttributes] = useState({ foco: 10, resiliencia: 10, visao: 10 });

  const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

  const questions = [
    {
      step: 1,
      title: "Atenção. Você sabia que as plataformas estão pagando em dólar por vídeos de até 1 minuto, mesmo de perfis que não mostram o rosto?",
      options: [
        { label: "A", text: "Sim, mas minha mente está completamente sem ideias.", attr: 'visao', pts: 20 },
        { label: "B", text: "Não fazia ideia. Achava que precisava ser famoso.", attr: 'foco', pts: 15 },
        { label: "C", text: "Já tentei ganhar visualizações, mas o algoritmo me derrotou (flopou).", attr: 'resiliencia', pts: 25 }
      ]
    },
    {
      step: 2,
      title: "Qual é o maior obstáculo que drena sua energia na hora de criar conteúdo?",
      options: [
        { label: "A", text: "A Maldição das 200 Views: O vídeo simplesmente para de entregar.", attr: 'foco', pts: 25 },
        { label: "B", text: "Ciclo Sem Fim de Edição: Passo horas editando e o resultado fica amador.", attr: 'resiliencia', pts: 20 },
        { label: "C", text: "Modo Fantasma: Quero viralizar, mas tenho vergonha da câmera.", attr: 'visao', pts: 30 }
      ]
    },
    {
      step: 3,
      title: "Para virar esse jogo e desbloquear a monetização nos próximos 30 dias, o que você acha que está faltando para você?",
      options: [
        { label: "A", text: "O Caminho Certo (Um método claro de mineração de conteúdo).", attr: 'visao', pts: 20 },
        { label: "B", text: "O Diferencial (Técnicas de edição magnética para reter atenção).", attr: 'foco', pts: 30 },
        { label: "C", text: "Um Especialista (Alguém analisando meu perfil e me orientando ao vivo).", attr: 'resiliencia', pts: 35 }
      ]
    },
    {
      step: 4,
      title: "Você entende que não existe 'dinheiro rápido e fácil', mas sim método, constância e repetição?",
      options: [
        { label: "A", text: "Sim, estou pronto para o esforço e dedicação.", attr: 'foco', pts: 20 },
        { label: "B", text: "Achei que era só apertar um botão.", attr: 'gameover', pts: 0 }
      ]
    }
  ];

  const handleStart = () => {
    addLog('Instrução recebida: [INICIAR ANÁLISE].');
    addLog('Carregando Passo 1...');
    setStep(1);
  };

  const handleSelect = (option: any, currentStep: number) => {
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

    if (currentStep === 1) {
      setStep(1.5);
      setTimeout(() => setStep(2), 5000);
    } else if (currentStep === 2) {
      addLog(`Carregando Passo 3...`);
      setStep(3);
    } else if (currentStep === 3) {
      addLog(`WARNING: Acesso incompleto detectado. Iniciando varredura de pacote... PACOTE ENCONTRADO.`);
      setStep(3.5);
    } else if (currentStep === 4) {
      setStep(4.5);
      // Wait for achievement toast to finish reading
      setTimeout(() => navigate('/transition'), 3500);
    }
  };

  // Find the exact object structure for current step if it's a standard question
  const currentQ = [1,2,3,4].includes(step) ? questions.find(q => q.step === step) : null;

  return (
    <div className="min-h-screen bg-dark-bg text-slate-text p-4 md:p-8 font-sans cyber-grid scanlines overflow-x-hidden flex flex-col">
      
      {/* Toast Notification para a Conquista da Quest 4 */}
      <AnimatePresence>
        {step === 4.5 && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 bg-[#0d1117] border-2 border-neon-green p-4 rounded-xl shadow-[0_0_30px_rgba(0,255,157,0.4)] flex items-center gap-4 w-[90%] max-w-sm"
          >
            <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center shrink-0">
              <Trophy className="text-neon-green" />
            </div>
            <div>
              <p className="text-xs text-neon-green font-bold uppercase tracking-wider mb-1">
                Conquista Desbloqueada
              </p>
              <p className="text-sm font-semibold">Mindset de Elite.</p>
              <p className="text-xs text-slate-400 mt-1">Apenas 12% das pessoas chegam até aqui. Você está no caminho dos 5 dígitos.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Fixo Técnico */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-mono text-xs rounded-sm">
            LVL {(Math.max(1, xp / 20)).toFixed(0)}
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
          {step !== 5 && (
            <div className="w-full max-w-md mb-8">
              <div className="flex justify-between text-xs font-mono mb-2 text-neon-green">
                <span>PROGRESSO</span>
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
          )}

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full card glitch-box p-8 md:p-12 text-center"
              >
                <Cpu className="mx-auto text-neon-cyan w-16 h-16 mb-6" />
                <h1 className="text-3xl md:text-4xl uppercase mb-4 text-white">Preparado para a Jornada?</h1>
                <p className="text-slate-400 mb-8 font-mono text-sm max-w-sm mx-auto">
                  Este sistema analisará suas habilidades, visão e resiliência. Conclua para desbloquear a plataforma.
                </p>
                <button 
                  onClick={handleStart}
                  className="w-full bg-neon-green text-black uppercase font-bold tracking-widest py-4 rounded-sm hover:-translate-y-1 transition-transform shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                >
                  [ Iniciar Análise ]
                </button>
              </motion.div>
            )}

            {currentQ && (
              <motion.div 
                key={`q-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col gap-6"
              >
                <div className="card glitch-box p-8 border-l-4 border-l-neon-green">
                  <div className="text-neon-cyan font-mono text-xs mb-4">PASSO_0{step}</div>
                  <h2 className="text-lg md:text-xl text-white font-medium leading-relaxed">
                    {currentQ.title}
                  </h2>
                </div>

                <div className="flex flex-col gap-3">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(opt, currentQ.step)}
                      className="group flex items-center p-4 bg-[#0d1117] border border-white/5 hover:border-neon-green hover:bg-neon-green/5 transition-all text-left group-hover:-translate-y-1"
                    >
                      <div className="w-8 h-8 flex items-center justify-center shrink-0 bg-slate-800 group-hover:bg-neon-green group-hover:text-black font-mono font-bold text-sm mr-4 transition-colors">
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

            {step === 1.5 && (
              <motion.div 
                key="leaderboard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full card border border-neon-cyan/30 p-8 md:p-12 text-center bg-[#0d1117]/80 backdrop-blur-md"
              >
                <Trophy className="mx-auto text-neon-cyan w-12 h-12 mb-4" />
                <h2 className="text-xl md:text-2xl font-bold uppercase text-white mb-2">Ranking Global de Alunos</h2>
                <div className="my-6 aspect-video bg-black/50 border border-white/10 rounded flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-neon-cyan/10 animate-pulse" />
                  <div className="flex flex-col items-center justify-center p-4 z-10">
                    <span className="text-4xl md:text-5xl font-black text-neon-green mb-2">+2.500.000</span>
                    <span className="text-slate-400 font-mono text-sm tracking-widest">VISUALIZAÇÕES ALCANÇADAS</span>
                  </div>
                </div>
                <p className="text-slate-300 font-mono text-xs max-w-sm mx-auto leading-relaxed">
                   Estatísticas do Servidor: Alunos que usam as Ferramentas de Edição Magnética têm <span className="text-neon-cyan font-bold">85% mais chance</span> de atingir o Top Ranking. Retornando...
                </p>
                <div className="mt-6 w-full h-1 bg-slate-800 rounded">
                  <motion.div className="h-full bg-neon-cyan" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear" }} />
                </div>
              </motion.div>
            )}

            {step === 3.5 && (
              <motion.div 
                key="loot"
                initial={{ opacity: 0, filter: 'hue-rotate(90deg)' }}
                animate={{ opacity: 1, filter: 'hue-rotate(0deg)' }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full flex flex-col gap-6"
              >
                <div className="card border border-yellow-500/50 bg-[#0d1117] p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-600 to-yellow-400" />
                  <PackageOpen className="mx-auto text-yellow-400 w-16 h-16 mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                  <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">Pacote Especial Desbloqueado!</h2>
                  <p className="text-slate-400 font-mono text-xs md:text-sm max-w-md mx-auto">
                    Seu projeto precisa de atualização. Aqui estão exatamente os recursos que você precisa para vencer o algoritmo:
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-4 p-4 card border border-white/5 bg-[#0d1117] hover:border-yellow-500/30 transition-colors">
                     <div className="bg-yellow-500/10 p-3 rounded-lg"><PackageOpen className="text-yellow-500" size={20}/></div>
                     <div className="text-left">
                       <h3 className="font-bold text-white text-sm">A Mina de Ouro (Módulo)</h3>
                       <p className="text-xs text-slate-400 mt-1">Para curar a falta de ideias e achar o que já viraliza.</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 card border border-white/5 bg-[#0d1117] hover:border-cyan-500/30 transition-colors">
                     <div className="bg-cyan-500/10 p-3 rounded-lg"><Scissors className="text-cyan-500" size={20}/></div>
                     <div className="text-left">
                       <h3 className="font-bold text-white text-sm">Edição Magnética (Módulo)</h3>
                       <p className="text-xs text-slate-400 mt-1">Para prender a atenção das pessoas nos primeiros 3 segundos.</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 card border border-white/5 bg-[#0d1117] hover:border-purple-500/30 transition-colors">
                     <div className="bg-purple-500/10 p-3 rounded-lg"><Brain className="text-purple-400" size={20}/></div>
                     <div className="text-left">
                       <h3 className="font-bold text-white text-sm">Call Individual (Mentoria)</h3>
                       <p className="text-xs text-slate-400 mt-1">Um direcionamento profissional para analisar seu perfil ao vivo.</p>
                     </div>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(4)}
                  className="w-full mt-4 bg-yellow-500 text-black uppercase font-bold tracking-widest py-4 rounded-sm hover:-translate-y-1 transition-transform shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                >
                  [ GARANTIR MEU ACESSO E CONTINUAR ]
                </button>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div 
                key="gameover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full card border border-red-500/50 bg-red-950/20 p-8 md:p-12 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZjAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
                <ShieldAlert className="mx-auto text-red-500 w-16 h-16 mb-6 animate-pulse" />
                <h1 className="text-4xl font-extrabold text-red-500 uppercase tracking-widest mb-4">
                  ACESSO NEGADO
                </h1>
                <p className="text-red-200/70 mb-8 font-mono text-sm max-w-sm mx-auto">
                  Mentalidade incompatível. Se você está buscando apenas apertar um botão e não trabalhar, não há pacote ou solução mágica que fará o trabalho por você.
                </p>
                <button 
                  onClick={() => { setStep(0); setXp(0); addLog('[SYSTEM] Reiniciando análise.'); }}
                  className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-black uppercase font-bold tracking-widest py-4 transition-all"
                >
                  Recomeçar
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
        <div>V 1.0.6 // DROP_LOOT</div>
      </footer>
    </div>
  );
}
