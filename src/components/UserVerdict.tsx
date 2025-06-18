
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Download, MessageSquare, CheckCircle, User, FileText } from 'lucide-react';
import { useState } from 'react';

interface UserVerdictProps {
  uploadedImage: string | null;
  selectedClassification: string;
  onVerdictSubmit: (verdict: string) => void;
  onDownloadImage: () => void;
  isDarkTheme: boolean;
}

const UserVerdict = ({ uploadedImage, selectedClassification, onVerdictSubmit, onDownloadImage, isDarkTheme }: UserVerdictProps) => {
  const [verdict, setVerdict] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (verdict.trim()) {
      onVerdictSubmit(verdict);
      setIsSubmitted(true);
    }
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
      <Card className={`shadow-xl border-3 transition-all duration-300 opacity-50 ${
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

  return (
    <Card className={`shadow-xl border-3 transition-all duration-300 ${
      isDarkTheme 
        ? 'bg-black border-orange-500 hover:border-orange-400 text-orange-100' 
        : 'bg-white border-purple-200 hover:border-purple-400'
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
          {/* Resumo da análise */}
          <div className={`p-4 rounded-lg border ${
            isDarkTheme 
              ? 'bg-gradient-to-r from-orange-900 to-yellow-900 border-orange-600' 
              : 'bg-gradient-to-r from-purple-100 to-violet-100 border-purple-200'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <User className={`h-5 w-5 ${
                isDarkTheme ? 'text-orange-300' : 'text-purple-600'
              }`} />
              <span className={`font-medium ${
                isDarkTheme ? 'text-orange-200' : 'text-purple-800'
              }`}>
                Resumo da Sua Análise
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between items-center">
                <span>Imagem:</span>
                <Badge variant="outline" className={`${
                  isDarkTheme ? 'bg-orange-800 text-orange-200 border-orange-600' : 'bg-purple-100 text-purple-800'
                }`}>
                  ✅ Carregada
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Classificação:</span>
                <Badge variant="outline" className={`${
                  isDarkTheme ? 'bg-orange-800 text-orange-200 border-orange-600' : 'bg-purple-100 text-purple-800'
                }`}>
                  {getClassificationName(selectedClassification)}
                </Badge>
              </div>
            </div>
          </div>

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
              className={`transition-all duration-200 ${
                isDarkTheme 
                  ? 'bg-orange-900/50 border-orange-600 text-orange-100 placeholder:text-orange-400 focus:border-orange-400' 
                  : 'bg-purple-50 border-purple-200 focus:border-purple-400'
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
                className={`flex-1 transition-colors duration-200 ${
                  isDarkTheme 
                    ? 'bg-orange-500 hover:bg-orange-400 text-black disabled:bg-orange-800 disabled:text-orange-400' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Finalizar Análise
              </Button>
            ) : (
              <div className={`flex-1 p-3 rounded-lg border text-center ${
                isDarkTheme 
                  ? 'bg-green-900 border-green-600 text-green-200' 
                  : 'bg-green-50 border-green-200 text-green-800'
              }`}>
                <CheckCircle className="h-5 w-5 inline mr-2" />
                <span className="font-medium">Análise Concluída!</span>
              </div>
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

          {isSubmitted && (
            <div className={`p-4 rounded-lg border ${
              isDarkTheme 
                ? 'bg-gradient-to-r from-green-900 to-emerald-900 border-green-600' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
            }`}>
              <p className={`text-sm font-medium ${
                isDarkTheme ? 'text-green-200' : 'text-green-800'
              }`}>
                🎉 Parabéns! Você completou uma análise de imagem completa usando sua própria inteligência!
              </p>
              <p className={`text-xs mt-1 ${
                isDarkTheme ? 'text-green-300' : 'text-green-700'
              }`}>
                Sua análise demonstra como humanos processam e classificam informações visuais.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserVerdict;
