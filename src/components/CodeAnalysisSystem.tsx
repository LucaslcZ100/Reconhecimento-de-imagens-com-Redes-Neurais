
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Code, CheckCircle, AlertTriangle, Bot, User, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useMouseActivity } from '@/hooks/useMouseActivity';

interface CodeAnalysisSystemProps {
  isDarkTheme?: boolean;
}

interface AnalysisResult {
  hasError: boolean;
  errorType: string;
  description: string;
  aiSuggestion?: string;
  isAISuggestionCorrect?: boolean;
  explanation?: string;
}

const CodeAnalysisSystem = ({ isDarkTheme = true }: CodeAnalysisSystemProps) => {
  const [userCode, setUserCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const isMouseActive = useMouseActivity();

  const analyzeCode = async () => {
    if (!userCode.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setShowAISuggestion(false);
    
    // Simular análise
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Análise simples baseada em padrões comuns
    const codeAnalysis = performCodeAnalysis(userCode);
    setAnalysisResult(codeAnalysis);
    setIsAnalyzing(false);
  };

  const performCodeAnalysis = (code: string): AnalysisResult => {
    const lowerCode = code.toLowerCase();
    
    // Verificações básicas de erro
    if (lowerCode.includes('import') && !lowerCode.includes('from')) {
      return {
        hasError: true,
        errorType: "Erro de Sintaxe",
        description: "Import statement incompleto - falta a cláusula 'from'",
        aiSuggestion: "import { Component } from 'library-name';",
        isAISuggestionCorrect: true,
        explanation: "A sugestão está correta porque todo import em JavaScript/TypeScript precisa especificar de onde vem o módulo."
      };
    }
    
    if (lowerCode.includes('function') && !lowerCode.includes('(')) {
      return {
        hasError: true,
        errorType: "Erro de Sintaxe",
        description: "Declaração de função sem parênteses para parâmetros",
        aiSuggestion: "function nomeFuncao() { /* código */ }",
        isAISuggestionCorrect: true,
        explanation: "A sugestão está correta porque funções em JavaScript precisam de parênteses, mesmo sem parâmetros."
      };
    }
    
    if (lowerCode.includes('const') && lowerCode.includes('=') && !lowerCode.includes(';')) {
      return {
        hasError: false,
        errorType: "Comportamento Suspeito",
        description: "Falta de ponto e vírgula - pode causar problemas em alguns casos",
        aiSuggestion: "const variavel = valor;",
        isAISuggestionCorrect: false,
        explanation: "A sugestão é tecnicamente desnecessária porque JavaScript tem inserção automática de ponto e vírgula (ASI)."
      };
    }
    
    if (lowerCode.includes('react') && lowerCode.includes('component')) {
      return {
        hasError: false,
        errorType: "Nenhum Erro Detectado",
        description: "Código React aparenta estar bem estruturado",
        aiSuggestion: "Considere usar TypeScript para melhor type safety: const Component: React.FC = () => { ... }",
        isAISuggestionCorrect: true,
        explanation: "A sugestão é válida porque TypeScript oferece melhor verificação de tipos e IntelliSense."
      };
    }
    
    return {
      hasError: false,
      errorType: "Análise Concluída",
      description: "Nenhum erro óbvio detectado no código fornecido",
      aiSuggestion: "O código parece estar funcionalmente correto. Considere adicionar comentários para melhor documentação.",
      isAISuggestionCorrect: true,
      explanation: "A sugestão é boa prática porque comentários melhoram a manutenibilidade do código."
    };
  };

  const requestAISuggestion = () => {
    setShowAISuggestion(true);
  };

  const resetAnalysis = () => {
    setUserCode('');
    setAnalysisResult(null);
    setShowAISuggestion(false);
  };

  return (
    <div className="space-y-6">
      <Card className={`shadow-xl border-3 transition-all duration-500 ${
        isMouseActive ? 'transform hover:scale-105' : ''
      } ${
        isDarkTheme 
          ? 'bg-black border-orange-500 text-orange-100' 
          : 'bg-white border-blue-200'
      }`}>
        <CardHeader className={`${
          isDarkTheme 
            ? 'bg-gradient-to-r from-orange-900 to-yellow-900' 
            : 'bg-gradient-to-r from-blue-50 to-indigo-50'
        }`}>
          <CardTitle className={`text-xl flex items-center gap-2 ${
            isDarkTheme ? 'text-orange-300' : 'text-blue-600'
          }`}>
            <Code className={`h-6 w-6 ${isMouseActive ? 'animate-pulse' : ''}`} />
            💻 Sistema de Análise de Código
            <Sparkles className={`h-4 w-4 ${isMouseActive ? 'animate-spin' : ''}`} />
          </CardTitle>
          <p className={`text-sm ${
            isDarkTheme ? 'text-yellow-200' : 'text-blue-700'
          }`}>
            Cole seu código para análise em etapas
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Cole seu código aqui para análise..."
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className={`min-h-32 transition-all duration-300 ${
                isMouseActive ? 'focus:scale-105' : ''
              } ${
                isDarkTheme 
                  ? 'bg-orange-900/50 border-orange-600 text-orange-100 focus:border-orange-400' 
                  : 'bg-blue-50 border-blue-200 focus:border-blue-400'
              }`}
            />
            
            <div className="flex gap-3">
              <Button
                onClick={analyzeCode}
                disabled={!userCode.trim() || isAnalyzing}
                className={`flex-1 transition-all duration-300 ${
                  isMouseActive ? 'transform hover:scale-110' : ''
                } ${
                  isDarkTheme 
                    ? 'bg-orange-600 hover:bg-orange-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Analisando...
                  </>
                ) : (
                  <>
                    <Code className="h-4 w-4 mr-2" />
                    🔍 Analisar Código
                  </>
                )}
              </Button>
              
              <Button
                onClick={resetAnalysis}
                variant="outline"
                className={`transition-all duration-300 ${
                  isMouseActive ? 'transform hover:scale-110' : ''
                } ${
                  isDarkTheme 
                    ? 'border-orange-600 text-orange-300 hover:bg-orange-800' 
                    : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                }`}
              >
                🔄 Limpar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultado da Análise */}
      {analysisResult && (
        <Card className={`shadow-xl border-3 transition-all duration-500 ${
          isMouseActive ? 'transform hover:scale-105 animate-fade-in' : ''
        } ${
          analysisResult.hasError
            ? (isDarkTheme ? 'bg-red-900/50 border-red-600' : 'bg-red-50 border-red-200')
            : (isDarkTheme ? 'bg-green-900/50 border-green-600' : 'bg-green-50 border-green-200')
        }`}>
          <CardHeader>
            <CardTitle className={`text-lg flex items-center gap-2 ${
              analysisResult.hasError
                ? (isDarkTheme ? 'text-red-300' : 'text-red-600')
                : (isDarkTheme ? 'text-green-300' : 'text-green-600')
            }`}>
              {analysisResult.hasError ? (
                <AlertTriangle className={`h-5 w-5 ${isMouseActive ? 'animate-bounce' : ''}`} />
              ) : (
                <CheckCircle className={`h-5 w-5 ${isMouseActive ? 'animate-pulse' : ''}`} />
              )}
              📊 Resultado da Análise
              <Badge variant={analysisResult.hasError ? "destructive" : "default"} className={`transition-all duration-300 ${
                isMouseActive ? 'hover:scale-110' : ''
              }`}>
                {analysisResult.hasError ? '❌ Erro Encontrado' : '✅ Análise OK'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className={`font-medium mb-2 ${
                  isDarkTheme ? 'text-orange-200' : 'text-gray-800'
                }`}>
                  🎯 Tipo: {analysisResult.errorType}
                </h4>
                <p className={`${
                  isDarkTheme ? 'text-orange-300' : 'text-gray-600'
                }`}>
                  {analysisResult.description}
                </p>
              </div>
              
              {!showAISuggestion && (
                <Button
                  onClick={requestAISuggestion}
                  className={`transition-all duration-300 ${
                    isMouseActive ? 'transform hover:scale-110' : ''
                  } ${
                    isDarkTheme 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  } text-white`}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  🤖 Solicitar Sugestão da IA
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sugestão da IA */}
      {showAISuggestion && analysisResult && (
        <Card className={`shadow-xl border-3 transition-all duration-500 ${
          isMouseActive ? 'transform hover:scale-105 animate-fade-in' : ''
        } ${
          isDarkTheme 
            ? 'bg-gradient-to-r from-blue-900 to-indigo-900 border-blue-600' 
            : 'bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-200'
        }`}>
          <CardHeader>
            <CardTitle className={`text-lg flex items-center gap-2 ${
              isDarkTheme ? 'text-blue-200' : 'text-blue-700'
            }`}>
              <Bot className={`h-5 w-5 ${isMouseActive ? 'animate-pulse' : ''}`} />
              🤖 Sugestão da IA
              <Badge variant={analysisResult.isAISuggestionCorrect ? "default" : "destructive"} className={`transition-all duration-300 ${
                isMouseActive ? 'hover:scale-110' : ''
              }`}>
                {analysisResult.isAISuggestionCorrect ? '✅ Correta' : '❌ Incorreta'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${
                isDarkTheme 
                  ? 'bg-blue-800/50 border-blue-600' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <h5 className={`font-medium mb-2 ${
                  isDarkTheme ? 'text-blue-200' : 'text-blue-800'
                }`}>
                  💡 Sugestão:
                </h5>
                <code className={`text-sm ${
                  isDarkTheme ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  {analysisResult.aiSuggestion}
                </code>
              </div>
              
              <div className={`p-4 rounded-lg border ${
                analysisResult.isAISuggestionCorrect
                  ? (isDarkTheme ? 'bg-green-800/50 border-green-600' : 'bg-green-50 border-green-200')
                  : (isDarkTheme ? 'bg-red-800/50 border-red-600' : 'bg-red-50 border-red-200')
              }`}>
                <h5 className={`font-medium mb-2 flex items-center gap-2 ${
                  analysisResult.isAISuggestionCorrect
                    ? (isDarkTheme ? 'text-green-200' : 'text-green-800')
                    : (isDarkTheme ? 'text-red-200' : 'text-red-800')
                }`}>
                  {analysisResult.isAISuggestionCorrect ? (
                    <CheckCircle className={`h-4 w-4 ${isMouseActive ? 'animate-pulse' : ''}`} />
                  ) : (
                    <AlertTriangle className={`h-4 w-4 ${isMouseActive ? 'animate-bounce' : ''}`} />
                  )}
                  📝 Avaliação da Sugestão:
                </h5>
                <p className={`text-sm ${
                  analysisResult.isAISuggestionCorrect
                    ? (isDarkTheme ? 'text-green-300' : 'text-green-700')
                    : (isDarkTheme ? 'text-red-300' : 'text-red-700')
                }`}>
                  {analysisResult.explanation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CodeAnalysisSystem;
