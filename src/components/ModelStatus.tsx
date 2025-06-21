
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ModelStatusProps {
  isDarkTheme: boolean;
}

const ModelStatus = ({ isDarkTheme }: ModelStatusProps) => {
  const [modelStatus, setModelStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');

  useEffect(() => {
    // Simula verificação do status do modelo
    const checkModelStatus = async () => {
      try {
        // Verifica se TensorFlow.js está disponível
        const tf = await import('@tensorflow/tfjs');
        await tf.ready();
        setModelStatus('ready');
      } catch {
        setModelStatus('fallback');
      }
    };

    checkModelStatus();
  }, []);

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
      isDarkTheme 
        ? 'bg-black border-orange-500' 
        : 'bg-white border-gray-200'
    }`}>
      {modelStatus === 'loading' && (
        <>
          <Zap className={`h-4 w-4 animate-spin ${
            isDarkTheme ? 'text-yellow-400' : 'text-blue-500'
          }`} />
          <Badge variant="outline" className={`text-xs ${
            isDarkTheme ? 'bg-yellow-900 text-yellow-200 border-yellow-600' : 'bg-blue-100 text-blue-800'
          }`}>
            🤖 Carregando IA
          </Badge>
        </>
      )}
      
      {modelStatus === 'ready' && (
        <>
          <Brain className={`h-4 w-4 ${
            isDarkTheme ? 'text-green-400' : 'text-green-600'
          }`} />
          <Badge variant="outline" className={`text-xs ${
            isDarkTheme ? 'bg-green-900 text-green-200 border-green-600' : 'bg-green-100 text-green-800'
          }`}>
            🧠 IA Avançada Ativa
          </Badge>
        </>
      )}
      
      {modelStatus === 'fallback' && (
        <>
          <AlertCircle className={`h-4 w-4 ${
            isDarkTheme ? 'text-orange-400' : 'text-orange-600'
          }`} />
          <Badge variant="outline" className={`text-xs ${
            isDarkTheme ? 'bg-orange-900 text-orange-200 border-orange-600' : 'bg-orange-100 text-orange-800'
          }`}>
            🔍 Análise Heurística
          </Badge>
        </>
      )}
    </div>
  );
};

export default ModelStatus;
