
import { Badge } from '@/components/ui/badge';

const GameHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="relative">
        {/* Efeito de brilho de fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-300/30 to-yellow-400/20 blur-xl rounded-lg"></div>
        
        <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl p-8 shadow-2xl border-2 border-yellow-300">
          <h1 className="text-5xl font-bold text-black mb-4 tracking-tight">
            🧠 RECONHECIMENTO DE IMAGENS COM REDES NEURAIS
          </h1>
          <div className="w-24 h-1 bg-black mx-auto mb-4 rounded-full"></div>
          <p className="text-xl text-black font-semibold max-w-3xl mx-auto leading-relaxed">
            Descubra como os computadores "veem" e classificam objetos usando inteligência artificial
          </p>
          
          {/* Badges decorativos */}
          <div className="flex justify-center gap-3 mt-6">
            <Badge className="bg-black text-yellow-400 font-semibold px-4 py-2 text-sm border-2 border-yellow-400">
              🎯 Educacional
            </Badge>
            <Badge className="bg-black text-yellow-400 font-semibold px-4 py-2 text-sm border-2 border-yellow-400">
              🔬 Interativo
            </Badge>
            <Badge className="bg-black text-yellow-400 font-semibold px-4 py-2 text-sm border-2 border-yellow-400">
              🚀 Inovador
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
