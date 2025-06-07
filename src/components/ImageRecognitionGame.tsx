import React, { useState, useEffect } from 'react';
import { Brain, Eye, Layers, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GameHeader from './GameHeader';
import GameExplanation from './GameExplanation';
import GameScore from './GameScore';
import GameStart from './GameStart';
import EmojiDisplay from './EmojiDisplay';
import NeuralProcessing from './NeuralProcessing';
import ShapeClassification from './ShapeClassification';
import DetectedFeatures from './DetectedFeatures';
import GameResults from './GameResults';
import InteractiveHero from './InteractiveHero';
import ProjectIntroduction from './ProjectIntroduction';
import AnalysisCompletedDialog from './AnalysisCompletedDialog';

interface GameResult {
  label: string;
  score: number;
}

interface EmojiItem {
  emoji: string;
  name: string;
  category: 'circle' | 'rectangle' | 'triangle';
  features: string[];
  imageUrl: string;
}

interface NetworkLayer {
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

interface ShapeCategory {
  shape: 'circle' | 'rectangle' | 'triangle';
  name: string;
  description: string;
  keywords: string[];
  color: string;
}

const ImageRecognitionGame = () => {
  const [currentEmoji, setCurrentEmoji] = useState<EmojiItem | null>(null);
  const [predictions, setPredictions] = useState<GameResult[]>([]);
  const [score, setScore] = useState(0);
  const [gameRound, setGameRound] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [correctShape, setCorrectShape] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'input' | 'analysis' | 'classification'>('input');
  const [networkLayers, setNetworkLayers] = useState<NetworkLayer[]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showPixelsCaptured, setShowPixelsCaptured] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const { toast } = useToast();

  // Imagens organizadas por categoria geométrica - CORRIGIDAS conforme definições
  const emojiItems: EmojiItem[] = [
    // 🔵 Círculo - APENAS Seres Vivos (organismos com vida)
    { 
      emoji: '🐱', 
      name: 'gato', 
      category: 'circle', 
      features: ['olhos redondos', 'focinho arredondado', 'orelhas triangulares', 'pelagem macia'],
      imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop'
    },
    { 
      emoji: '👤', 
      name: 'pessoa', 
      category: 'circle', 
      features: ['rosto oval', 'olhos', 'cabelo', 'expressão humana'],
      imageUrl: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🐋', 
      name: 'baleia', 
      category: 'circle', 
      features: ['corpo aerodinâmico', 'nadadeiras', 'respiração', 'mamífero aquático'],
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🐴', 
      name: 'cavalo', 
      category: 'circle', 
      features: ['crina fluindo', 'músculos definidos', 'pernas elegantes', 'mamífero terrestre'],
      imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🐄', 
      name: 'vaca', 
      category: 'circle', 
      features: ['corpo robusto', 'cabeça grande', 'manchas naturais', 'mamífero pastoreio'],
      imageUrl: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🦌', 
      name: 'veado', 
      category: 'circle', 
      features: ['corpo esbelto', 'chifres ramificados', 'pelagem marrom', 'mamífero selvagem'],
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🐻', 
      name: 'urso', 
      category: 'circle', 
      features: ['pelagem densa', 'corpo robusto', 'orelhas arredondadas', 'carnívoro'],
      imageUrl: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🐒', 
      name: 'macaco', 
      category: 'circle', 
      features: ['postura dinâmica', 'membros alongados', 'comportamento ágil', 'primata'],
      imageUrl: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🐕', 
      name: 'cachorro', 
      category: 'circle', 
      features: ['focinho úmido', 'orelhas expressivas', 'cauda balançando', 'companheiro leal'],
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🦅', 
      name: 'pássaro', 
      category: 'circle', 
      features: ['penas coloridas', 'bico afiado', 'asas poderosas', 'ave predadora'],
      imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop'
    },

    // 🔲 Retângulo - Objetos Manufaturados (criações humanas)
    { 
      emoji: '💻', 
      name: 'computador', 
      category: 'rectangle', 
      features: ['tela retangular', 'bordas definidas', 'teclado linear', 'tecnologia digital'],
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop'
    },
    { 
      emoji: '💻', 
      name: 'laptop', 
      category: 'rectangle', 
      features: ['formato dobrável', 'tela plana', 'bordas retas', 'portabilidade'],
      imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🖥️', 
      name: 'monitor', 
      category: 'rectangle', 
      features: ['tela grande', 'suporte central', 'formato retangular', 'display digital'],
      imageUrl: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🏢', 
      name: 'edifício', 
      category: 'rectangle', 
      features: ['estrutura vertical', 'janelas alinhadas', 'fachada geométrica', 'arquitetura urbana'],
      imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🚗', 
      name: 'carro', 
      category: 'rectangle', 
      features: ['carroceria metálica', 'rodas circulares', 'faróis', 'veículo motorizado'],
      imageUrl: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=400&h=400&fit=crop'
    },
    { 
      emoji: '📱', 
      name: 'smartphone', 
      category: 'rectangle', 
      features: ['tela touchscreen', 'bordas arredondadas', 'interface digital', 'tecnologia móvel'],
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🔧', 
      name: 'ferramenta', 
      category: 'rectangle', 
      features: ['metal resistente', 'cabo ergonômico', 'função específica', 'instrumento manual'],
      imageUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🍴', 
      name: 'talher', 
      category: 'rectangle', 
      features: ['material metálico', 'design funcional', 'utensílio culinário', 'acabamento polido'],
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🎒', 
      name: 'mochila', 
      category: 'rectangle', 
      features: ['tecido resistente', 'zíperes', 'alças ajustáveis', 'compartimentos'],
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🪑', 
      name: 'cadeira', 
      category: 'rectangle', 
      features: ['estrutura rígida', 'assento acolchoado', 'encosto ergonômico', 'móvel funcional'],
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
    },

    // 🔺 Triângulo - Elementos Naturais (não vivos)
    { 
      emoji: '🏔️', 
      name: 'montanha', 
      category: 'triangle', 
      features: ['pico pontiagudo', 'encosta íngreme', 'formação rochosa', 'elevação natural'],
      imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🌕', 
      name: 'lua', 
      category: 'triangle', 
      features: ['forma circular', 'crateras visíveis', 'brilho noturno', 'satélite natural'],
      imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🌊', 
      name: 'ondas do mar', 
      category: 'triangle', 
      features: ['movimento fluido', 'espuma branca', 'força natural', 'fenômeno aquático'],
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🫧', 
      name: 'bolhas', 
      category: 'triangle', 
      features: ['transparência', 'reflexos iridescentes', 'forma esférica', 'fenômeno físico'],
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🌋', 
      name: 'vulcão', 
      category: 'triangle', 
      features: ['cone irregular', 'atividade geológica', 'formação rochosa', 'fenômeno terrestre'],
      imageUrl: 'https://images.unsplash.com/photo-1577094593080-9ef1dfb13dce?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🏜️', 
      name: 'deserto', 
      category: 'triangle', 
      features: ['dunas de areia', 'paisagem árida', 'extensão vasta', 'ambiente seco'],
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🌌', 
      name: 'galáxia', 
      category: 'triangle', 
      features: ['estrelas distantes', 'nebulosas coloridas', 'espaço profundo', 'formação cósmica'],
      imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🌊', 
      name: 'oceano', 
      category: 'triangle', 
      features: ['água salgada', 'horizonte infinito', 'cor azul profunda', 'massa aquática'],
      imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🏝️', 
      name: 'praia', 
      category: 'triangle', 
      features: ['areia dourada', 'encontro terra-mar', 'paisagem costeira', 'ambiente natural'],
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop'
    },
    { 
      emoji: '☁️', 
      name: 'céu', 
      category: 'triangle', 
      features: ['nuvens flutuantes', 'tons azulados', 'atmosfera terrestre', 'fenômeno meteorológico'],
      imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=400&fit=crop'
    }
  ];

  // Categorias de formas geométricas atualizadas
  const shapeCategories: ShapeCategory[] = [
    {
      shape: 'circle',
      name: 'Círculo - Seres Vivos',
      description: 'Organismos que apresentam vida: pessoas, animais e plantas',
      keywords: ['vida', 'respiração', 'movimento', 'crescimento', 'reprodução'],
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      shape: 'rectangle',
      name: 'Retângulo - Objetos Manufaturados',
      description: 'Criações humanas: computadores, edifícios, carros e outros artifícios',
      keywords: ['artificial', 'manufaturado', 'tecnologia', 'ferramenta', 'construção'],
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      shape: 'triangle',
      name: 'Triângulo - Elementos Naturais',
      description: 'Componentes da natureza não vivos: montanhas, oceanos, fenômenos',
      keywords: ['natural', 'geológico', 'atmosférico', 'paisagem', 'fenômeno'],
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameFinished) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameFinished, startTime]);

  const startNewRound = async () => {
    setIsProcessing(true);
    setSelectedShape('');
    setCurrentStep('input');
    setShowPixelsCaptured(false);
    
    const randomEmoji = emojiItems[Math.floor(Math.random() * emojiItems.length)];
    setCurrentEmoji(randomEmoji);
    
    console.log('🔍 Iniciando análise de rede neural para:', randomEmoji.name);
    
    // Tempo para capturar pixels
    setTimeout(() => {
      setShowPixelsCaptured(true);
      
      setTimeout(() => {
        setCurrentStep('analysis');
        
        const layers: NetworkLayer[] = [
          {
            name: 'Camada de Entrada',
            description: 'Recebe a imagem e converte em dados numéricos',
            icon: <Eye className="h-5 w-5" />,
            features: ['pixels', 'cores', 'brilho', 'contraste']
          },
          {
            name: 'Camadas Convolucionais',
            description: 'Detecta características básicas como bordas e formas',
            icon: <Layers className="h-5 w-5" />,
            features: randomEmoji.features.slice(0, 2)
          },
          {
            name: 'Camadas Intermediárias',
            description: 'Combina características para formar padrões mais complexos',
            icon: <Brain className="h-5 w-5" />,
            features: randomEmoji.features.slice(2)
          },
          {
            name: 'Camada de Saída',
            description: 'Classifica o objeto com base nos padrões identificados',
            icon: <Zap className="h-5 w-5" />,
            features: [randomEmoji.name]
          }
        ];
        
        setNetworkLayers(layers);
        
        // Tempo mais longo para análise (10 segundos)
        setTimeout(() => {
          setCurrentStep('classification');
          
          const mainPrediction = { label: randomEmoji.name, score: 0.85 + Math.random() * 0.1 };
          const secondaryPredictions = [
            { label: 'objeto similar', score: 0.1 + Math.random() * 0.05 },
            { label: 'categoria relacionada', score: 0.05 + Math.random() * 0.03 }
          ];
          
          const allPredictions = [mainPrediction, ...secondaryPredictions];
          setPredictions(allPredictions);
          setCorrectShape(randomEmoji.category);
          setGameRound(prev => prev + 1);
          setIsProcessing(false);
          
          console.log('📊 Classificação completa:', allPredictions);
        }, 10000); // 10 segundos para análise
      }, 2000); // 2 segundos para mostrar pixels capturados
    }, 3000); // 3 segundos para capturar pixels
  };

  const handleShapeSelection = (shape: string) => {
    if (selectedShape !== '') return;
    
    setSelectedShape(shape);
    
    const isCorrect = shape === correctShape;
    setIsCorrectAnswer(isCorrect);
    setShowAnalysisResult(true);
    
    const selectedCategory = shapeCategories.find(cat => cat.shape === shape);
    const correctCategory = shapeCategories.find(cat => cat.shape === correctShape);

    if (isCorrect) {
      setScore(prev => prev + 10);
      toast({
        title: "🎉 Classificação Correta!",
        description: `Excelente! A rede neural identificou "${currentEmoji?.name}" como ${correctCategory?.name}`,
      });
    } else {
      toast({
        title: "🤖 Análise da Rede Neural",
        description: `A rede classificou "${currentEmoji?.name}" como ${correctCategory?.name}. ${selectedCategory?.name} tem características diferentes.`,
        variant: "destructive"
      });
    }

    // Mostrar modal após 3 segundos
    setTimeout(() => {
      setShowAnalysisDialog(true);
      setShowAnalysisResult(false);
    }, 3000);
  };

  const handleNewAnalysis = () => {
    setShowAnalysisDialog(false);
    startNewRound();
  };

  const handleEndSimulation = () => {
    setShowAnalysisDialog(false);
    finishGame();
  };

  const resetGame = () => {
    setScore(0);
    setGameRound(0);
    setPredictions([]);
    setCurrentEmoji(null);
    setGameStarted(false);
    setShowExplanation(true);
    setSelectedShape('');
    setCorrectShape('');
    setCurrentStep('input');
    setNetworkLayers([]);
    setGameFinished(false);
    setTimeElapsed(0);
    setShowPixelsCaptured(false);
    setShowHero(true);
    setShowIntroduction(false);
  };

  const startIntroduction = () => {
    setShowHero(false);
    setShowIntroduction(true);
  };

  const startGame = () => {
    setShowHero(false);
    setShowIntroduction(false);
    setGameStarted(true);
    setShowExplanation(false);
    setStartTime(Date.now());
    startNewRound();
  };

  const finishGame = () => {
    setGameFinished(true);
  };

  if (showHero) {
    return <InteractiveHero onStartIntroduction={startIntroduction} />;
  }

  if (showIntroduction) {
    return <ProjectIntroduction onStartGame={startGame} />;
  }

  if (gameFinished) {
    return (
      <GameResults 
        score={score}
        gameRound={gameRound}
        timeElapsed={timeElapsed}
        onRestart={resetGame}
      />
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-black via-yellow-900 to-orange-900">
      <div className="max-w-6xl mx-auto">
        <GameHeader />

        {showExplanation && !gameStarted && <GameExplanation />}

        <GameScore score={score} gameRound={gameRound} gameStarted={gameStarted} />

        {!gameStarted ? (
          <GameStart onStartGame={startGame} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <EmojiDisplay 
              currentEmoji={currentEmoji} 
              showPixelsCaptured={showPixelsCaptured}
              isDarkTheme={true}
            />
            <NeuralProcessing 
              currentStep={currentStep}
              networkLayers={networkLayers}
              predictions={predictions}
              isDarkTheme={true}
            />
            <ShapeClassification 
              currentStep={currentStep}
              selectedShape={selectedShape}
              onShapeSelection={handleShapeSelection}
              onResetGame={resetGame}
              onFinishGame={finishGame}
              isDarkTheme={true}
            />
          </div>
        )}

        {/* Resultado da Análise - Barra colorida no topo */}
        {showAnalysisResult && selectedShape && (
          <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg border-2 transition-all duration-500 ${
            isCorrectAnswer 
              ? 'bg-green-100 border-green-500 text-green-800' 
              : 'bg-red-100 border-red-500 text-red-800'
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {isCorrectAnswer ? '✅' : '❌'}
              </span>
              <span className="font-semibold">
                {isCorrectAnswer ? 'Correto!' : 'Incorreto!'}
              </span>
              <span className="text-sm">
                {isCorrectAnswer 
                  ? `A IA classificou "${currentEmoji?.name}" corretamente.`
                  : `A resposta correta era ${shapeCategories.find(cat => cat.shape === correctShape)?.name}.`
                }
              </span>
            </div>
          </div>
        )}

        {currentEmoji && currentStep === 'classification' && (
          <DetectedFeatures 
            currentEmoji={currentEmoji}
            correctShape={correctShape}
            currentStep={currentStep}
          />
        )}

        <AnalysisCompletedDialog
          isOpen={showAnalysisDialog}
          onNewAnalysis={handleNewAnalysis}
          onEndSimulation={handleEndSimulation}
          currentScore={score}
          currentRound={gameRound}
        />
      </div>
    </div>
  );
};

export default ImageRecognitionGame;
