
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Download, MessageSquare, CheckCircle, User, FileText, Bot } from 'lucide-react';
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
      <Card className={`shadow-xl border-3 opacity-50 ${
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
            <MessageSquare className="h-6 w-6" />
            📝 Seu Veredito Final
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <FileText className={`h-12 w-12 mx-auto mb-4 ${
            isDarkTheme ? 'text-orange-400' : 'text-gray-400'
          }`} />
          <p className={`${
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
    <Card className={`shadow-xl border-3 ${
      isDarkTheme 
        ? 'bg-black border-orange-500 text-orange-100' 
        : 'bg-white border-purple-200'
    }`}>
      <CardHeader className={`${
        isDarkTheme 
          ? 'bg-gradient-to-r from-orange-900 to-yellow-900' 
          : 'bg-gradient-to-r from-purple-50 to-violet-50'
      }`}>
        <CardTitle className={`text-xl flex items-center gap-2 ${
          isDarkTheme ? 'text-orange-300' : 'text-purple-600'
        }`}>
          <MessageSquare className="h-6 w-6" />
          📝 Seu Veredito Final
        </CardTitle>
        <p className={`text-sm ${
          isDarkTheme ? 'text-yellow-200' : 'text-gray-600'
        }`}>
          Descreva sua análise e conclusão final
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Comparação com IA - só aparece após veredito */}
          {analysisResult && isSubmitted && (
            <div className={`p-4 rounded-lg border ${
              isUserCorrect
                ? (isDarkTheme 
                    ? 'bg-gradient-to-r from-green-900 to-emerald-900 border-green-600' 
                    : 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-200')
                : (isDarkTheme 
                    ? 'bg-gradient-to-r from-yellow-900 to-orange-900 border-yellow-600' 
                    : 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200')
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <Bot className={`h-5 w-5 ${
                  isUserCorrect 
                    ? (isDarkTheme ? 'text-green-300' : 'text-green-600')
                    : (isDarkTheme ? 'text-yellow-300' : 'text-yellow-600')
                }`} />
                <span className={`font-medium ${
                  isUserCorrect 
                    ? (isDarkTheme ? 'text-green-200' : 'text-green-800')
                    : (isDarkTheme ? 'text-yellow-200' : 'text-yellow-800')
                }`}>
                  {isUserCorrect ? '🎯 Análise Concordante' : '🤔 Análise Divergente'}
                </span>
                <Badge variant="outline" className={`${
                  isUserCorrect
                    ? (isDarkTheme ? 'bg-green-800 text-green-200 border-green-600' : 'bg-green-100 text-green-800')
                    : (isDarkTheme ? 'bg-yellow-800 text-yellow-200 border-yellow-600' : 'bg-yellow-100 text-yellow-800')
                }`}>
                  {isUserCorrect ? '✅ Acordo' : '⚡ Diferença'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className={`${
                    isDarkTheme ? 'text-orange-300' : 'text-gray-600'
                  }`}>Sua classificação:</span>
                  <div className={`font-medium ${
                    isDarkTheme ? 'text-orange-200' : 'text-gray-800'
                  }`}>
                    {getClassificationName(selectedClassification)}
                  </div>
                </div>
                <div>
                  <span className={`${
                    isDarkTheme ? 'text-orange-300' : 'text-gray-600'
                  }`}>IA sugeriu:</span>
                  <div className={`font-medium ${
                    isDarkTheme ? 'text-orange-200' : 'text-gray-800'
                  }`}>
                    {getClassificationName(analysisResult.suggestedClassification)}
                  </div>
                </div>
              </div>
              
              <div className="mt-2 text-xs opacity-75">
                Confiança da IA: {Math.round(analysisResult.confidence * 100)}%
              </div>
            </div>
          )}

          {/* Campo de veredito */}
          <div className="space-y-3">
            <label className={`block text-sm font-medium ${
              isDarkTheme ? 'text-orange-200' : 'text-gray-700'
            }`}>
              💭 Descreva sua análise detalhada:
            </label>
            
            <Textarea
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
              placeholder="Ex: Analisando a imagem, posso identificar características como... Por isso, classifico como... Minha conclusão é que..."
              rows={6}
              disabled={isSubmitted}
              className={`${
                isDarkTheme 
                  ? 'bg-orange-900/50 border-orange-600 text-orange-100 placeholder:text-orange-400' 
                  : 'bg-purple-50 border-purple-200'
              }`}
            />
            
            <p className={`text-xs ${
              isDarkTheme ? 'text-yellow-300' : 'text-gray-500'
            }`}>
              Explique seu raciocínio, características observadas e conclusão final
            </p>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-3">
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
                className={`flex-1 ${
                  isDarkTheme 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                📝 Escrever Nova Análise
              </Button>
            )}
            
            <Button
              onClick={onDownloadImage}
              variant="outline"
              className={`${
                isDarkTheme 
                  ? 'bg-orange-800 border-orange-600 text-orange-200 hover:bg-orange-700' 
                  : 'border-purple-200 text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar
            </Button>
          </div>

          {isSubmitted && !analysisResult && (
            <div className={`p-4 rounded-lg border ${
              isDarkTheme 
                ? 'bg-gradient-to-r from-green-900 to-emerald-900 border-green-600' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
            }`}>
              <p className={`text-sm font-medium ${
                isDarkTheme ? 'text-green-200' : 'text-green-800'
              }`}>
                🎉 Parabéns! Você completou uma análise de imagem usando sua própria inteligência!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserVerdict;
