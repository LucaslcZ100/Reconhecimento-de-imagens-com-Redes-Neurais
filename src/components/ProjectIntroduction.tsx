
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Eye, Layers, Zap, ArrowRight, Camera, Cpu, Target, ChevronRight, MousePointer } from 'lucide-react';

interface ProjectIntroductionProps {
  onStartGame: () => void;
}

const ProjectIntroduction = ({ onStartGame }: ProjectIntroductionProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [neurons, setNeurons] = useState<Array<{ id: number; x: number; y: number; active: boolean }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Gerar neurônios para background interativo
    const neuronArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      active: false
    }));
    setNeurons(neuronArray);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
    
    // Ativar neurônios próximos ao mouse
    setNeurons(prev => prev.map(neuron => {
      const distance = Math.sqrt(
        Math.pow(neuron.x - x, 2) + Math.pow(neuron.y - y, 2)
      );
      return {
        ...neuron,
        active: distance < 20
      };
    }));
  };

  const steps = [
    {
      title: "O Que São Redes Neurais?",
      icon: <Brain className="h-8 w-8" />,
      content: "As redes neurais são sistemas de computador inspirados no cérebro humano. Elas aprendem a reconhecer padrões através de exemplos, assim como nós aprendemos a reconhecer objetos quando somos crianças.",
      example: "🧠 Assim como você aprendeu a reconhecer um gato vendo muitos gatos diferentes, a IA aprende vendo milhares de imagens de gatos.",
      details: "Uma rede neural artificial possui camadas de 'neurônios' conectados que processam informações. Cada neurônio recebe dados, aplica uma função matemática e passa o resultado adiante. Com trilhões de conexões, a rede aprende padrões complexos através do treinamento."
    },
    {
      title: "Como a IA Vê uma Imagem?",
      icon: <Eye className="h-8 w-8" />,
      content: "Para um computador, uma imagem é apenas uma matriz de números representando cores. Cada pixel tem valores de vermelho, verde e azul (RGB) que variam de 0 a 255.",
      example: "📸 Uma imagem de 100x100 pixels contém 30.000 números que a IA precisa analisar para entender o que está vendo.",
      details: "Por exemplo: um pixel branco = (255,255,255), preto = (0,0,0), vermelho puro = (255,0,0). A IA não 'vê' como nós - ela analisa padrões matemáticos nestes números para identificar bordas, texturas, formas e objetos."
    },
    {
      title: "Camadas de Processamento",
      icon: <Layers className="h-8 w-8" />,
      content: "As redes neurais processam informações em camadas sequenciais. Cada camada extrai características diferentes: bordas, formas, texturas e finalmente objetos completos.",
      example: "🔍 Primeira camada: detecta linhas → Segunda: detecta formas → Terceira: reconhece objetos completos",
      details: "Camadas iniciais detectam características básicas (linhas, bordas). Camadas intermediárias combinam essas características em formas mais complexas (círculos, retângulos). Camadas finais reconhecem objetos específicos (gatos, carros, pessoas)."
    },
    {
      title: "Classificação e Confiança",
      icon: <Target className="h-8 w-8" />,
      content: "Na última etapa, a rede neural combina todas as características identificadas para tomar uma decisão final sobre o que está vendo na imagem, sempre com um nível de confiança.",
      example: "🎯 'Vejo pelos, orelhas pontudas, olhos grandes → Isso é um gato!' (com 95% de confiança)",
      details: "A IA não apenas classifica, mas também informa sua 'certeza'. 95% de confiança significa que, de 100 casos similares, ela acertaria 95. Se a confiança for baixa (ex: 60%), pode significar que a imagem é ambígua ou não está no dataset de treinamento."
    }
  ];

  const categories = [
    {
      name: "Seres Vivos",
      shape: "circle",
      color: "bg-yellow-600",
      examples: ["🐱 Gato", "🐶 Cachorro", "👤 Pessoa", "🐵 Macaco", "🐴 Cavalo"],
      features: "Formas orgânicas, olhos, movimento natural, características biológicas",
      aiPerspective: "A IA identifica padrões como simetria facial, presença de olhos, texturas orgânicas e proporções típicas de seres vivos."
    },
    {
      name: "Objetos Manufaturados", 
      shape: "rectangle",
      color: "bg-yellow-600",
      examples: ["🚗 Carro", "📱 Telefone", "🏠 Casa", "💻 Computador", "📚 Livro"],
      features: "Linhas retas, geometria regular, bordas definidas, materiais artificiais",
      aiPerspective: "A IA detecta padrões geométricos regulares, superfícies lisas, ângulos de 90 graus e estruturas simétricas criadas pelo homem."
    },
    {
      name: "Elementos Naturais",
      shape: "triangle", 
      color: "bg-yellow-600",
      examples: ["🏔️ Montanha", "🌲 Árvore", "🌸 Flor", "🍃 Folha", "⛰️ Paisagem"],
      features: "Formas irregulares, texturas naturais, assimetria, crescimento orgânico",
      aiPerspective: "A IA reconhece padrões fractais, texturas irregulares, assimetria natural e estruturas que seguem leis de crescimento orgânico."
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
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen p-6 bg-gradient-to-br from-black via-yellow-900 to-yellow-800 relative overflow-hidden"
    >
      {/* Background interativo */}
      {neurons.map((neuron) => (
        <div
          key={neuron.id}
          className={`absolute w-2 h-2 rounded-full transition-all duration-300 pointer-events-none ${
            neuron.active
              ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 scale-150'
              : 'bg-yellow-600/20'
          }`}
          style={{
            left: `${neuron.x}%`,
            top: `${neuron.y}%`,
          }}
        />
      ))}

      {/* Cursor seguidor */}
      <div
        className="absolute w-4 h-4 bg-yellow-400 rounded-full opacity-40 pointer-events-none animate-pulse"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
            Como Funciona o Reconhecimento de Imagens?
          </h1>
          <p className="text-xl text-yellow-200">
            Uma jornada pelos conceitos fundamentais da Inteligência Artificial
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-yellow-300 mt-4">
            <MousePointer className="h-4 w-4" />
            <span>Mova o mouse para interagir com os neurônios</span>
          </div>
        </div>

        {/* Passo a passo interativo */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="h-fit bg-black border-yellow-600 text-yellow-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-600">
                    {steps[currentStep].icon}
                  </div>
                  <CardTitle className="text-yellow-200">
                    {steps[currentStep].title}
                  </CardTitle>
                </div>
                <Badge className="bg-yellow-600 text-black">
                  {currentStep + 1} de {steps.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                {steps[currentStep].content}
              </p>
              
              <div className="p-4 rounded-lg border-l-4 bg-yellow-800 border-yellow-400 text-yellow-100">
                <p className="font-medium">Exemplo Prático:</p>
                <p>{steps[currentStep].example}</p>
              </div>

              <div className="p-4 rounded-lg border-l-4 bg-yellow-700 border-yellow-400 text-yellow-100">
                <p className="font-medium">Detalhes Técnicos:</p>
                <p className="text-sm">{steps[currentStep].details}</p>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="border-yellow-600 text-black bg-yellow-600 hover:bg-yellow-500"
                >
                  Anterior
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                  className="bg-yellow-600 hover:bg-yellow-500 text-black"
                >
                  Próximo <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Visualização interativa */}
          <Card className="bg-black border-yellow-400 text-yellow-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-300">
                <Cpu className="h-6 w-6" />
                Processo em Ação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Simulação visual baseada no passo atual */}
                <div className="p-6 rounded-lg border-2 border-dashed border-yellow-400">
                  {currentStep === 0 && (
                    <div className="text-center">
                      <Brain className="h-20 w-20 mx-auto mb-4 animate-pulse text-yellow-400" />
                      <p>Neurônios artificiais processando informações</p>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-8 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded"
                            style={{ 
                              animationDelay: `${i * 0.2}s`,
                              animation: 'pulse 2s infinite'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {currentStep === 1 && (
                    <div>
                      <div className="text-center mb-4">
                        <Eye className="h-16 w-16 mx-auto text-yellow-400" />
                        <p className="text-sm">Matriz de Pixels RGB</p>
                      </div>
                      <div className="grid grid-cols-6 gap-1">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div
                            key={i}
                            className="aspect-square rounded text-xs flex items-center justify-center"
                            style={{ 
                              backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
                              fontSize: '8px',
                              color: 'white'
                            }}
                          >
                            {Math.floor(Math.random() * 255)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      {['Entrada (Pixels)', 'Conv. 1 (Bordas)', 'Conv. 2 (Formas)', 'Saída (Objetos)'].map((layer, i) => (
                        <div key={layer} className="flex items-center gap-4">
                          <Badge className="bg-yellow-600 text-black w-16 text-xs">
                            L{i + 1}
                          </Badge>
                          <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 animate-pulse"
                              style={{
                                width: `${(i + 1) * 25}%`,
                                animationDelay: `${i * 0.5}s`
                              }}
                            />
                          </div>
                          <span className="text-xs text-yellow-300">{layer}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="text-center space-y-4">
                      <Target className="h-20 w-20 mx-auto mb-4 animate-bounce text-yellow-400" />
                      <div className="space-y-2">
                        <p className="text-lg font-semibold">Decisão: 🐱 GATO</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Gato:</span>
                            <span className="text-green-400">95.3%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Cachorro:</span>
                            <span className="text-yellow-400">3.1%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Outros:</span>
                            <span className="text-gray-400">1.6%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categorias do jogo */}
        <Card className="mb-8 bg-black border-yellow-600">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-yellow-200">
              Categorias que Você Vai Treinar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 bg-black border-yellow-600 hover:border-yellow-400"
                >
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 mx-auto rounded-lg ${category.color} flex items-center justify-center text-black text-2xl font-bold`}>
                      {category.shape === 'circle' && '●'}
                      {category.shape === 'rectangle' && '■'}
                      {category.shape === 'triangle' && '▲'}
                    </div>
                    <h3 className="text-lg font-semibold text-yellow-200">
                      {category.name}
                    </h3>
                    <div className="space-y-2">
                      {category.examples.map((example) => (
                        <Badge
                          key={example}
                          variant="outline"
                          className="block border-yellow-500 text-yellow-200"
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-yellow-300">
                      {category.features}
                    </p>
                    <div className="text-xs text-yellow-200 bg-yellow-800 p-2 rounded">
                      <strong>Perspectiva da IA:</strong> {category.aiPerspective}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Seção adicional: Como a IA aprende */}
        <Card className="mb-8 bg-black border-yellow-400">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-yellow-300">
              🎓 Como a IA Aprende a Reconhecer Imagens?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-yellow-100 space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-yellow-400">1. Dataset de Treinamento</h4>
                <p className="text-sm">A IA precisa ver milhares (ou milhões) de imagens etiquetadas. Por exemplo: 10.000 fotos de gatos com a etiqueta "gato".</p>
                
                <h4 className="font-semibold text-yellow-400">2. Processo de Aprendizado</h4>
                <p className="text-sm">A rede faz palpites iniciais (geralmente errados), compara com a resposta certa e ajusta seus "pesos" neurais para melhorar.</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-yellow-400">3. Validação e Teste</h4>
                <p className="text-sm">Após o treinamento, a IA é testada com imagens que nunca viu antes para verificar se realmente aprendeu os padrões.</p>
                
                <h4 className="font-semibold text-yellow-400">4. Melhoria Contínua</h4>
                <p className="text-sm">Quanto mais dados de qualidade a IA recebe, melhor ela fica em reconhecer novos padrões e situações.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão para iniciar */}
        <div className="text-center">
          <Button
            onClick={onStartGame}
            size="lg"
            className="text-xl px-12 py-6 font-bold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black shadow-lg shadow-yellow-500/25"
          >
            🚀 Iniciar Simulação de IA
            <ArrowRight className="h-6 w-6 ml-2" />
          </Button>
          <p className="mt-4 text-lg text-yellow-200">
            Agora você está pronto para treinar uma rede neural!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectIntroduction;
