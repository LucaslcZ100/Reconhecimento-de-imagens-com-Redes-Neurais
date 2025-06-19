
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { analyzeImage, saveAnalysisToHistory, ImageAnalysisResult } from '@/utils/imageAnalysis';
import GameHeader from './GameHeader';
import ImageUploadZone from './ImageUploadZone';
import UserClassification from './UserClassification';
import UserVerdict from './UserVerdict';
import AnalysisHistory from './AnalysisHistory';
import InteractiveHero from './InteractiveHero';
import ProjectIntroduction from './ProjectIntroduction';
import AIUnpluggedInfo from './AIUnpluggedInfo';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, RotateCcw } from 'lucide-react';

type GameState = 'hero' | 'introduction' | 'game' | 'info';

const ImageRecognitionGame = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedClassification, setSelectedClassification] = useState<string>('');
  const [userVerdict, setUserVerdict] = useState<string>('');
  const [gameState, setGameState] = useState<GameState>('hero');
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [historyKey, setHistoryKey] = useState(0);
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (file: File, imageUrl: string) => {
    setUploadedFile(file);
    setUploadedImage(imageUrl);
    setSelectedClassification('');
    setUserVerdict('');
    setAnalysisResult(null);
    setShowAISuggestion(false);
    
    // Análise automática em background
    setIsAnalyzing(true);
    try {
      const result = await analyzeImage(file);
      setAnalysisResult(result);
      
      toast({
        title: "🖼️ Imagem Analisada!",
        description: `Arquivo "${file.name}" foi carregado com sucesso.`,
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
    setShowAISuggestion(false);
    
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
      
      setHistoryKey(prev => prev + 1);
      setShowAISuggestion(true); // Mostrar sugestão da IA após veredito
      
      const isCorrectMessage = isCorrect ? "🎉 Classificação Correta!" : "🤔 Classificação Diferente";
      const description = isCorrect 
        ? "Sua classificação está de acordo com a análise do sistema!"
        : `Sistema sugeria: ${getClassificationName(analysisResult.suggestedClassification)}`;
      
      toast({
        title: isCorrectMessage,
        description,
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

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-black via-yellow-900 to-orange-900 font-neural">
      <div className="max-w-7xl mx-auto">
        <GameHeader />

        {/* Menu de navegação */}
        <div className="mb-6 flex gap-4">
          <Button
            onClick={returnToMenu}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Home className="h-4 w-4 mr-2" />
            🏠 Menu Principal
          </Button>
          <Button
            onClick={showInfo}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            📚 Curiosidades
          </Button>
        </div>

        {/* Botão de nova análise destacado */}
        {userVerdict && (
          <div className="mb-8 text-center">
            <Button
              onClick={resetAnalysis}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-bold"
            >
              <RotateCcw className="h-6 w-6 mr-3" />
              🔄 Iniciar Nova Análise
            </Button>
          </div>
        )}

        {/* Interface principal */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div>
            <ImageUploadZone 
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
              onClearImage={handleClearImage}
              isDarkTheme={true}
            />
          </div>
          
          <div>
            <UserClassification 
              onClassification={handleClassification}
              selectedClassification={selectedClassification}
              isDarkTheme={true}
              uploadedImage={uploadedImage}
              analysisResult={null} // Não mostrar sugestão da IA aqui
              isAnalyzing={isAnalyzing}
            />
          </div>
          
          <div>
            <UserVerdict 
              uploadedImage={uploadedImage}
              selectedClassification={selectedClassification}
              onVerdictSubmit={handleVerdictSubmit}
              onDownloadImage={handleDownloadImage}
              isDarkTheme={true}
              analysisResult={showAISuggestion ? analysisResult : null} // Mostrar apenas após veredito
            />
          </div>
          
          <div>
            <AnalysisHistory 
              isDarkTheme={true}
              key={historyKey}
              onHistoryUpdate={() => setHistoryKey(prev => prev + 1)}
            />
          </div>
        </div>

        {/* Resumo final */}
        {userVerdict && showAISuggestion && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-900 via-emerald-900 to-green-900 rounded-xl border-2 border-green-600">
            <h3 className="text-xl font-bold text-green-200 mb-4 flex items-center gap-2">
              🎉 Análise Completa Realizada!
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-green-800 p-4 rounded-lg">
                <h4 className="font-medium text-green-200 mb-2">📤 Imagem</h4>
                <p className="text-sm text-green-300">
                  {uploadedFile?.name || 'Imagem carregada'}
                </p>
              </div>
              
              <div className="bg-green-800 p-4 rounded-lg">
                <h4 className="font-medium text-green-200 mb-2">🎯 Classificação</h4>
                <p className="text-sm text-green-300">
                  {getClassificationName(selectedClassification)}
                </p>
              </div>
              
              <div className="bg-green-800 p-4 rounded-lg">
                <h4 className="font-medium text-green-200 mb-2">📝 Análise</h4>
                <p className="text-sm text-green-300">
                  {userVerdict.substring(0, 50)}...
                </p>
              </div>
            </div>
            
            <p className="text-green-300 text-sm">
              💡 <strong>Parabéns!</strong> Você demonstrou como a inteligência humana processa e analisa informações visuais de forma consciente e detalhada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageRecognitionGame;
