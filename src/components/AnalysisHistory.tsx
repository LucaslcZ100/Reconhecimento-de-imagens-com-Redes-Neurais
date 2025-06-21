
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, CheckCircle, XCircle, Trash2 } from 'lucide-react';
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
          ? 'bg-black border-orange-500 text-orange-100' 
          : 'bg-white border-gray-200'
      }`}>
        <CardHeader className={`${
          isDarkTheme 
            ? 'bg-gradient-to-r from-orange-900 to-yellow-900' 
            : 'bg-gradient-to-r from-gray-50 to-gray-100'
        }`}>
          <CardTitle className={`text-lg flex items-center gap-2 ${
            isDarkTheme ? 'text-orange-300' : 'text-gray-600'
          }`}>
            <History className="h-5 w-5" />
            📊 Histórico
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center">
          <p className={`text-sm ${
            isDarkTheme ? 'text-orange-300' : 'text-gray-500'
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
        ? 'bg-black border-orange-500 text-orange-100' 
        : 'bg-white border-purple-200'
    }`}>
      <CardHeader className={`${
        isDarkTheme 
          ? 'bg-gradient-to-r from-orange-900 to-yellow-900' 
          : 'bg-gradient-to-r from-purple-50 to-violet-50'
      }`}>
        <CardTitle className={`text-lg flex items-center justify-between ${
          isDarkTheme ? 'text-orange-300' : 'text-purple-600'
        }`}>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5" />
            📊 Histórico ({history.length})
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
        <div className="space-y-2">
          {history.map((analysis) => (
            <div
              key={analysis.id}
              className={`p-3 rounded-md border text-xs ${
                isDarkTheme 
                  ? analysis.isCorrect 
                    ? 'bg-green-900/30 border-green-700' 
                    : 'bg-red-900/30 border-red-700'
                  : analysis.isCorrect
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  {analysis.isCorrect ? (
                    <CheckCircle className={`h-3 w-3 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-600'
                    }`} />
                  ) : (
                    <XCircle className={`h-3 w-3 ${
                      isDarkTheme ? 'text-red-400' : 'text-red-600'
                    }`} />
                  )}
                  <span className={`font-medium truncate max-w-20 ${
                    isDarkTheme ? 'text-orange-200' : 'text-gray-800'
                  }`}>
                    {analysis.imageName}
                  </span>
                </div>
                
                <Badge 
                  variant={analysis.isCorrect ? "default" : "destructive"}
                  className="text-xs py-0 px-1"
                >
                  {analysis.isCorrect ? '✅' : '❌'}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className={`${isDarkTheme ? 'text-orange-300' : 'text-gray-600'}`}>
                  <strong>Você:</strong> {getClassificationName(analysis.userClassification)}
                </div>
                <div className={`${isDarkTheme ? 'text-orange-300' : 'text-gray-600'}`}>
                  <strong>IA:</strong> {getClassificationName(analysis.suggestedClassification)}
                </div>
                <div className={`${isDarkTheme ? 'text-yellow-300' : 'text-gray-500'} truncate`}>
                  {analysis.userVerdict.substring(0, 40)}...
                </div>
                <div className={`${isDarkTheme ? 'text-yellow-400' : 'text-gray-400'} text-xs`}>
                  {analysis.timestamp.toLocaleDateString()} {analysis.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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
