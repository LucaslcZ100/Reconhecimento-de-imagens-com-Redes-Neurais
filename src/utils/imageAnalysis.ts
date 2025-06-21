
export interface AnalysisHistory {
  id: string;
  timestamp: Date;
  imageName: string;
  imageUrl: string;
  userClassification: string;
  userVerdict: string;
}

export const saveAnalysisToHistory = (analysis: Omit<AnalysisHistory, 'id' | 'timestamp'>): AnalysisHistory => {
  const newAnalysis: AnalysisHistory = {
    ...analysis,
    id: Date.now().toString(),
    timestamp: new Date()
  };
  
  const existingHistory = getAnalysisHistory();
  const updatedHistory = [newAnalysis, ...existingHistory].slice(0, 15);
  
  localStorage.setItem('analysisHistory', JSON.stringify(updatedHistory));
  return newAnalysis;
};

export const getAnalysisHistory = (): AnalysisHistory[] => {
  try {
    const history = localStorage.getItem('analysisHistory');
    if (!history) return [];
    
    const parsedHistory = JSON.parse(history);
    
    // Convert timestamp strings back to Date objects
    return parsedHistory.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }));
  } catch {
    return [];
  }
};

export const clearAnalysisHistory = (): void => {
  localStorage.removeItem('analysisHistory');
};
