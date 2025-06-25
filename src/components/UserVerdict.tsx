
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Download, MessageSquare, CheckCircle, FileText, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';

interface UserVerdictProps {
  uploadedImage: string | null;
  selectedClassification: string;
  onVerdictSubmit: (verdict: string) => void;
  onDownloadImage: () => void;
  onResetAnalysis: () => void;
  isDarkTheme: boolean;
  userVerdict: string;
  isAnalysisComplete: boolean;
}

const UserVerdict = ({ 
  uploadedImage, 
  selectedClassification, 
  onVerdictSubmit, 
  onDownloadImage,
  onResetAnalysis,
  isDarkTheme, 
  userVerdict,
  isAnalysisComplete
}: UserVerdictProps) => {
  const [verdict, setVerdict] = useState('');

  // Resetar campo quando nova análise é iniciada
  useEffect(() => {
    if (!uploadedImage) {
      setVerdict('');
    }
  }, [uploadedImage]);

  const handleSubmit = () => {
    if (verdict.trim()) {
      onVerdictSubmit(verdict);
    }
  };

  const handleNewAnalysis = () => {
    setVerdict('');
    onResetAnalysis();
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
            <MessageSquare className="h-5 w-5" />
            📝 Seu Veredito
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center">
          <FileText className={`h-10 w-10 mx-auto mb-3 ${
            isDarkTheme ? 'text-yellow-400' : 'text-gray-400'
          }`} />
          <p className={`text-sm ${
            isDarkTheme ? 'text-yellow-300' : 'text-gray-500'
          }`}>
            Complete os passos anteriores primeiro
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
        <CardTitle className={`text-lg flex items-center gap-2 ${
          isDarkTheme ? 'text-yellow-300' : 'text-purple-600'
        }`}>
          <MessageSquare className="h-5 w-5" />
          📝 Seu Veredito
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Resumo da classificação escolhida */}
          <div className={`p-3 rounded-lg border ${
            isDarkTheme 
              ? 'bg-green-900/50 border-green-600' 
              : 'bg-green-100 border-green-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className={`h-4 w-4 ${
                isDarkTheme ? 'text-green-300' : 'text-green-600'
              }`} />
              <span className={`font-medium text-sm ${
                isDarkTheme ? 'text-green-200' : 'text-green-800'
              }`}>
                🎯 Sua Classificação
              </span>
            </div>
            
            <div className={`text-sm ${
              isDarkTheme ? 'text-green-300' : 'text-green-700'
            }`}>
              <strong>{getClassificationName(selectedClassification)}</strong>
            </div>
          </div>

          {/* Campo de veredito */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${
              isDarkTheme ? 'text-yellow-200' : 'text-gray-700'
            }`}>
              💭 Sua análise e justificativa:
            </label>
            
            <Textarea
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
              placeholder="Descreva o que você vê na imagem e explique por que você fez essa classificação..."
              rows={4}
              disabled={isAnalysisComplete}
              className={`resize-none ${
                isDarkTheme 
                  ? 'bg-yellow-900/50 border-yellow-600 text-yellow-100 placeholder:text-yellow-400' 
                  : 'bg-purple-50 border-purple-200'
              }`}
            />
          </div>

          {/* Botões de ação */}
          <div className="flex gap-2">
            {!isAnalysisComplete ? (
              <Button
                onClick={handleSubmit}
                disabled={!verdict.trim()}
                className={`flex-1 ${
                  isDarkTheme 
                    ? 'bg-yellow-500 hover:bg-yellow-400 text-black' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Finalizar Análise
              </Button>
            ) : (
              <Button
                onClick={handleNewAnalysis}
                className={`flex-1 text-base font-bold ${
                  isDarkTheme 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                🔄 Iniciar Nova Análise
              </Button>
            )}
            
            <Button
              onClick={onDownloadImage}
              variant="outline"
              size="sm"
              className={`${
                isDarkTheme 
                  ? 'bg-yellow-800 border-yellow-600 text-yellow-200 hover:bg-yellow-700' 
                  : 'border-purple-200 text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {isAnalysisComplete && (
            <div className={`p-3 rounded-lg border text-center ${
              isDarkTheme 
                ? 'bg-green-900/50 border-green-600' 
                : 'bg-green-100 border-green-200'
            }`}>
              <p className={`text-sm font-medium ${
                isDarkTheme ? 'text-green-200' : 'text-green-800'
              }`}>
                🎉 Análise concluída! Use o botão acima para iniciar uma nova.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserVerdict;
