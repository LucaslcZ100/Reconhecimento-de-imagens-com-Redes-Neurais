
import { Badge } from '@/components/ui/badge';

interface GameScoreProps {
  score: number;
  gameRound: number;
  gameStarted: boolean;
}

const GameScore = ({ score, gameRound, gameStarted }: GameScoreProps) => {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <Badge variant="default" className="text-lg px-6 py-2 bg-green-100 text-green-800">
        🏆 Pontos: {score}
      </Badge>
      {gameStarted && (
        <Badge variant="outline" className="text-lg px-6 py-2">
          🎮 Análise: {gameRound}
        </Badge>
      )}
    </div>
  );
};

export default GameScore;
