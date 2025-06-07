
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RotateCcw, Home } from 'lucide-react';

interface AnalysisCompletedDialogProps {
  isOpen: boolean;
  onNewAnalysis: () => void;
  onEndSimulation: () => void;
  currentScore: number;
  currentRound: number;
}

const AnalysisCompletedDialog = ({ 
  isOpen, 
  onNewAnalysis, 
  onEndSimulation, 
  currentScore, 
  currentRound 
}: AnalysisCompletedDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-yellow-800 mb-2">
            🎯 Análise Concluída!
          </DialogTitle>
          <DialogDescription className="text-center text-gray-700">
            <div className="space-y-3">
              <p className="text-lg">
                Análise #{currentRound} finalizada com sucesso!
              </p>
              <div className="bg-white p-3 rounded-lg border border-yellow-200">
                <p className="font-medium text-yellow-700">
                  Pontuação atual: <span className="text-xl">{currentScore}</span> pontos
                </p>
              </div>
              <p className="text-sm text-gray-600">
                O que você gostaria de fazer agora?
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={onNewAnalysis}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            🔄 Nova Análise
          </Button>
          
          <Button
            onClick={onEndSimulation}
            variant="outline"
            className="w-full border-red-300 text-red-700 hover:bg-red-50"
          >
            <Home className="h-4 w-4 mr-2" />
            🏁 Encerrar Simulação
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700 text-center">
            💡 Dica: Cada análise ajuda a entender melhor como a IA classifica objetos!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisCompletedDialog;
