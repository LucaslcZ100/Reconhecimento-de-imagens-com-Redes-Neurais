
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Target, RotateCcw, Star, MousePointer } from 'lucide-react';

interface GameResultsProps {
  score: number;
  gameRound: number;
  timeElapsed: number;
  onRestart: () => void;
}

const GameResults = ({ score, gameRound, timeElapsed, onRestart }: GameResultsProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [neurons, setNeurons] = useState<Array<{ id: number; x: number; y: number; active: boolean }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Gerar neurônios para background interativo
    const neuronArray = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      active: false
    }));
    setNeurons(neuronArray);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
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
        active: distance < 25
      };
    }));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getPerformanceLevel = () => {
    const accuracy = gameRound > 0 ? (score / (gameRound * 10)) * 100 : 0;
    if (accuracy >= 80) return { level: 'Excelente', icon: '🏆', color: 'text-yellow-400', message: 'Você dominou o reconhecimento de padrões!' };
    if (accuracy >= 60) return { level: 'Bom', icon: '⭐', color: 'text-orange-400', message: 'Ótimo trabalho identificando características!' };
    if (accuracy >= 40) return { level: 'Regular', icon: '👍', color: 'text-yellow-300', message: 'Continue praticando para melhorar!' };
    return { level: 'Continue Praticando', icon: '💪', color: 'text-orange-300', message: 'Cada erro é uma oportunidade de aprender!' };
  };

  const performance = getPerformanceLevel();

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-gradient-to-br from-black via-yellow-900 to-orange-900 relative overflow-hidden p-4"
    >
      {/* Background interativo */}
      {neurons.map((neuron) => (
        <div
          key={neuron.id}
          className={`absolute w-3 h-3 rounded-full transition-all duration-300 pointer-events-none ${
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

      {/* Cursor seguidor */}
      <div
        className="absolute w-5 h-5 bg-orange-400 rounded-full opacity-50 pointer-events-none animate-pulse"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <Card className="max-w-2xl mx-auto bg-black border-yellow-400 text-yellow-100">
          <CardHeader className="text-center bg-gradient-to-r from-yellow-900 to-orange-900">
            <CardTitle className="text-3xl flex items-center justify-center gap-3 text-yellow-300">
              <Trophy className="h-8 w-8" />
              🎉 Simulação Finalizada!
            </CardTitle>
            <div className="flex items-center justify-center gap-2 text-sm text-yellow-300 mt-2">
              <MousePointer className="h-4 w-4" />
              <span>Continue movendo o mouse para ver os neurônios!</span>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-yellow-400 animate-pulse">
                {score}
              </div>
              <p className="text-xl text-yellow-200">
                Pontos Totais
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 rounded-lg bg-yellow-900 border border-yellow-600">
                <Target className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold text-yellow-200">
                  {gameRound}
                </div>
                <p className="text-sm text-yellow-300">
                  Análises Realizadas
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-yellow-900 border border-yellow-600">
                <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold text-yellow-200">
                  {formatTime(timeElapsed)}
                </div>
                <p className="text-sm text-yellow-300">
                  Tempo Total
                </p>
              </div>
            </div>

            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-yellow-800 to-orange-800 border border-yellow-500">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl">{performance.icon}</span>
                <p className={`text-xl font-bold ${performance.color}`}>
                  {performance.level}
                </p>
              </div>
              <p className="text-sm text-yellow-200 mb-2">
                Precisão: {gameRound > 0 ? Math.round((score / (gameRound * 10)) * 100) : 0}%
              </p>
              <p className="text-xs text-orange-200">
                {performance.message}
              </p>
            </div>

            <div className="space-y-3">
              <Badge variant="outline" className="w-full justify-center text-sm py-2 bg-yellow-900 text-yellow-200 border-yellow-600">
                🧠 Aprendizado: Assim como uma rede neural real, você melhorou com a prática!
              </Badge>
              
              <Badge variant="outline" className="w-full justify-center text-sm py-2 bg-orange-900 text-orange-200 border-orange-600">
                🔍 Cada análise que você fez simula milhares de cálculos que uma IA real executa
              </Badge>
              
              <Button
                onClick={onRestart}
                size="lg"
                className="w-full text-lg py-6 bg-yellow-500 hover:bg-yellow-400 text-black transition-all duration-300 hover:scale-105"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                🔄 Nova Simulação
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameResults;
