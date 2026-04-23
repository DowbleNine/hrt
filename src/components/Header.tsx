import {Gamepad2} from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-neon-green rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)]">
            <Gamepad2 className="text-black w-6 h-6" />
          </div>
          <span className="text-xl font-display font-extrabold tracking-tighter text-white">
            VIRAL<span className="text-neon-green">GAMER</span>
          </span>
        </div>
        
        <button className="btn-outline text-sm md:text-base">
          ÁREA DO ALUNO
        </button>
      </div>
    </header>
  );
}
