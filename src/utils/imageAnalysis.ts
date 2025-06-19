
export interface ImageAnalysisResult {
  suggestedClassification: 'living' | 'manufactured' | 'natural';
  confidence: number;
  features: string[];
}

export interface AnalysisHistory {
  id: string;
  timestamp: Date;
  imageName: string;
  imageUrl: string;
  userClassification: string;
  suggestedClassification: string;
  isCorrect: boolean;
  userVerdict: string;
  confidence: number;
}

// Simulação de análise de imagem baseada no nome do arquivo
export const analyzeImage = async (file: File): Promise<ImageAnalysisResult> => {
  // Simular delay de processamento
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const fileName = file.name.toLowerCase();
  
  // Análise simples baseada em palavras-chave no nome do arquivo
  if (fileName.includes('animal') || fileName.includes('cat') || fileName.includes('dog') || 
      fileName.includes('person') || fileName.includes('people') || fileName.includes('plant') ||
      fileName.includes('tree') || fileName.includes('flower') || fileName.includes('bird')) {
    return {
      suggestedClassification: 'living',
      confidence: 0.85,
      features: ['Características orgânicas detectadas', 'Padrões de vida identificados']
    };
  }
  
  if (fileName.includes('car') || fileName.includes('house') || fileName.includes('building') ||
      fileName.includes('phone') || fileName.includes('computer') || fileName.includes('tool') ||
      fileName.includes('machine') || fileName.includes('device')) {
    return {
      suggestedClassification: 'manufactured',
      confidence: 0.80,
      features: ['Estruturas artificiais detectadas', 'Padrões manufaturados identificados']
    };
  }
  
  if (fileName.includes('landscape') || fileName.includes('mountain') || fileName.includes('ocean') ||
      fileName.includes('sky') || fileName.includes('cloud') || fileName.includes('rock') ||
      fileName.includes('stone') || fileName.includes('water')) {
    return {
      suggestedClassification: 'natural',
      confidence: 0.75,
      features: ['Elementos naturais detectados', 'Padrões geológicos identificados']
    };
  }
  
  // Classificação padrão aleatória se não detectar palavras-chave
  const classifications: ('living' | 'manufactured' | 'natural')[] = ['living', 'manufactured', 'natural'];
  const randomIndex = Math.floor(Math.random() * 3);
  
  return {
    suggestedClassification: classifications[randomIndex],
    confidence: 0.60,
    features: ['Análise baseada em padrões visuais gerais', 'Classificação estimada']
  };
};

export const saveAnalysisToHistory = (analysis: Omit<AnalysisHistory, 'id' | 'timestamp'>): AnalysisHistory => {
  const newAnalysis: AnalysisHistory = {
    ...analysis,
    id: Date.now().toString(),
    timestamp: new Date()
  };
  
  const existingHistory = getAnalysisHistory();
  const updatedHistory = [newAnalysis, ...existingHistory].slice(0, 10); // Manter apenas os últimos 10
  
  localStorage.setItem('analysisHistory', JSON.stringify(updatedHistory));
  return newAnalysis;
};

export const getAnalysisHistory = (): AnalysisHistory[] => {
  try {
    const history = localStorage.getItem('analysisHistory');
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

export const clearAnalysisHistory = (): void => {
  localStorage.removeItem('analysisHistory');
};
