import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Cpu, PackageOpen, Scissors, Brain, Trophy } from 'lucide-react';

type GameStep = 0 | 1 | 1.5 | 2 | 3 | 3.3 | 3.5 | 4 | 5 | 4.5;

export default function GameInterface() {
  const navigate = useNavigate();
  const [step, setStep] = useState<GameStep>(0); 

  const questions = [
    {
      step: 1,
      title: "Sabia que as plataformas estão pagando em dólar por vídeos, e sem mostrar o rosto?",
      options: [
        { label: "A", text: "Sim", target: 'next' },
        { label: "B", text: "Não fazia ideia", target: 'next' },
        { label: "C", text: "Já tentei e não consigo", target: 'next' }
      ]
    },
    {
      step: 2,
      title: "Qual é o maior obstáculo na hora de criar conteúdo?",
      options: [
        { label: "A", text: "Meus vídeos não entregam", target: 'next' },
        { label: "B", text: "Passo horas editando pra nada", target: 'next' },
        { label: "C", text: "Não quero aparecer na câmera", target: 'next' }
      ]
    },
    {
      step: 3,
      title: "O que você acha que está faltando para você virar o jogo?",
      options: [
        { label: "A", text: "Um método validado de ideias", target: 'next' },
        { label: "B", text: "Técnicas de edição que prendem a atenção", target: 'next' },
        { label: "C", text: "Um especialista para analisar meus erros", target: 'next' }
      ]
    },
    {
      step: 4,
      title: "Você entende que não existe 'dinheiro fácil', e sim método e constância?",
      options: [
        { label: "A", text: "Sim, estou pronto para o trabalho duro.", target: 'next' },
        { label: "B", text: "Achei que era só apertar um botão e ficar rico.", target: 'gameover' }
      ]
    }
  ];

  const handleStart = () => {
    setStep(1);
  };

  const handleSelect = (option: any, currentStep: number) => {
    if (option.target === 'gameover') {
      setStep(5); // Game Over
      return;
    }

    if (currentStep === 1) {
      setStep(1.5);
      // Ajustado para demorar mais e mostrar a vantagem
      setTimeout(() => setStep(2), 8000);
    } else if (currentStep === 2) {
      setStep(3);
    } else if (currentStep === 3) {
      setStep(3.3);
    } else if (currentStep === 4) {
      setStep(4.5);
      // Wait for achievement toast to finish reading
      setTimeout(() => navigate('/transition'), 3500);
    }
  };

  // Find the exact object structure for current step if it's a standard question
  const currentQ = [1,2,3,4].includes(step) ? questions.find(q => q.step === step) : null;

  return (
    <div className="min-h-screen bg-dark-bg text-slate-text p-4 md:p-8 font-sans cyber-grid scanlines overflow-x-hidden flex flex-col justify-center items-center">
      
      {/* Toast Notification para a Conquista da Quest 4 */}
      <AnimatePresence>
        {step === 4.5 && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 bg-[#0d1117] border-2 border-neon-green p-4 rounded-xl shadow-[0_0_30px_rgba(0,255,157,0.4)] flex items-center gap-4 w-[90%] max-w-sm z-50"
          >
            <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center shrink-0">
              <Trophy className="text-neon-green" />
            </div>
            <div>
              <p className="text-xs text-neon-green font-bold uppercase tracking-wider mb-1">
                Conquista Desbloqueada
              </p>
              <p className="text-sm font-semibold">Mindset de Elite.</p>
              <p className="text-xs text-slate-400 mt-1">Apenas 12% das pessoas chegam até aqui. Você está no caminho certo.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
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
              <h1 className="text-3xl md:text-4xl uppercase mb-8 text-white">Preparado para a Jornada?</h1>
              <button 
                onClick={handleStart}
                className="w-full max-w-sm mx-auto bg-neon-green text-black uppercase font-bold tracking-widest py-4 rounded-sm hover:-translate-y-1 transition-transform shadow-[0_0_20px_rgba(0,255,157,0.3)] block"
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
                <h2 className="text-xl md:text-2xl text-white font-medium leading-relaxed">
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
                    <span className="text-slate-300 group-hover:text-white transition-colors text-base md:text-lg">
                      {opt.text}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1.5 && (
            <motion.div 
              key="leverage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full card border border-neon-cyan/30 p-8 md:p-12 text-center bg-[#0d1117]/80 backdrop-blur-md"
            >
              <Trophy className="mx-auto text-neon-cyan w-12 h-12 mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold uppercase text-white mb-6">A Vantagem Oculta</h2>
              
              <div className="space-y-6 text-left max-w-lg mx-auto">
                <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded">
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Você não precisa ser famoso para viralizar...
                  </p>
                </div>
                <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/40 rounded shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                  <p className="text-white text-lg leading-relaxed font-bold">
                    Pessoas que aplicam as Estratégias de Edição Magnética faturam <span className="text-neon-cyan">85% a mais</span> em dólares, no absoluto anonimato.
                  </p>
                </div>
                <p className="text-slate-400 font-mono text-sm text-center animate-pulse pt-4">
                  Avançando trilha...
                </p>
              </div>

              <div className="mt-8 w-full h-1 bg-slate-800 rounded">
                <motion.div className="h-full bg-neon-cyan" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 8, ease: "linear" }} />
              </div>
            </motion.div>
          )}

          {step === 3.3 && (
            <motion.div 
              key="socialproof"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center justify-center gap-6"
            >
              <Trophy className="text-neon-cyan w-16 h-16" />
              <h2 className="text-2xl md:text-3xl font-black text-white text-center uppercase tracking-tight">
                Os números de nossos alunos não mentem
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto text-center">
                Resultados reais de perfis anônimos que aplicaram o método nos últimos 30 dias.
              </p>

              {/* Box de Imagens centralizado e sobreposto */}
              <div className="relative flex justify-center items-center mt-4 mb-10 h-[320px] w-full max-w-lg mx-auto">
                {/* Imagem Esquerda */}
                <motion.img 
                  src="/provas-sociais/prova1.png" 
                  alt="Prova Social 1"
                  className="absolute left-6 w-32 md:w-44 h-[260px] md:h-[280px] object-cover rounded-xl border border-neon-cyan/40 shadow-[0_0_20px_rgba(0,255,255,0.1)] rotate-[-10deg] z-10 hover:z-40 transition-all cursor-pointer bg-[#05070a]"
                  whileHover={{ scale: 1.1, rotate: 0 }}
                />
                
                {/* Imagem Direita */}
                <motion.img 
                  src="/provas-sociais/prova3.png" 
                  alt="Prova Social 3"
                  className="absolute right-6 w-32 md:w-44 h-[260px] md:h-[280px] object-cover rounded-xl border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)] rotate-[10deg] z-10 hover:z-40 transition-all cursor-pointer bg-[#05070a]"
                  whileHover={{ scale: 1.1, rotate: 0 }}
                />

                {/* Imagem Central (Fica por cima) */}
                <motion.img 
                  src="/provas-sociais/prova2.png" 
                  alt="Prova Social 2"
                  className="absolute w-36 md:w-52 h-[290px] md:h-[310px] object-cover rounded-xl border-2 border-neon-green/60 shadow-[0_0_30px_rgba(0,255,157,0.25)] z-20 hover:z-40 transition-all cursor-pointer bg-[#05070a]"
                  whileHover={{ scale: 1.1, rotate: 0 }}
                />
              </div>

              <button 
                onClick={() => setStep(3.5)}
                className="w-full max-w-sm mt-4 bg-neon-cyan text-black uppercase font-bold tracking-widest py-4 rounded-sm hover:-translate-y-1 shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
              >
                [ AVANÇAR ]
              </button>
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
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">Acesso Exclusivo Liberado!</h2>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Este é o método essencial que falta para alavancar seu projeto:
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-4 p-4 card border border-white/5 bg-[#0d1117] hover:border-yellow-500/30 transition-colors">
                   <div className="bg-yellow-500/10 p-3 rounded-lg"><PackageOpen className="text-yellow-500" size={24}/></div>
                   <div className="text-left">
                     <h3 className="font-bold text-white text-base">Módulo: A Mina de Ouro</h3>
                     <p className="text-sm text-slate-400 mt-1">Ideias infinitas e validadas.</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 p-4 card border border-white/5 bg-[#0d1117] hover:border-cyan-500/30 transition-colors">
                   <div className="bg-cyan-500/10 p-3 rounded-lg"><Scissors className="text-cyan-500" size={24}/></div>
                   <div className="text-left">
                     <h3 className="font-bold text-white text-base">Módulo: Edição Magnética</h3>
                     <p className="text-sm text-slate-400 mt-1">Acabe com a maldição das 200 views.</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 p-4 card border border-white/5 bg-[#0d1117] hover:border-purple-500/30 transition-colors">
                   <div className="bg-purple-500/10 p-3 rounded-lg"><Brain className="text-purple-400" size={24}/></div>
                   <div className="text-left">
                     <h3 className="font-bold text-white text-base">Mentoria de Elite</h3>
                     <p className="text-sm text-slate-400 mt-1">Orientações direto no seu perfil.</p>
                   </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(4)}
                className="w-full mt-4 bg-yellow-500 text-black uppercase font-bold tracking-widest py-4 rounded-sm hover:-translate-y-1 transition-transform shadow-[0_0_20px_rgba(234,179,8,0.2)]"
              >
                [ GARANTIR ACESSO E CONTINUAR ]
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
              <p className="text-red-200/70 mb-8 text-base max-w-sm mx-auto">
                Mentalidade incompatível. Se você está buscando apenas apertar um botão e não trabalhar, não há solução mágica que fará o trabalho por você.
              </p>
              <button 
                onClick={() => { window.location.reload(); }}
                className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-black uppercase font-bold tracking-widest py-4 transition-all"
              >
                Recomeçar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
