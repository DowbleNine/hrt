import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-900/10 z-0"></div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-emerald-500/50 p-8 rounded-xl z-10 shadow-[0_0_40px_rgba(16,185,129,0.15)] text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(52,211,153,0.5)]">
          <CheckCircle2 size={32} className="text-black" />
        </div>
        
        <h1 className="text-2xl font-black text-white uppercase mb-2">Sucesso!</h1>
        <p className="text-gray-400 text-sm mb-8">
          Seu pedido foi processado. Em breve você receberá os detalhes no seu e-mail.
        </p>

        <button 
          onClick={() => navigate('/')}
          className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-black font-bold uppercase py-4 rounded-lg mt-4 transition-all hover:scale-105"
        >
          Voltar ao Início
        </button>
      </motion.div>
    </div>
  );
}
