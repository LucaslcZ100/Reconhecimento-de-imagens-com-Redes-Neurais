import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMouseActivity } from '@/hooks/useMouseActivity';
import { analyzeImage, saveAnalysisToHistory, ImageAnalysisResult } from '@/utils/imageAnalysis';
import GameHeader from './GameHeader';
import ImageUploadZone from './ImageUploadZone';
import UserClassification from './UserClassification';
import UserVerdict from './UserVerdict';
import AnalysisHistory from './AnalysisHistory';
import InteractiveHero from './InteractiveHero';
import ProjectIntroduction from './ProjectIntroduction';
import AIUnpluggedInfo from './AIUnpluggedInfo';
import CodeAnalysisSystem from './CodeAnalysisSystem';
import { Button } from '@/components/ui/button';
import { Home, Code, BookOpen } from 'lucide-react';

type GameState = 'hero' | 'introduction' | 'game' | 'info' | 'codeAnalysis';

const ImageRecognitionGame = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedClassification, setSelectedClassification] = useState<string>('');
  const [userVerdict, setUserVerdict] = useState<string>('');
  const [gameState, setGameState] = useState<GameState>('hero');
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [historyKey, setHistoryKey] = useState(0);
  const { toast } = useToast();
  const isMouseActive = useMouseActivity();

  const handleImageUpload = async (file: File, imageUrl: string) => {
    setUploadedFile(file);
    setUploadedImage(imageUrl);
    setSelectedClassification('');
    setUserVerdict('');
    setAnalysisResult(null);
    
    // Iniciar análise automática da imagem
    setIsAnalyzing(true);
    try {
      const result = await analyzeImage(file);
      setAnalysisResult(result);
      
      toast({
        title: "🖼️ Imagem Analisada!",
        description: `Arquivo "${file.name}" foi analisado. Sistema sugere: ${getClassificationName(result.suggestedClassification)}`,
      });
    } catch (error) {
      toast({
        title: "❌ Erro na Análise",
        description: "Não foi possível analisar a imagem automaticamente.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClearImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setUploadedFile(null);
    setSelectedClassification('');
    setUserVerdict('');
    setAnalysisResult(null);
    
    toast({
      title: "🗑️ Imagem Removida",
      description: "Você pode fazer upload de uma nova imagem agora.",
    });
  };

  const handleClassification = (classification: string) => {
    setSelectedClassification(classification);
    
    const classificationNames = {
      'living': 'Ser Vivo',
      'manufactured': 'Objeto Manufaturado',
      'natural': 'Elemento Natural'
    };
    
    toast({
      title: "🎯 Classificação Definida!",
      description: `Você classificou a imagem como: ${classificationNames[classification as keyof typeof classificationNames]}`,
    });
  };

  const handleVerdictSubmit = (verdict: string) => {
    setUserVerdict(verdict);
    
    // Salvar análise no histórico
    if (uploadedFile && analysisResult) {
      const isCorrect = selectedClassification === analysisResult.suggestedClassification;
      
      saveAnalysisToHistory({
        imageName: uploadedFile.name,
        imageUrl: uploadedImage || '',
        userClassification: selectedClassification,
        suggestedClassification: analysisResult.suggestedClassification,
        isCorrect,
        userVerdict: verdict,
        confidence: analysisResult.confidence
      });
      
      setHistoryKey(prev => prev + 1); // Forçar atualização do histórico
      
      toast({
        title: isCorrect ? "🎉 Classificação Correta!" : "🤔 Classificação Diferente",
        description: isCorrect 
          ? "Sua classificação está de acordo com a análise do sistema!"
          : `Sistema sugeria: ${getClassificationName(analysisResult.suggestedClassification)}`,
        variant: isCorrect ? "default" : "destructive"
      });
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

  const handleDownloadImage = () => {
    if (uploadedImage && uploadedFile) {
      const link = document.createElement('a');
      link.href = uploadedImage;
      link.download = `analise_${uploadedFile.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "📥 Download Iniciado",
        description: "A imagem analisada está sendo baixada.",
      });
    }
  };

  const resetAnalysis = () => {
    handleClearImage();
    
    toast({
      title: "🔄 Nova Análise",
      description: "Sistema resetado. Você pode começar uma nova análise.",
    });
  };

  const startIntroduction = () => {
    setGameState('introduction');
  };

  const startGame = () => {
    setGameState('game');
  };

  const showInfo = () => {
    setGameState('info');
  };

  const showCodeAnalysis = () => {
    setGameState('codeAnalysis');
  };

  const returnToMenu = () => {
    setGameState('hero');
  };

  if (gameState === 'hero') {
    return <InteractiveHero onStartIntroduction={startIntroduction} />;
  }

  if (gameState === 'introduction') {
    return <ProjectIntroduction onStartGame={startGame} />;
  }

  if (gameState === 'info') {
    return <AIUnpluggedInfo onBack={returnToMenu} />;
  }

  if (gameState === 'codeAnalysis') {
    return (
      <div className={`min-h-screen p-4 bg-gradient-to-br from-black via-blue-900 to-purple-900 font-neural transition-all duration-500 ${
        isMouseActive ? 'animate-fade-in' : ''
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex gap-4">
            <Button
              onClick={returnToMenu}
              className={`transition-all duration-300 ${
                isMouseActive ? 'transform hover:scale-110' : ''
              } bg-blue-600 hover:bg-blue-700 text-white`}
            >
              <Home className="h-4 w-4 mr-2" />
              🏠 Menu Principal
            </Button>
            <Button
              onClick={startGame}
              className={`transition-all duration-300 ${
                isMouseActive ? 'transform hover:scale-110' : ''
              } bg-orange-600 hover:bg-orange-700 text-white`}
            >
              🎮 Jogo de Reconhecimento
            </Button>
            <Button
              onClick={showInfo}
              className={`transition-all duration-300 ${
                isMouseActive ? 'transform hover:scale-110' : ''
              } bg-purple-600 hover:bg-purple-700 text-white`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              📚 Curiosidades
            </Button>
          </div>
          
          <CodeAnalysisSystem isDarkTheme={true} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 bg-gradient-to-br from-black via-yellow-900 to-orange-900 font-neural transition-all duration-500 ${
      isMouseActive ? 'animate-fade-in' : ''
    }`}>
      <div className="max-w-7xl mx-auto">
        <GameHeader />

        {/* Menu de navegação */}
        <div className={`mb-6 flex gap-4 transition-all duration-500 ${
          isMouseActive ? 'animate-fade-in' : ''
        }`}>
          <Button
            onClick={returnToMenu}
            className={`transition-all duration-300 ${
              isMouseActive ? 'transform hover:scale-110' : ''
            } bg-orange-600 hover:bg-orange-700 text-white`}
          >
            <Home className="h-4 w-4 mr-2" />
            🏠 Menu Principal
          </Button>
          <Button
            onClick={showCodeAnalysis}
            className={`transition-all duration-300 ${
              isMouseActive ? 'transform hover:scale-110' : ''
            } bg-blue-600 hover:bg-blue-700 text-white`}
          >
            <Code className="h-4 w-4 mr-2" />
            💻 Análise de Código
          </Button>
          <Button
            onClick={showInfo}
            className={`transition-all duration-300 ${
              isMouseActive ? 'transform hover:scale-110' : ''
            } bg-purple-600 hover:bg-purple-700 text-white`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            📚 Curiosidades
          </Button>
        </div>

        {/* Progresso da análise */}
        <div className={`mb-8 transition-all duration-500 ${
          isMouseActive ? 'animate-fade-in' : ''
        }`}>
          <div className={`bg-black/50 rounded-lg p-4 border border-orange-500 transition-all duration-500 ${
            isMouseActive ? 'hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20' : ''
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-orange-300 font-medium flex items-center gap-2">
                📊 Progresso da Análise
                {isAnalyzing && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                )}
              </h3>
              <button
                onClick={resetAnalysis}
                className={`text-orange-400 hover:text-orange-300 text-sm underline transition-all duration-300 ${
                  isMouseActive ? 'hover:scale-110' : ''
                }`}
              >
                🔄 Nova Análise
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div className={`p-3 rounded-lg border text-center transition-all duration-500 ${
                isMouseActive ? 'transform hover:scale-110' : ''
              } ${
                uploadedImage 
                  ? 'bg-green-900 border-green-600 text-green-200 animate-pulse' 
                  : 'bg-orange-800 border-orange-600 text-orange-300 animate-bounce'
              }`}>
                <div className="text-lg mb-1">
                  {uploadedImage ? '✅' : '1️⃣'}
                </div>
                <div className="text-sm font-medium">Upload</div>
              </div>
              
              <div className={`p-3 rounded-lg border text-center transition-all duration-500 ${
                isMouseActive ? 'transform hover:scale-110' : ''
              } ${
                analysisResult 
                  ? 'bg-green-900 border-green-600 text-green-200 animate-pulse' 
                  : uploadedImage 
                    ? 'bg-orange-800 border-orange-600 text-orange-300 animate-bounce' 
                    : 'bg-yellow-800 border-yellow-600 text-yellow-400 opacity-50'
              }`}>
                <div className="text-lg mb-1">
                  {analysisResult ? '✅' : uploadedImage ? '🔍' : '⏳'}
                </div>
                <div className="text-sm font-medium">Análise IA</div>
              </div>

              <div className={`p-3 rounded-lg border text-center transition-all duration-500 ${
                isMouseActive ? 'transform hover:scale-110' : ''
              } ${
                selectedClassification 
                  ? 'bg-green-900 border-green-600 text-green-200 animate-pulse' 
                  : analysisResult 
                    ? 'bg-orange-800 border-orange-600 text-orange-300 animate-bounce' 
                    : 'bg-yellow-800 border-yellow-600 text-yellow-400 opacity-50'
              }`}>
                <div className="text-lg mb-1">
                  {selectedClassification ? '✅' : analysisResult ? '2️⃣' : '⏳'}
                </div>
                <div className="text-sm font-medium">Classificação</div>
              </div>
              
              <div className={`p-3 rounded-lg border text-center transition-all duration-500 ${
                isMouseActive ? 'transform hover:scale-110' : ''
              } ${
                userVerdict 
                  ? 'bg-green-900 border-green-600 text-green-200 animate-pulse' 
                  : selectedClassification 
                    ? 'bg-orange-800 border-orange-600 text-orange-300 animate-bounce' 
                    : 'bg-yellow-800 border-yellow-600 text-yellow-400 opacity-50'
              }`}>
                <div className="text-lg mb-1">
                  {userVerdict ? '✅' : selectedClassification ? '3️⃣' : '⏳'}
                </div>
                <div className="text-sm font-medium">Veredito</div>
              </div>
            </div>
            
            {/* Mostrar resultado da análise IA */}
            {analysisResult && (
              <div className={`mt-4 p-3 rounded-lg border transition-all duration-500 ${
                isMouseActive ? 'hover:scale-105' : ''
              } ${
                selectedClassification === analysisResult.suggestedClassification
                  ? 'bg-green-900/50 border-green-600 text-green-200'
                  : selectedClassification && selectedClassification !== analysisResult.suggestedClassification
                    ? 'bg-red-900/50 border-red-600 text-red-200'
                    : 'bg-blue-900/50 border-blue-600 text-blue-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    🤖 IA sugere: {getClassificationName(analysisResult.suggestedClassification)}
                  </span>
                  <span className="text-xs opacity-75">
                    Confiança: {Math.round(analysisResult.confidence * 100)}%
                  </span>
                </div>
                {selectedClassification && selectedClassification !== analysisResult.suggestedClassification && (
                  <div className="text-xs mt-1 opacity-75">
                    ⚠️ Sua classificação difere da sugestão do sistema
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Interface principal */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className={`transition-all duration-500 ${
            isMouseActive ? 'animate-fade-in' : ''
          }`} style={{ animationDelay: '0.2s' }}>
            <ImageUploadZone 
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
              onClearImage={handleClearImage}
              isDarkTheme={true}
            />
          </div>
          
          <div className={`transition-all duration-500 ${
            isMouseActive ? 'animate-fade-in' : ''
          }`} style={{ animationDelay: '0.4s' }}>
            <UserClassification 
              onClassification={handleClassification}
              selectedClassification={selectedClassification}
              isDarkTheme={true}
              uploadedImage={uploadedImage}
              analysisResult={analysisResult}
              isAnalyzing={isAnalyzing}
            />
          </div>
          
          <div className={`transition-all duration-500 ${
            isMouseActive ? 'animate-fade-in' : ''
          }`} style={{ animationDelay: '0.6s' }}>
            <UserVerdict 
              uploadedImage={uploadedImage}
              selectedClassification={selectedClassification}
              onVerdictSubmit={handleVerdictSubmit}
              onDownloadImage={handleDownloadImage}
              isDarkTheme={true}
              analysisResult={analysisResult}
            />
          </div>
          
          <div className={`transition-all duration-500 ${
            isMouseActive ? 'animate-fade-in' : ''
          }`} style={{ animationDelay: '0.8s' }}>
            <AnalysisHistory 
              isDarkTheme={true}
              key={historyKey}
              onHistoryUpdate={() => setHistoryKey(prev => prev + 1)}
            />
          </div>
        </div>

        {/* Resumo final */}
        {userVerdict && (
          <div className={`mt-8 p-6 bg-gradient-to-r from-green-900 via-emerald-900 to-green-900 rounded-xl border-2 border-green-600 transition-all duration-500 ${
            isMouseActive ? 'hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 animate-fade-in' : ''
          }`}>
            <h3 className={`text-xl font-bold text-green-200 mb-4 flex items-center gap-2 ${
              isMouseActive ? 'animate-bounce' : ''
            }`}>
              🎉 Análise Completa Realizada!
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className={`bg-green-800 p-4 rounded-lg transition-all duration-300 ${
                isMouseActive ? 'hover:scale-105 animate-fade-in' : ''
              }`}>
                <h4 className="font-medium text-green-200 mb-2 flex items-center gap-2">
                  📤 Imagem
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </h4>
                <p className="text-sm text-green-300">
                  {uploadedFile?.name || 'Imagem carregada'}
                </p>
              </div>
              
              <div className={`bg-green-800 p-4 rounded-lg transition-all duration-300 ${
                isMouseActive ? 'hover:scale-105 animate-fade-in' : ''
              }`} style={{ animationDelay: '0.2s' }}>
                <h4 className="font-medium text-green-200 mb-2 flex items-center gap-2">
                  🎯 Classificação
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                </h4>
                <p className={`text-sm text-green-300 ${
                  isMouseActive ? 'animate-pulse' : ''
                }`}>
                  {getClassificationName(selectedClassification)}
                </p>
              </div>
              
              <div className={`bg-green-800 p-4 rounded-lg transition-all duration-300 ${
                isMouseActive ? 'hover:scale-105 animate-fade-in' : ''
              }`} style={{ animationDelay: '0.4s' }}>
                <h4 className="font-medium text-green-200 mb-2 flex items-center gap-2">
                  📝 Análise
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-spin"></div>
                </h4>
                <p className="text-sm text-green-300">
                  {userVerdict.substring(0, 50)}...
                </p>
              </div>
            </div>
            
            <p className={`text-green-300 text-sm ${
              isMouseActive ? 'animate-pulse' : ''
            }`}>
              💡 <strong>Parabéns!</strong> Você demonstrou como a inteligência humana processa e analisa informações visuais de forma consciente e detalhada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageRecognitionGame;
