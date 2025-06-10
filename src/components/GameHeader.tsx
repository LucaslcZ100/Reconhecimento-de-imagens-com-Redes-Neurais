
import { Badge } from '@/components/ui/badge';

const GameHeader = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
        🧠 Reconhecimento de Imagens com Redes Neurais
      </h1>
      <p className="text-orange-300 text-lg max-w-3xl mx-auto font-medium">
        Descubra como os computadores "veem" e classificam objetos usando inteligência artificial
      </p>
    </div>
  );
};

export default GameHeader;
