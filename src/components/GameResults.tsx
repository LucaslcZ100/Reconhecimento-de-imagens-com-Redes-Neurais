
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Target, RotateCcw, Star } from 'lucide-react';

interface GameResultsProps {
  score: number;
  gameRound: number;
  timeElapsed: number;
  onRestart: () => void;
  isDarkTheme: boolean;
}

const GameResults = ({ score, gameRound, timeElapsed, onRestart, isDarkTheme }: GameResultsProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getPerformanceLevel = () => {
    const accuracy = gameRound > 0 ? (score / (gameRound * 10)) * 100 : 0;
    if (accuracy >= 80) return { level: 'Excelente', icon: '🏆', color: 'text-yellow-600' };
    if (accuracy >= 60) return { level: 'Bom', icon: '⭐', color: 'text-blue-600' };
    if (accuracy >= 40) return { level: 'Regular', icon: '👍', color: 'text-green-600' };
    return { level: 'Continue Praticando', icon: '💪', color: 'text-purple-600' };
  };

  const performance = getPerformanceLevel();

  return (
    <Card className={`max-w-2xl mx-auto ${
      isDarkTheme 
        ? 'bg-black border-yellow-400 text-yellow-100' 
        : 'bg-white border-blue-300'
    }`}>
      <CardHeader className={`text-center ${
        isDarkTheme 
          ? 'bg-gradient-to-r from-yellow-900 to-orange-900' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50'
      }`}>
        <CardTitle className={`text-3xl flex items-center justify-center gap-3 ${
          isDarkTheme ? 'text-yellow-300' : 'text-blue-800'
        }`}>
          <Trophy className="h-8 w-8" />
          🎉 Simulação Finalizada!
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <div className="text-center space-y-4">
          <div className={`text-6xl font-bold ${
            isDarkTheme ? 'text-yellow-400' : 'text-blue-600'
          }`}>
            {score}
          </div>
          <p className={`text-xl ${
            isDarkTheme ? 'text-yellow-200' : 'text-gray-700'
          }`}>
            Pontos Totais
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className={`text-center p-4 rounded-lg ${
            isDarkTheme 
              ? 'bg-yellow-900 border border-yellow-600' 
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <Target className={`h-8 w-8 mx-auto mb-2 ${
              isDarkTheme ? 'text-yellow-300' : 'text-blue-600'
            }`} />
            <div className={`text-2xl font-bold ${
              isDarkTheme ? 'text-yellow-200' : 'text-blue-800'
            }`}>
              {gameRound}
            </div>
            <p className={`text-sm ${
              isDarkTheme ? 'text-yellow-300' : 'text-blue-600'
            }`}>
              Análises Realizadas
            </p>
          </div>

          <div className={`text-center p-4 rounded-lg ${
            isDarkTheme 
              ? 'bg-yellow-900 border border-yellow-600' 
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <Clock className={`h-8 w-8 mx-auto mb-2 ${
              isDarkTheme ? 'text-yellow-300' : 'text-blue-600'
            }`} />
            <div className={`text-2xl font-bold ${
              isDarkTheme ? 'text-yellow-200' : 'text-blue-800'
            }`}>
              {formatTime(timeElapsed)}
            </div>
            <p className={`text-sm ${
              isDarkTheme ? 'text-yellow-300' : 'text-blue-600'
            }`}>
              Tempo Total
            </p>
          </div>
        </div>

        <div className={`text-center p-6 rounded-lg ${
          isDarkTheme 
            ? 'bg-gradient-to-r from-yellow-800 to-orange-800 border border-yellow-500' 
            : 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl">{performance.icon}</span>
            <p className={`text-xl font-bold ${performance.color}`}>
              {performance.level}
            </p>
          </div>
          <p className={`text-sm ${
            isDarkTheme ? 'text-yellow-200' : 'text-gray-600'
          }`}>
            Precisão: {gameRound > 0 ? Math.round((score / (gameRound * 10)) * 100) : 0}%
          </p>
        </div>

        <div className="space-y-3">
          <Badge variant="outline" className={`w-full justify-center text-sm py-2 ${
            isDarkTheme 
              ? 'bg-yellow-900 text-yellow-200 border-yellow-600' 
              : 'bg-blue-100 text-blue-800 border-blue-300'
          }`}>
            🧠 Aprendizado: Assim como uma rede neural real, você melhorou com a prática!
          </Badge>
          
          <Button
            onClick={onRestart}
            size="lg"
            className={`w-full text-lg py-6 ${
              isDarkTheme 
                ? 'bg-yellow-500 hover:bg-yellow-400 text-black' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            🔄 Nova Simulação
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameResults;
