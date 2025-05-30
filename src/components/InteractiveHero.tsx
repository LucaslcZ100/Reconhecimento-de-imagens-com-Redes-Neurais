
import React, { useState, useEffect, useRef } from 'react';
import { Brain, Eye, Zap, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InteractiveHeroProps {
  onStartIntroduction: () => void;
}

const InteractiveHero = ({ onStartIntroduction }: InteractiveHeroProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [neurons, setNeurons] = useState<Array<{ id: number; x: number; y: number; active: boolean }>>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Gerar neurônios aleatórios
    const neuronArray = Array.from({ length: 25 }, (_, i) => ({
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-yellow-900 to-orange-900"
    >
      {/* Neurônios interativos */}
      {neurons.map((neuron) => (
        <div
          key={neuron.id}
          className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
            neuron.active
              ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 scale-150'
              : 'bg-yellow-600/30'
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
        {neurons.slice(0, 10).map((neuron, i) => {
          const nextNeuron = neurons[(i + 1) % 10];
          const opacity = neuron.active || nextNeuron.active ? 0.6 : 0.1;
          return (
            <line
              key={`connection-${i}`}
              x1={`${neuron.x}%`}
              y1={`${neuron.y}%`}
              x2={`${nextNeuron.x}%`}
              y2={`${nextNeuron.y}%`}
              stroke="#fbbf24"
              strokeWidth="1"
              opacity={opacity}
              className="transition-opacity duration-300"
            />
          );
        })}
      </svg>

      {/* Cursor seguidor */}
      <div
        className="absolute w-6 h-6 bg-yellow-400 rounded-full opacity-50 pointer-events-none animate-pulse"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}
      />

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8 flex justify-center items-center gap-4">
          <Brain className="h-16 w-16 animate-pulse text-yellow-400" />
          <Eye className="h-12 w-12 animate-bounce text-orange-400" />
          <Zap className="h-14 w-14 animate-pulse text-yellow-400" />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
          IA Reconhece
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-yellow-200">
          Como os Computadores Veem o Mundo
        </h2>

        <p className="text-xl md:text-2xl mb-12 leading-relaxed text-yellow-100">
          Descubra os segredos por trás do reconhecimento de imagens com{' '}
          <span className="font-bold text-orange-300">
            Inteligência Artificial
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            onClick={onStartIntroduction}
            size="lg"
            className="text-xl px-8 py-6 font-semibold transition-all duration-300 hover:scale-105 bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/25"
          >
            🚀 Começar Jornada
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-lg text-yellow-300">
          <MousePointer className="h-5 w-5" />
          <span className="animate-pulse">Mova o mouse para ativar os neurônios</span>
        </div>
      </div>

      {/* Efeito de partículas */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full animate-ping bg-yellow-400"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + i * 8}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveHero;
