
import React, { useState, useEffect, useRef } from 'react';
import { Brain, Eye, Zap, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InteractiveHeroProps {
  onStartIntroduction: () => void;
  isDarkTheme: boolean;
}

const InteractiveHero = ({ onStartIntroduction, isDarkTheme }: InteractiveHeroProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [neurons, setNeurons] = useState<Array<{ id: number; x: number; y: number; active: boolean }>>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Gerar neurônios aleatórios
    const neuronArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      active: false
    }));
    setNeurons(neuronArray);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
    
    // Ativar neurônios próximos ao mouse
    setNeurons(prev => prev.map(neuron => {
      const distance = Math.sqrt(
        Math.pow(neuron.x - x, 2) + Math.pow(neuron.y - y, 2)
      );
      return {
        ...neuron,
        active: distance < 15
      };
    }));
  };

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDarkTheme
          ? 'bg-gradient-to-br from-black via-yellow-900 to-orange-900'
          : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100'
      }`}
    >
      {/* Neurônios interativos */}
      {neurons.map((neuron) => (
        <div
          key={neuron.id}
          className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
            neuron.active
              ? isDarkTheme
                ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 scale-150'
                : 'bg-blue-500 shadow-lg shadow-blue-500/50 scale-150'
              : isDarkTheme
                ? 'bg-yellow-600/30'
                : 'bg-blue-300/30'
          }`}
          style={{
            left: `${neuron.x}%`,
            top: `${neuron.y}%`,
          }}
        />
      ))}

      {/* Conexões neurais dinâmicas */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {neurons.slice(0, 8).map((neuron, i) => {
          const nextNeuron = neurons[(i + 1) % 8];
          const opacity = neuron.active || nextNeuron.active ? 0.6 : 0.1;
          return (
            <line
              key={`connection-${i}`}
              x1={`${neuron.x}%`}
              y1={`${neuron.y}%`}
              x2={`${nextNeuron.x}%`}
              y2={`${nextNeuron.y}%`}
              stroke={isDarkTheme ? '#fbbf24' : '#3b82f6'}
              strokeWidth="1"
              opacity={opacity}
              className="transition-opacity duration-300"
            />
          );
        })}
      </svg>

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8 flex justify-center items-center gap-4">
          <Brain className={`h-16 w-16 animate-pulse ${
            isDarkTheme ? 'text-yellow-400' : 'text-blue-600'
          }`} />
          <Eye className={`h-12 w-12 animate-bounce ${
            isDarkTheme ? 'text-orange-400' : 'text-purple-600'
          }`} />
          <Zap className={`h-14 w-14 animate-pulse ${
            isDarkTheme ? 'text-yellow-400' : 'text-blue-600'
          }`} />
        </div>

        <h1 className={`text-6xl md:text-7xl font-bold mb-6 ${
          isDarkTheme
            ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent'
        }`}>
          IA Reconhece
        </h1>

        <h2 className={`text-3xl md:text-4xl font-semibold mb-8 ${
          isDarkTheme ? 'text-yellow-200' : 'text-gray-700'
        }`}>
          Como os Computadores Veem o Mundo
        </h2>

        <p className={`text-xl md:text-2xl mb-12 leading-relaxed ${
          isDarkTheme ? 'text-yellow-100' : 'text-gray-600'
        }`}>
          Descubra os segredos por trás do reconhecimento de imagens com{' '}
          <span className={`font-bold ${
            isDarkTheme ? 'text-orange-300' : 'text-purple-600'
          }`}>
            Inteligência Artificial
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            onClick={onStartIntroduction}
            size="lg"
            className={`text-xl px-8 py-6 font-semibold transition-all duration-300 hover:scale-105 ${
              isDarkTheme
                ? 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/25'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
            }`}
          >
            🚀 Começar Jornada
          </Button>
        </div>

        <div className={`flex items-center justify-center gap-2 text-lg ${
          isDarkTheme ? 'text-yellow-300' : 'text-gray-500'
        }`}>
          <MousePointer className="h-5 w-5" />
          <span className="animate-pulse">Mova o mouse para ativar os neurônios</span>
        </div>
      </div>

      {/* Efeito de partículas */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 rounded-full animate-ping ${
              isDarkTheme ? 'bg-yellow-400' : 'bg-blue-400'
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveHero;
