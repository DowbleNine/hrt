import React from 'react';
import { Shield, Brain, Eye, PackageOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface AttributePanelProps {
  attributes: {
    foco: number;
    resiliencia: number;
    visao: number;
  };
}

export default function AttributePanel({ attributes }: AttributePanelProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Atributos do Sistema */}
      <div className="card glitch-box flex flex-col p-6 border-cyan-500/30">
        <h3 className="text-sm font-mono text-neon-cyan mb-4 uppercase tracking-widest flex items-center gap-2">
          <Brain size={14} /> Atributos_
        </h3>
        
        <div className="space-y-4">
          <AttributeRow label="Foco" value={attributes.foco} icon={<Shield size={12} />} color="bg-neon-green" />
          <AttributeRow label="Resiliência" value={attributes.resiliencia} icon={<Brain size={12} />} color="bg-neon-cyan" />
          <AttributeRow label="Visão" value={attributes.visao} icon={<Eye size={12} />} color="bg-purple-500" />
        </div>
      </div>

      {/* Inventário Simulado */}
      <div className="card p-6 border-white/5 bg-black/60">
        <h3 className="text-sm font-mono text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
          <PackageOpen size={14} /> Inventário_
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-slate-900/50 border border-slate-800 rounded flex items-center justify-center opacity-50 relative group cursor-not-allowed">
              <span className="text-[10px] font-mono text-slate-600">SLOT_{i+1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AttributeRow({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs font-mono">
        <div className="flex items-center gap-1 text-slate-300">
          {icon} <span className="uppercase">{label}</span>
        </div>
        <span className="text-white">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value, 100)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}
