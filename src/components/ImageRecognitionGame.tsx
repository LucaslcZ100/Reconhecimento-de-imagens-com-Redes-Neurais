
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import GameHeader from './GameHeader';
import ImageUploadZone from './ImageUploadZone';
import UserClassification from './UserClassification';
import UserVerdict from './UserVerdict';
import InteractiveHero from './InteractiveHero';
import ProjectIntroduction from './ProjectIntroduction';

const ImageRecognitionGame = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedClassification, setSelectedClassification] = useState<string>('');
  const [userVerdict, setUserVerdict] = useState<string>('');
  const [showHero, setShowHero] = useState(true);
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (file: File, imageUrl: string) => {
    setUploadedFile(file);
    setUploadedImage(imageUrl);
    setSelectedClassification('');
    setUserVerdict('');
    
    toast({
      title: "🖼️ Imagem Carregada!",
      description: `Arquivo "${file.name}" foi carregado com sucesso. Agora faça sua classificação.`,
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
    
    toast({
      title: "📝 Análise Completa!",
      description: "Sua análise detalhada foi registrada. Parabéns pela análise completa!",
    });
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

  const startIntroduction = () => {
    setShowHero(false);
    setShowIntroduction(true);
  };

  const startGame = () => {
    setShowHero(false);
    setShowIntroduction(false);
    setGameStarted(true);
  };

  const resetAnalysis = () => {
    handleClearImage();
    
    toast({
      title: "🔄 Nova Análise",
      description: "Sistema resetado. Você pode começar uma nova análise.",
    });
  };

  if (showHero) {
    return <InteractiveHero onStartIntroduction={startIntroduction} />;
  }

  if (showIntroduction) {
    return <ProjectIntroduction onStartGame={startGame} />;
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-black via-yellow-900 to-orange-900 font-neural animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <GameHeader />

        {/* Progresso da análise */}
        <div className="mb-8 animate-fade-in">
          <div className="bg-black/50 rounded-lg p-4 border border-orange-500 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-orange-300 font-medium flex items-center gap-2">
                📊 Progresso da Análise
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              </h3>
              <button
                onClick={resetAnalysis}
                className="text-orange-400 hover:text-orange-300 text-sm underline transition-all duration-300 hover:scale-110"
              >
                🔄 Nova Análise
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className={`p-3 rounded-lg border text-center transition-all duration-500 transform hover:scale-110 ${
                uploadedImage 
                  ? 'bg-green-900 border-green-600 text-green-200 animate-pulse' 
                  : 'bg-orange-800 border-orange-600 text-orange-300 animate-bounce'
              }`}>
                <div className="text-lg mb-1">
                  {uploadedImage ? '✅' : '1️⃣'}
                </div>
                <div className="text-sm font-medium">Upload</div>
              </div>
              
              <div className={`p-3 rounded-lg border text-center transition-all duration-500 transform hover:scale-110 ${
                selectedClassification 
                  ? 'bg-green-900 border-green-600 text-green-200 animate-pulse' 
                  : uploadedImage 
                    ? 'bg-orange-800 border-orange-600 text-orange-300 animate-bounce' 
                    : 'bg-yellow-800 border-yellow-600 text-yellow-400 opacity-50'
              }`}>
                <div className="text-lg mb-1">
                  {selectedClassification ? '✅' : uploadedImage ? '2️⃣' : '⏳'}
                </div>
                <div className="text-sm font-medium">Classificação</div>
              </div>
              
              <div className={`p-3 rounded-lg border text-center transition-all duration-500 transform hover:scale-110 ${
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
          </div>
        </div>

        {/* Interface principal */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <ImageUploadZone 
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
              onClearImage={handleClearImage}
              isDarkTheme={true}
            />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <UserClassification 
              onClassification={handleClassification}
              selectedClassification={selectedClassification}
              isDarkTheme={true}
              uploadedImage={uploadedImage}
            />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <UserVerdict 
              uploadedImage={uploadedImage}
              selectedClassification={selectedClassification}
              onVerdictSubmit={handleVerdictSubmit}
              onDownloadImage={handleDownloadImage}
              isDarkTheme={true}
            />
          </div>
        </div>

        {/* Resumo final */}
        {userVerdict && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-900 via-emerald-900 to-green-900 rounded-xl border-2 border-green-600 animate-fade-in transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-500/30">
            <h3 className="text-xl font-bold text-green-200 mb-4 flex items-center gap-2 animate-bounce">
              🎉 Análise Completa Realizada!
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-green-800 p-4 rounded-lg transition-all duration-300 hover:scale-105 animate-fade-in">
                <h4 className="font-medium text-green-200 mb-2 flex items-center gap-2">
                  📤 Imagem
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </h4>
                <p className="text-sm text-green-300">
                  {uploadedFile?.name || 'Imagem carregada'}
                </p>
              </div>
              
              <div className="bg-green-800 p-4 rounded-lg transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h4 className="font-medium text-green-200 mb-2 flex items-center gap-2">
                  🎯 Classificação
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                </h4>
                <p className="text-sm text-green-300 animate-pulse">
                  {selectedClassification === 'living' && 'Ser Vivo'}
                  {selectedClassification === 'manufactured' && 'Objeto Manufaturado'}
                  {selectedClassification === 'natural' && 'Elemento Natural'}
                </p>
              </div>
              
              <div className="bg-green-800 p-4 rounded-lg transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h4 className="font-medium text-green-200 mb-2 flex items-center gap-2">
                  📝 Análise
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-spin"></div>
                </h4>
                <p className="text-sm text-green-300">
                  {userVerdict.substring(0, 50)}...
                </p>
              </div>
            </div>
            
            <p className="text-green-300 text-sm animate-pulse">
              💡 <strong>Parabéns!</strong> Você demonstrou como a inteligência humana processa e analisa informações visuais de forma consciente e detalhada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageRecognitionGame;
