
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { saveAnalysisToHistory } from '@/utils/imageAnalysis';
import GameHeader from './GameHeader';
import ImageUploadZone from './ImageUploadZone';
import UserClassification from './UserClassification';
import UserVerdict from './UserVerdict';
import AnalysisHistory from './AnalysisHistory';
import InteractiveHero from './InteractiveHero';
import ProjectIntroduction from './ProjectIntroduction';
import AIUnpluggedInfo from './AIUnpluggedInfo';
import { Button } from '@/components/ui/button';
import { Home, BookOpen } from 'lucide-react';

type GameState = 'hero' | 'introduction' | 'game' | 'info';

const ImageRecognitionGame = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedClassification, setSelectedClassification] = useState<string>('');
  const [userVerdict, setUserVerdict] = useState<string>('');
  const [gameState, setGameState] = useState<GameState>('hero');
  const [historyKey, setHistoryKey] = useState(0);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (file: File, imageUrl: string) => {
    setUploadedFile(file);
    setUploadedImage(imageUrl);
    setSelectedClassification('');
    setUserVerdict('');
    setIsAnalysisComplete(false);
    
    toast({
      title: "📤 Imagem Carregada!",
      description: `"${file.name}" foi carregada com sucesso.`,
    });
  };

  const handleClearImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setUploadedFile(null);
    setSelectedClassification('');
    setUserVerdict('');
    setIsAnalysisComplete(false);
    
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
    
    if (uploadedFile && selectedClassification) {
      saveAnalysisToHistory({
        imageName: uploadedFile.name,
        imageUrl: uploadedImage || '',
        userClassification: selectedClassification,
        userVerdict: verdict
      });
      
      setHistoryKey(prev => prev + 1);
      setIsAnalysisComplete(true);
      
      toast({
        title: "✅ Análise Concluída!",
        description: "Sua análise foi salva no histórico.",
      });
    }
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

        {/* Menu de navegação compacto */}
        <div className="flex justify-center gap-3 mb-8">
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

        {/* Interface principal com layout em grade 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Linha superior: Upload e Classificação */}
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
            />
          </div>
          
          {/* Linha inferior: Veredito e Histórico */}
          <div className="space-y-6">
            <UserVerdict 
              uploadedImage={uploadedImage}
              selectedClassification={selectedClassification}
              onVerdictSubmit={handleVerdictSubmit}
              onDownloadImage={handleDownloadImage}
              onResetAnalysis={resetAnalysis}
              isDarkTheme={true}
              userVerdict={userVerdict}
              isAnalysisComplete={isAnalysisComplete}
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
