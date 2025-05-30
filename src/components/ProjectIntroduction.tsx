
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Eye, Layers, Zap, ArrowRight, Camera, Cpu, Target, ChevronRight } from 'lucide-react';

interface ProjectIntroductionProps {
  onStartGame: () => void;
  isDarkTheme: boolean;
}

const ProjectIntroduction = ({ onStartGame, isDarkTheme }: ProjectIntroductionProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "O Que São Redes Neurais?",
      icon: <Brain className="h-8 w-8" />,
      content: "As redes neurais são sistemas de computador inspirados no cérebro humano. Elas aprendem a reconhecer padrões através de exemplos, assim como nós aprendemos a reconhecer objetos quando somos crianças.",
      example: "🧠 Assim como você aprendeu a reconhecer um gato vendo muitos gatos diferentes, a IA aprende vendo milhares de imagens de gatos."
    },
    {
      title: "Como a IA Vê uma Imagem?",
      icon: <Eye className="h-8 w-8" />,
      content: "Para um computador, uma imagem é apenas uma matriz de números representando cores. Cada pixel tem valores de vermelho, verde e azul (RGB).",
      example: "📸 Uma imagem de 100x100 pixels contém 10.000 números que a IA precisa analisar para entender o que está vendo."
    },
    {
      title: "Camadas de Processamento",
      icon: <Layers className="h-8 w-8" />,
      content: "As redes neurais processam informações em camadas sequenciais. Cada camada extrai características diferentes: bordas, formas, texturas e finalmente objetos completos.",
      example: "🔍 Primeira camada: detecta linhas → Segunda: detecta formas → Terceira: reconhece objetos completos"
    },
    {
      title: "Classificação Final",
      icon: <Target className="h-8 w-8" />,
      content: "Na última etapa, a rede neural combina todas as características identificadas para tomar uma decisão final sobre o que está vendo na imagem.",
      example: "🎯 'Vejo pelos, orelhas pontudas, olhos grandes → Isso é um gato!' (com 95% de confiança)"
    }
  ];

  const categories = [
    {
      name: "Seres Vivos",
      shape: "circle",
      color: isDarkTheme ? "bg-green-600" : "bg-green-500",
      examples: ["🐱 Gato", "🐶 Cachorro", "👤 Pessoa"],
      features: "Formas orgânicas, olhos, movimento natural"
    },
    {
      name: "Objetos Manufaturados", 
      shape: "rectangle",
      color: isDarkTheme ? "bg-blue-600" : "bg-blue-500",
      examples: ["🚗 Carro", "📱 Telefone", "🏠 Casa"],
      features: "Linhas retas, geometria regular, bordas definidas"
    },
    {
      name: "Elementos Naturais",
      shape: "triangle", 
      color: isDarkTheme ? "bg-purple-600" : "bg-purple-500",
      examples: ["🏔️ Montanha", "🌲 Árvore", "🌸 Flor"],
      features: "Formas irregulares, texturas naturais, assimetria"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={`min-h-screen p-6 ${
      isDarkTheme
        ? 'bg-gradient-to-br from-black via-yellow-900 to-orange-900'
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-4 ${
            isDarkTheme
              ? 'bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
          }`}>
            Como Funciona o Reconhecimento de Imagens?
          </h1>
          <p className={`text-xl ${
            isDarkTheme ? 'text-yellow-200' : 'text-gray-600'
          }`}>
            Uma jornada pelos conceitos fundamentais da Inteligência Artificial
          </p>
        </div>

        {/* Passo a passo interativo */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className={`h-fit ${
            isDarkTheme
              ? 'bg-yellow-900 border-yellow-600 text-yellow-100'
              : 'bg-white border-blue-200'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isDarkTheme ? 'bg-yellow-600' : 'bg-blue-100'
                  }`}>
                    {steps[currentStep].icon}
                  </div>
                  <CardTitle className={
                    isDarkTheme ? 'text-yellow-200' : 'text-blue-800'
                  }>
                    {steps[currentStep].title}
                  </CardTitle>
                </div>
                <Badge className={
                  isDarkTheme 
                    ? 'bg-orange-600 text-orange-100' 
                    : 'bg-blue-500 text-white'
                }>
                  {currentStep + 1} de {steps.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                {steps[currentStep].content}
              </p>
              <div className={`p-4 rounded-lg border-l-4 ${
                isDarkTheme
                  ? 'bg-orange-900 border-orange-400 text-orange-100'
                  : 'bg-blue-50 border-blue-400 text-blue-800'
              }`}>
                <p className="font-medium">Exemplo Prático:</p>
                <p>{steps[currentStep].example}</p>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  variant="outline"
                  className={
                    isDarkTheme
                      ? 'border-yellow-600 text-yellow-300 hover:bg-yellow-800'
                      : ''
                  }
                >
                  Anterior
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                  className={
                    isDarkTheme
                      ? 'bg-yellow-600 hover:bg-yellow-500 text-black'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }
                >
                  Próximo <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Visualização interativa */}
          <Card className={
            isDarkTheme
              ? 'bg-black border-yellow-400 text-yellow-100'
              : 'bg-white border-blue-200'
          }>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${
                isDarkTheme ? 'text-yellow-300' : 'text-blue-800'
              }`}>
                <Cpu className="h-6 w-6" />
                Processo em Ação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Simulação visual baseada no passo atual */}
                <div className={`p-6 rounded-lg border-2 border-dashed ${
                  isDarkTheme ? 'border-yellow-400' : 'border-blue-300'
                }`}>
                  {currentStep === 0 && (
                    <div className="text-center">
                      <Brain className={`h-20 w-20 mx-auto mb-4 animate-pulse ${
                        isDarkTheme ? 'text-yellow-400' : 'text-blue-500'
                      }`} />
                      <p>Neurônios artificiais processando informações</p>
                    </div>
                  )}
                  {currentStep === 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square rounded ${
                            isDarkTheme
                              ? `bg-gradient-to-br from-yellow-${200 + (i % 3) * 100} to-orange-${300 + (i % 2) * 100}`
                              : `bg-gradient-to-br from-blue-${200 + (i % 3) * 100} to-purple-${300 + (i % 2) * 100}`
                          }`}
                          style={{ 
                            animationDelay: `${i * 0.1}s`,
                            animation: 'pulse 2s infinite'
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      {['Entrada', 'Processamento', 'Saída'].map((layer, i) => (
                        <div key={layer} className="flex items-center gap-4">
                          <Badge className={
                            isDarkTheme ? 'bg-yellow-600 text-black' : 'bg-blue-500 text-white'
                          }>
                            Camada {i + 1}
                          </Badge>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                isDarkTheme ? 'bg-yellow-400' : 'bg-blue-500'
                              } animate-pulse`}
                              style={{
                                width: `${(i + 1) * 33}%`,
                                animationDelay: `${i * 0.5}s`
                              }}
                            />
                          </div>
                          <span className="text-sm">{layer}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="text-center">
                      <Target className={`h-20 w-20 mx-auto mb-4 animate-bounce ${
                        isDarkTheme ? 'text-orange-400' : 'text-purple-500'
                      }`} />
                      <p className="text-lg font-semibold">Decisão: 🐱 GATO</p>
                      <p className={`text-sm ${
                        isDarkTheme ? 'text-yellow-300' : 'text-gray-600'
                      }`}>
                        Confiança: 95.3%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categorias do jogo */}
        <Card className={`mb-8 ${
          isDarkTheme
            ? 'bg-orange-900 border-orange-600'
            : 'bg-purple-50 border-purple-200'
        }`}>
          <CardHeader>
            <CardTitle className={`text-center text-2xl ${
              isDarkTheme ? 'text-orange-200' : 'text-purple-800'
            }`}>
              Categorias que Você Vai Treinar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    isDarkTheme
                      ? 'bg-yellow-800 border-yellow-600 hover:border-yellow-400'
                      : 'bg-white border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 mx-auto rounded-lg ${category.color} flex items-center justify-center text-white text-2xl font-bold`}>
                      {category.shape === 'circle' && '●'}
                      {category.shape === 'rectangle' && '■'}
                      {category.shape === 'triangle' && '▲'}
                    </div>
                    <h3 className={`text-lg font-semibold ${
                      isDarkTheme ? 'text-yellow-200' : 'text-gray-800'
                    }`}>
                      {category.name}
                    </h3>
                    <div className="space-y-2">
                      {category.examples.map((example) => (
                        <Badge
                          key={example}
                          variant="outline"
                          className={`block ${
                            isDarkTheme
                              ? 'border-yellow-500 text-yellow-200'
                              : 'border-purple-300 text-purple-700'
                          }`}
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>
                    <p className={`text-sm ${
                      isDarkTheme ? 'text-yellow-300' : 'text-gray-600'
                    }`}>
                      {category.features}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Botão para iniciar */}
        <div className="text-center">
          <Button
            onClick={onStartGame}
            size="lg"
            className={`text-xl px-12 py-6 font-bold transition-all duration-300 hover:scale-105 ${
              isDarkTheme
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black shadow-lg shadow-yellow-500/25'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-600/25'
            }`}
          >
            🚀 Iniciar Simulação de IA
            <ArrowRight className="h-6 w-6 ml-2" />
          </Button>
          <p className={`mt-4 text-lg ${
            isDarkTheme ? 'text-yellow-200' : 'text-gray-600'
          }`}>
            Agora você está pronto para treinar uma rede neural!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectIntroduction;
