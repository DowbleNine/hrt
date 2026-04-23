import { useEffect, useRef } from 'react';

interface TerminalLogProps {
  logs: string[];
}

export default function TerminalLog({ logs }: TerminalLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="card h-full flex flex-col glitch-box min-h-[300px]">
      <div className="border-b border-neon-green/20 p-3 bg-neon-green/5 flex items-center justify-between">
        <span className="text-xs text-neon-green font-mono tracking-widest uppercase">System_Log</span>
        <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-xs flex flex-col gap-2 relative scrollbar-hide"
      >
        {logs.map((log, i) => (
          <div key={i} className="animate-fade-in flex gap-2">
            <span className="text-slate-500">[{new Date().toLocaleTimeString('en-US', {hour12:false})}]</span>
            <span className={log.includes('ERROR') ? 'text-red-500' : 'text-neon-cyan'}>{log}</span>
          </div>
        ))}
        {/* Blinking Cursor */}
        <div className="flex gap-2 text-neon-green">
          <span>&gt;</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
}
