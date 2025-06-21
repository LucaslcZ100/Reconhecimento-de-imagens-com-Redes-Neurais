
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
import ModelStatus from './ModelStatus';
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
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeImage(file);
      setAnalysisResult(result);
      
      toast({
        title: "🖼️ Análise Completa!",
        description: `IA analisou "${file.name}" com ${Math.round(result.confidence * 100)}% de confiança.`,
      });
    } catch (error) {
      toast({
        title: "❌ Erro na Análise",
        description: "Não foi possível analisar a imagem.",
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
      description: `Você classificou: ${classificationNames[classification as keyof typeof classificationNames]}`,
    });
  };

  const handleVerdictSubmit = (verdict: string) => {
    setUserVerdict(verdict);
    
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
      setShowAISuggestion(true);
      
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
      title: "🔄 Nova Análise Iniciada",
      description: "Sistema resetado para nova análise.",
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
    return <InteractiveHero onStartIntroduction={() => setGameState('introduction')} />;
  }

  if (gameState === 'introduction') {
    return <ProjectIntroduction onStartGame={() => setGameState('game')} />;
  }

  if (gameState === 'info') {
    return <AIUnpluggedInfo onBack={() => setGameState('hero')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-yellow-900 to-orange-900">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <GameHeader />

        {/* Status do Modelo de IA */}
        <div className="flex justify-center mb-4">
          <ModelStatus isDarkTheme={true} />
        </div>

        {/* Menu de navegação compacto */}
        <div className="flex justify-center gap-3 mb-6">
          <Button
            onClick={() => setGameState('hero')}
            className="bg-orange-600 hover:bg-orange-700 text-white"
            size="sm"
          >
            <Home className="h-4 w-4 mr-2" />
            Menu
          </Button>
          <Button
            onClick={() => setGameState('info')}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            size="sm"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Curiosidades
          </Button>
        </div>

        {/* Interface principal responsiva */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="space-y-6">
            <ImageUploadZone 
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
              onClearImage={handleClearImage}
              isDarkTheme={true}
            />
          </div>
          
          <div className="space-y-6">
            <UserClassification 
              onClassification={handleClassification}
              selectedClassification={selectedClassification}
              isDarkTheme={true}
              uploadedImage={uploadedImage}
              analysisResult={null}
              isAnalyzing={isAnalyzing}
            />
          </div>
          
          <div className="space-y-6">
            <UserVerdict 
              uploadedImage={uploadedImage}
              selectedClassification={selectedClassification}
              onVerdictSubmit={handleVerdictSubmit}
              onDownloadImage={handleDownloadImage}
              onResetAnalysis={resetAnalysis}
              isDarkTheme={true}
              analysisResult={showAISuggestion ? analysisResult : null}
              userVerdict={userVerdict}
            />
          </div>
          
          <div className="space-y-6">
            <AnalysisHistory 
              isDarkTheme={true}
              key={historyKey}
              onHistoryUpdate={() => setHistoryKey(prev => prev + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageRecognitionGame;
