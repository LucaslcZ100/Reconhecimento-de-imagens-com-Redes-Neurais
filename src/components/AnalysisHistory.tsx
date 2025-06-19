
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, CheckCircle, XCircle, Download, Trash2 } from 'lucide-react';
import { AnalysisHistory as AnalysisHistoryType, getAnalysisHistory, clearAnalysisHistory } from '@/utils/imageAnalysis';
import { useState, useEffect } from 'react';
import { useMouseActivity } from '@/hooks/useMouseActivity';

interface AnalysisHistoryProps {
  isDarkTheme: boolean;
  onHistoryUpdate?: () => void;
}

const AnalysisHistory = ({ isDarkTheme, onHistoryUpdate }: AnalysisHistoryProps) => {
  const [history, setHistory] = useState<AnalysisHistoryType[]>([]);
  const isMouseActive = useMouseActivity();

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
      <Card className={`shadow-xl border-3 transition-all duration-500 ${
        isMouseActive ? 'transform hover:scale-105' : ''
      } ${
        isDarkTheme 
          ? 'bg-black border-orange-500 text-orange-100' 
          : 'bg-white border-gray-200'
      }`}>
        <CardHeader className={`${
          isDarkTheme 
            ? 'bg-gradient-to-r from-orange-900 to-yellow-900' 
            : 'bg-gradient-to-r from-gray-50 to-gray-100'
        }`}>
          <CardTitle className={`text-xl flex items-center gap-2 ${
            isDarkTheme ? 'text-orange-300' : 'text-gray-600'
          }`}>
            <History className={`h-6 w-6 ${isMouseActive ? 'animate-spin' : ''}`} />
            📊 Histórico de Análises
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className={`${
            isDarkTheme ? 'text-orange-300' : 'text-gray-500'
          }`}>
            Nenhuma análise realizada ainda
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`shadow-xl border-3 transition-all duration-500 ${
      isMouseActive ? 'transform hover:scale-105' : ''
    } ${
      isDarkTheme 
        ? 'bg-black border-orange-500 hover:border-orange-400 text-orange-100 hover:shadow-orange-500/20' 
        : 'bg-white border-purple-200 hover:border-purple-400 hover:shadow-purple-500/20'
    }`}>
      <CardHeader className={`${
        isDarkTheme 
          ? 'bg-gradient-to-r from-orange-900 to-yellow-900' 
          : 'bg-gradient-to-r from-purple-50 to-violet-50'
      } transition-all duration-300`}>
        <CardTitle className={`text-xl flex items-center gap-2 justify-between ${
          isDarkTheme ? 'text-orange-300' : 'text-purple-600'
        }`}>
          <div className="flex items-center gap-2">
            <History className={`h-6 w-6 ${isMouseActive ? 'animate-spin' : ''}`} />
            📊 Histórico de Análises
          </div>
          <Button
            onClick={handleClearHistory}
            size="sm"
            variant="destructive"
            className={`transition-all duration-300 ${
              isMouseActive ? 'transform hover:scale-110' : ''
            }`}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 max-h-96 overflow-y-auto">
        <div className="space-y-3">
          {history.map((analysis, index) => (
            <div
              key={analysis.id}
              className={`p-4 rounded-lg border transition-all duration-500 ${
                isMouseActive ? 'hover:scale-105' : ''
              } ${
                isDarkTheme 
                  ? analysis.isCorrect 
                    ? 'bg-green-900/50 border-green-600' 
                    : 'bg-red-900/50 border-red-600'
                  : analysis.isCorrect
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {analysis.isCorrect ? (
                    <CheckCircle className={`h-5 w-5 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-600'
                    } ${isMouseActive ? 'animate-pulse' : ''}`} />
                  ) : (
                    <XCircle className={`h-5 w-5 ${
                      isDarkTheme ? 'text-red-400' : 'text-red-600'
                    } ${isMouseActive ? 'animate-pulse' : ''}`} />
                  )}
                  <span className={`text-sm font-medium ${
                    isDarkTheme ? 'text-orange-200' : 'text-gray-800'
                  }`}>
                    {analysis.imageName}
                  </span>
                </div>
                
                <Badge variant={analysis.isCorrect ? "default" : "destructive"} className={`transition-all duration-300 ${
                  isMouseActive ? 'hover:scale-110' : ''
                }`}>
                  {analysis.isCorrect ? '✅ Correto' : '❌ Incorreto'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                <div>
                  <span className={`${isDarkTheme ? 'text-orange-300' : 'text-gray-600'}`}>
                    Sua classificação:
                  </span>
                  <div className={`font-medium ${isDarkTheme ? 'text-orange-200' : 'text-gray-800'}`}>
                    {getClassificationName(analysis.userClassification)}
                  </div>
                </div>
                <div>
                  <span className={`${isDarkTheme ? 'text-orange-300' : 'text-gray-600'}`}>
                    Sugestão do sistema:
                  </span>
                  <div className={`font-medium ${isDarkTheme ? 'text-orange-200' : 'text-gray-800'}`}>
                    {getClassificationName(analysis.suggestedClassification)}
                  </div>
                </div>
              </div>
              
              <div className="text-xs">
                <span className={`${isDarkTheme ? 'text-yellow-300' : 'text-gray-500'}`}>
                  {analysis.timestamp.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisHistory;
