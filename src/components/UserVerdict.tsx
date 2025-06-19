
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Download, MessageSquare, CheckCircle, FileText, Bot, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { ImageAnalysisResult } from '@/utils/imageAnalysis';

interface UserVerdictProps {
  uploadedImage: string | null;
  selectedClassification: string;
  onVerdictSubmit: (verdict: string) => void;
  onDownloadImage: () => void;
  isDarkTheme: boolean;
  analysisResult?: ImageAnalysisResult | null;
}

const UserVerdict = ({ 
  uploadedImage, 
  selectedClassification, 
  onVerdictSubmit, 
  onDownloadImage, 
  isDarkTheme, 
  analysisResult 
}: UserVerdictProps) => {
  const [verdict, setVerdict] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (verdict.trim()) {
      onVerdictSubmit(verdict);
      setIsSubmitted(true);
    }
  };

  const handleNewAnalysis = () => {
    setVerdict('');
    setIsSubmitted(false);
  };

  const getClassificationName = (id: string) => {
    const names = {
      'living': 'Ser Vivo',
      'manufactured': 'Objeto Manufaturado',
      'natural': 'Elemento Natural'
    };
    return names[id as keyof typeof names] || id;
  };

  if (!uploadedImage || !selectedClassification) {
    return (
      <Card className={`shadow-lg border-2 opacity-50 ${
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
            <MessageSquare className="h-5 w-5" />
            📝 Seu Veredito
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center">
          <FileText className={`h-10 w-10 mx-auto mb-3 ${
            isDarkTheme ? 'text-orange-400' : 'text-gray-400'
          }`} />
          <p className={`text-sm ${
            isDarkTheme ? 'text-orange-300' : 'text-gray-500'
          }`}>
            Complete os passos anteriores primeiro
          </p>
        </CardContent>
      </Card>
    );
  }

  const isUserCorrect = analysisResult ? selectedClassification === analysisResult.suggestedClassification : null;

  return (
    <Card className={`shadow-lg border-2 ${
      isDarkTheme 
        ? 'bg-black border-orange-500 text-orange-100' 
        : 'bg-white border-purple-200'
    }`}>
      <CardHeader className={`${
        isDarkTheme 
          ? 'bg-gradient-to-r from-orange-900 to-yellow-900' 
          : 'bg-gradient-to-r from-purple-50 to-violet-50'
      }`}>
        <CardTitle className={`text-lg flex items-center gap-2 ${
          isDarkTheme ? 'text-orange-300' : 'text-purple-600'
        }`}>
          <MessageSquare className="h-5 w-5" />
          📝 Seu Veredito
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Comparação com IA - só aparece após veredito */}
          {analysisResult && isSubmitted && (
            <div className={`p-3 rounded-lg border ${
              isUserCorrect
                ? (isDarkTheme 
                    ? 'bg-green-900/50 border-green-600' 
                    : 'bg-green-100 border-green-200')
                : (isDarkTheme 
                    ? 'bg-yellow-900/50 border-yellow-600' 
                    : 'bg-yellow-100 border-yellow-200')
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Bot className={`h-4 w-4 ${
                  isUserCorrect 
                    ? (isDarkTheme ? 'text-green-300' : 'text-green-600')
                    : (isDarkTheme ? 'text-yellow-300' : 'text-yellow-600')
                }`} />
                <span className={`font-medium text-sm ${
                  isUserCorrect 
                    ? (isDarkTheme ? 'text-green-200' : 'text-green-800')
                    : (isDarkTheme ? 'text-yellow-200' : 'text-yellow-800')
                }`}>
                  {isUserCorrect ? '🎯 Acordo com IA' : '🤔 Divergência'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className={`${isDarkTheme ? 'text-orange-300' : 'text-gray-600'}`}>
                    Você: {getClassificationName(selectedClassification)}
                  </span>
                </div>
                <div>
                  <span className={`${isDarkTheme ? 'text-orange-300' : 'text-gray-600'}`}>
                    IA: {getClassificationName(analysisResult.suggestedClassification)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Campo de veredito */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${
              isDarkTheme ? 'text-orange-200' : 'text-gray-700'
            }`}>
              💭 Sua análise:
            </label>
            
            <Textarea
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
              placeholder="Descreva o que você vê e por que classificou assim..."
              rows={4}
              disabled={isSubmitted}
              className={`${
                isDarkTheme 
                  ? 'bg-orange-900/50 border-orange-600 text-orange-100 placeholder:text-orange-400' 
                  : 'bg-purple-50 border-purple-200'
              }`}
            />
          </div>

          {/* Botões de ação */}
          <div className="flex gap-2">
            {!isSubmitted ? (
              <Button
                onClick={handleSubmit}
                disabled={!verdict.trim()}
                className={`flex-1 ${
                  isDarkTheme 
                    ? 'bg-orange-500 hover:bg-orange-400 text-black' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Finalizar Análise
              </Button>
            ) : (
              <Button
                onClick={handleNewAnalysis}
                className={`flex-1 text-lg font-bold ${
                  isDarkTheme 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                🔄 Iniciar Nova Análise
              </Button>
            )}
            
            <Button
              onClick={onDownloadImage}
              variant="outline"
              size="sm"
              className={`${
                isDarkTheme 
                  ? 'bg-orange-800 border-orange-600 text-orange-200 hover:bg-orange-700' 
                  : 'border-purple-200 text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {isSubmitted && !analysisResult && (
            <div className={`p-3 rounded-lg border text-center ${
              isDarkTheme 
                ? 'bg-green-900/50 border-green-600' 
                : 'bg-green-100 border-green-200'
            }`}>
              <p className={`text-sm font-medium ${
                isDarkTheme ? 'text-green-200' : 'text-green-800'
              }`}>
                🎉 Análise concluída!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserVerdict;
