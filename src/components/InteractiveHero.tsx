
import React, { useState, useEffect, useRef } from 'react';
import { Brain, Eye, Zap, MousePointer, Star, Trophy, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface InteractiveHeroProps {
  onStartIntroduction: () => void;
}

const InteractiveHero = ({ onStartIntroduction }: InteractiveHeroProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [neurons, setNeurons] = useState<Array<{ id: number; x: number; y: number; active: boolean }>>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Gerar neurônios aleatórios
    const neuronArray = Array.from({ length: 30 }, (_, i) => ({
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

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-yellow-400" />,
      title: "IA Avançada",
      description: "Sistema baseado em redes neurais modernas"
    },
    {
      icon: <Eye className="h-8 w-8 text-yellow-400" />,
      title: "Visão Computacional",
      description: "Reconhecimento preciso de imagens e objetos"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      title: "Processamento Rápido",
      description: "Análise instantânea em tempo real"
    }
  ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "10,000+", label: "Usuários Ativos" },
    { icon: <CheckCircle className="h-6 w-6" />, value: "99.8%", label: "Precisão" },
    { icon: <Trophy className="h-6 w-6" />, value: "50,000+", label: "Análises Realizadas" }
  ];

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-yellow-900 to-yellow-800"
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
        {neurons.slice(0, 15).map((neuron, i) => {
          const nextNeuron = neurons[(i + 1) % 15];
          const opacity = neuron.active || nextNeuron.active ? 0.8 : 0.2;
          return (
            <line
              key={`connection-${i}`}
              x1={`${neuron.x}%`}
              y1={`${neuron.y}%`}
              x2={`${nextNeuron.x}%`}
              y2={`${nextNeuron.y}%`}
              stroke="#fbbf24"
              strokeWidth="2"
              opacity={opacity}
              className="transition-opacity duration-300"
            />
          );
        })}
      </svg>

      {/* Cursor seguidor */}
      <div
        className="absolute w-8 h-8 bg-yellow-400 rounded-full opacity-60 pointer-events-none animate-pulse border-2 border-yellow-200"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}
      />

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Badges de credibilidade */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-400/30">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-yellow-200 text-sm font-medium">Certificado IA</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-400/30">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-200 text-sm font-medium">Award Winner</span>
          </div>
        </div>

        <div className="mb-12 flex justify-center items-center gap-6">
          <Brain className="h-20 w-20 animate-pulse text-yellow-400 drop-shadow-lg" />
          <Eye className="h-16 w-16 animate-bounce text-yellow-300 drop-shadow-lg" />
          <Zap className="h-18 w-18 animate-pulse text-yellow-400 drop-shadow-lg" />
        </div>

        <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
          IA Reconhece
        </h1>

        <h2 className="text-4xl md:text-5xl font-semibold mb-8 text-black bg-yellow-400/90 px-8 py-4 rounded-2xl shadow-2xl mx-auto max-w-4xl">
          Como os Computadores Veem o Mundo
        </h2>

        <p className="text-2xl md:text-3xl mb-12 leading-relaxed text-yellow-100 font-medium max-w-4xl mx-auto">
          Explore os segredos por trás do reconhecimento de imagens com{' '}
          <span className="font-bold text-yellow-300 bg-black/30 px-3 py-1 rounded-lg">
            Inteligência Artificial de Ponta
          </span>
        </p>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-black/40 border-yellow-400/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3 text-yellow-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">{stat.value}</div>
                <div className="text-yellow-200 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recursos destacados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-400/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-3 bg-yellow-400 px-3 py-1 rounded-lg">
                  {feature.title}
                </h3>
                <p className="text-yellow-200 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <Button
            onClick={onStartIntroduction}
            size="lg"
            className="text-2xl px-12 py-8 font-bold transition-all duration-300 hover:scale-110 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black shadow-2xl shadow-yellow-500/25 border-2 border-yellow-300 rounded-2xl"
          >
            🚀 Iniciar Experiência Premium
          </Button>
        </div>

        <div className="flex items-center justify-center gap-3 text-xl text-yellow-300 bg-black/30 px-6 py-3 rounded-full">
          <MousePointer className="h-6 w-6 animate-bounce" />
          <span className="font-medium">Mova o mouse para ativar os neurônios</span>
        </div>
      </div>

      {/* Efeito de partículas melhorado */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full animate-ping bg-yellow-400"
            style={{
              left: `${15 + i * 7}%`,
              top: `${25 + i * 6}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveHero;
