export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-bg border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-8 font-display font-extrabold tracking-tighter text-xl">
          VIRAL<span className="text-neon-green">GAMER</span>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-500 font-medium">
          <a href="#" className="hover:text-neon-green transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-neon-green transition-colors">Políticas de Privacidade</a>
          <a href="#" className="hover:text-neon-green transition-colors">Contato</a>
        </nav>
        
        <p className="text-gray-600 text-xs">
          © {currentYear} Viral Gamer Academy. Todos os direitos reservados.
        </p>
        <p className="text-gray-700 text-[10px] mt-4 max-w-md mx-auto">
          AVISO LEGAL: Os resultados mencionados podem variar de pessoa para pessoa. Este site não faz parte do Google ou Facebook.
        </p>
      </div>
    </footer>
  );
}
