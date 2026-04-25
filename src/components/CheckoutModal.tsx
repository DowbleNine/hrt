import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, CheckCircle, Loader2, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  amount: number;
}

const API_URL = 'https://viral-gamer-api.onrender.com'; // Ou onde seu server estiver rodando

export default function CheckoutModal({ isOpen, onClose, productName, amount }: CheckoutModalProps) {
  const [step, setStep] = useState<'info' | 'pix'>('info');
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<{ qr_code_text: string, transaction_id: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<string>('PENDING');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    document: ''
  });

  // Polling para verificar status do pagamento
  useEffect(() => {
    let interval: any;
    if (pixData?.transaction_id && status === 'PENDING') {
      interval = setInterval(async () => {
        try {
          const res = await axios.get(`${API_URL}/api/payments/status/${pixData.transaction_id}`);
          if (res.data.status === 'COMPLETED') {
            setStatus('COMPLETED');
            clearInterval(interval);
            // Redirecionar após 2 segundos
            setTimeout(() => {
              const tier = amount >= 90 ? 'high' : 'low';
              window.location.href = `/sucesso?email=${formData.email}&tier=${tier}`;
            }, 2000);
          }
        } catch (e) {
          console.error('Erro polling status');
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [pixData, status, formData.email, amount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/payments/create`, {
        ...formData,
        amount,
        product_name: productName
      });
      setPixData(res.data);
      setStep('pix');
    } catch (error) {
      alert('Erro ao gerar PIX. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (pixData?.qr_code_text) {
      navigator.clipboard.writeText(pixData.qr_code_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0f0f0f] border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-neon-green/10 to-transparent">
          <div>
            <h2 className="text-lg font-black uppercase text-white tracking-tighter">Checkout Seguro</h2>
            <p className="text-[10px] text-neon-green font-bold uppercase tracking-widest">{productName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {step === 'info' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Nome Completo</label>
                <input 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green transition-colors outline-none"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">E-mail</label>
                <input 
                  required
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green transition-colors outline-none"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">CPF</label>
                <input 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green transition-colors outline-none"
                  placeholder="000.000.000-00"
                  value={formData.document}
                  onChange={e => setFormData({...formData, document: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <div className="flex justify-between items-center mb-6 px-1">
                  <span className="text-gray-400 font-bold uppercase text-xs">Total:</span>
                  <span className="text-2xl font-black neon-text">R$ {amount.toFixed(2)}</span>
                </div>
                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full bg-neon-green text-black font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Gerar PIX de Pagamento'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-6">
              {status === 'PENDING' ? (
                <>
                  <div className="bg-white p-4 rounded-xl inline-block shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <QRCodeSVG value={pixData?.qr_code_text || ''} size={180} />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Escaneie o código com seu banco ou copie o código abaixo:</p>
                    <button 
                      onClick={copyToClipboard}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between group hover:bg-white/10 transition-colors"
                    >
                      <span className="text-[10px] text-gray-400 font-mono truncate mr-4">{pixData?.qr_code_text}</span>
                      {copied ? <CheckCircle className="text-neon-green shrink-0" size={18} /> : <Copy className="text-gray-500 group-hover:text-white shrink-0" size={18} />}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-neon-green animate-pulse py-4">
                    <Loader2 className="animate-spin" size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Aguardando Pagamento...</span>
                  </div>
                </>
              ) : (
                <div className="py-8 space-y-4">
                  <div className="w-16 h-16 bg-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-black" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase">Pagamento Aprovado!</h3>
                  <p className="text-gray-400 text-sm">Preparando seu acesso em instantes...</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-4 bg-black/40 text-center">
          <p className="text-[8px] text-gray-600 font-bold uppercase tracking-[0.3em]">Ambiente Seguro & Criptografado</p>
        </div>
      </motion.div>
    </div>
  );
}
