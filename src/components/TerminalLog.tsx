import { useEffect, useRef, useState } from 'react';

interface TerminalLogProps {
  logs: string[];
}

const SOCIAL_PROOF_EVENTS = [
  "> [Log] Usuário Player_Gabriel22 atingiu 1.2M views na rede [TikTok].",
  "> [Log] Usuário Ninja_Cortes desbloqueou [Monetização em Dólar].",
  "> [Log] Novo membro no esquadrão Mentoria Elite.",
  "> [Log] Usuário Carol_Viral atingiu 200mil visualizações no Instagram.",
  "> [Log] Usuário Anon_01 atingiu 1.3 milhões de visualizações no TikTok.",
  "> [Log] Saque de U$ 450,00 confirmado para usuário Stealth_BR."
];

export default function TerminalLog({ logs: externalLogs }: TerminalLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [internalLogs, setInternalLogs] = useState<string[]>([]);

  // Combinar logs enviados pelo componente pai com os inventados internamente
  const allLogs = [...externalLogs, ...internalLogs];

  useEffect(() => {
    // Scroll para baixo sempre que um log é adicionado
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [allLogs]);

  useEffect(() => {
    // Lógica para pingar Social Proof de usuários esporadicamente
    const interval = setInterval(() => {
      // Pequena chance de disparar um log a cada 4 segundos (para não ficar muito spam)
      if (Math.random() > 0.4) {
        const randomEvent = SOCIAL_PROOF_EVENTS[Math.floor(Math.random() * SOCIAL_PROOF_EVENTS.length)];
        setInternalLogs(prev => [...prev, randomEvent]);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card h-full flex flex-col glitch-box min-h-[300px]">
      <div className="border-b border-neon-green/20 p-3 bg-neon-green/5 flex items-center justify-between">
        <span className="text-xs text-neon-green font-mono tracking-widest uppercase">System_Log</span>
        <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-xs flex flex-col gap-2 relative scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {allLogs.map((log, i) => {
          // Identificar se é social proof para mudar cor
          const isAchievement = log.includes('views') || log.includes('desbloqueou') || log.includes(' Mentoria Elite') || log.includes('Saque');
          
          return (
            <div key={i} className="animate-fade-in flex gap-2">
              <span className="text-slate-500">[{new Date().toLocaleTimeString('en-US', {hour12:false})}]</span>
              <span className={log.includes('ERROR') ? 'text-red-500' : isAchievement ? 'text-green-300' : 'text-neon-cyan'}>
                {log}
              </span>
            </div>
          );
        })}
        {/* Blinking Cursor */}
        <div className="flex gap-2 text-neon-green">
          <span>&gt;</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
}
