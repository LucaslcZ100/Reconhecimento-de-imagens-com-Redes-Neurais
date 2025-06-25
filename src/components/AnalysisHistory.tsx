
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Trash2, User } from 'lucide-react';
import { AnalysisHistory as AnalysisHistoryType, getAnalysisHistory, clearAnalysisHistory } from '@/utils/imageAnalysis';
import { useState, useEffect } from 'react';

interface AnalysisHistoryProps {
  isDarkTheme: boolean;
  onHistoryUpdate?: () => void;
}

const AnalysisHistory = ({ isDarkTheme, onHistoryUpdate }: AnalysisHistoryProps) => {
  const [history, setHistory] = useState<AnalysisHistoryType[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const savedHistory = getAnalysisHistory();
    setHistory(savedHistory);
  };

  const handleClearHistory = () => {
    clearAnalysisHistory();
    setHistory([]);
    onHistoryUpdate?.();
  };

  const getClassificationName = (id: string) => {
    const names = {
      'living': 'Ser Vivo',
      'manufactured': 'Objeto Manufaturado',
      'natural': 'Elemento Natural'
    };
    return names[id as keyof typeof names] || id;
  };

  if (history.length === 0) {
    return (
      <Card className={`border-2 ${
        isDarkTheme 
          ? 'bg-black border-yellow-500 text-yellow-100' 
          : 'bg-white border-gray-200'
      }`}>
        <CardHeader className={`${
          isDarkTheme 
            ? 'bg-gradient-to-r from-yellow-900 to-yellow-800' 
            : 'bg-gradient-to-r from-gray-50 to-gray-100'
        }`}>
          <CardTitle className={`text-lg flex items-center gap-2 ${
            isDarkTheme ? 'text-yellow-300' : 'text-gray-600'
          }`}>
            <History className="h-5 w-5" />
            📊 Histórico
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center">
          <p className={`text-sm ${
            isDarkTheme ? 'text-yellow-300' : 'text-gray-500'
          }`}>
            Nenhuma análise realizada
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 ${
      isDarkTheme 
        ? 'bg-black border-yellow-500 text-yellow-100' 
        : 'bg-white border-purple-200'
    }`}>
      <CardHeader className={`${
        isDarkTheme 
          ? 'bg-gradient-to-r from-yellow-900 to-yellow-800' 
          : 'bg-gradient-to-r from-purple-50 to-violet-50'
      }`}>
        <CardTitle className={`text-lg flex items-center justify-between ${
          isDarkTheme ? 'text-yellow-300' : 'text-purple-600'
        }`}>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5" />
            📊 Suas Análises ({history.length})
          </div>
          <Button
            onClick={handleClearHistory}
            size="sm"
            variant="destructive"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Limpar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 max-h-80 overflow-y-auto">
        <div className="space-y-3">
          {history.map((analysis) => (
            <div
              key={analysis.id}
              className={`p-3 rounded-md border ${
                isDarkTheme 
                  ? 'bg-yellow-900/30 border-yellow-700' 
                  : 'bg-purple-50 border-purple-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className={`h-3 w-3 ${
                    isDarkTheme ? 'text-yellow-400' : 'text-purple-600'
                  }`} />
                  <span className={`font-medium truncate max-w-24 text-xs ${
                    isDarkTheme ? 'text-yellow-200' : 'text-gray-800'
                  }`}>
                    {analysis.imageName}
                  </span>
                </div>
                
                <div className={`text-xs ${
                  isDarkTheme ? 'text-yellow-400' : 'text-gray-400'
                }`}>
                  {analysis.timestamp.toLocaleDateString()} {analysis.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className={`${isDarkTheme ? 'text-yellow-300' : 'text-gray-700'}`}>
                  <strong className="text-xs">Classificação:</strong>
                  <div className="text-sm font-medium">
                    {getClassificationName(analysis.userClassification)}
                  </div>
                </div>
                
                <div className={`${isDarkTheme ? 'text-yellow-300' : 'text-gray-600'}`}>
                  <strong className="text-xs">Veredito:</strong>
                  <div className="text-xs mt-1 leading-relaxed">
                    {analysis.userVerdict.length > 100 
                      ? `${analysis.userVerdict.substring(0, 100)}...` 
                      : analysis.userVerdict
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisHistory;
