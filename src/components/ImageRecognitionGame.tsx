
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
        description: "A imagem analisada está sen do baixada.",
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
    <div className="min-h-screen p-4 bg-gradient-to-br from-black via-yellow-900 to-orange-900 font-neural">
      <div className="max-w-7xl mx-auto">
        <GameHeader />

        {/* Progresso da análise */}
        <div className="mb-8">
          <div className="bg-black/50 rounded-lg p-4 border border-orange-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-orange-300 font-medium">📊 Progresso da Análise</h3>
              <button
                onClick={resetAnalysis}
                className="text-orange-400 hover:text-orange-300 text-sm underline"
              >
                🔄 Nova Análise
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                uploadedImage 
                  ? 'bg-green-900 border-green-600 text-green-200' 
                  : 'bg-orange-800 border-orange-600 text-orange-300'
              }`}>
                <div className="text-lg mb-1">
                  {uploadedImage ? '✅' : '1️⃣'}
                </div>
                <div className="text-sm font-medium">Upload</div>
              </div>
              
              <div className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                selectedClassification 
                  ? 'bg-green-900 border-green-600 text-green-200' 
                  : uploadedImage 
                    ? 'bg-orange-800 border-orange-600 text-orange-300' 
                    : 'bg-yellow-800 border-yellow-600 text-yellow-400 opacity-50'
              }`}>
                <div className="text-lg mb-1">
                  {selectedClassification ? '✅' : uploadedImage ? '2️⃣' : '⏳'}
                </div>
                <div className="text-sm font-medium">Classificação</div>
              </div>
              
              <div className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                userVerdict 
                  ? 'bg-green-900 border-green-600 text-green-200' 
                  : selectedClassification 
                    ? 'bg-orange-800 border-orange-600 text-orange-300' 
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
          <ImageUploadZone 
            onImageUpload={handleImageUpload}
            uploadedImage={uploadedImage}
            onClearImage={handleClearImage}
            isDarkTheme={true}
          />
          
          <UserClassification 
            onClassification={handleClassification}
            selectedClassification={selectedClassification}
            isDarkTheme={true}
            uploadedImage={uploadedImage}
          />
          
          <UserVerdict 
            uploadedImage={uploadedImage}
            selectedClassification={selectedClassification}
            onVerdictSubmit={handleVerdictSubmit}
            onDownloadImage={handleDownloadImage}
            isDarkTheme={true}
          />
        </div>

        {/* Resumo final */}
        {userVerdict && (
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
                  {selectedClassification === 'living' && 'Ser Vivo'}
                  {selectedClassification === 'manufactured' && 'Objeto Manufaturado'}
                  {selectedClassification === 'natural' && 'Elemento Natural'}
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
