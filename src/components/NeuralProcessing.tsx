
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Loader2 } from 'lucide-react';

interface NetworkLayer {
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

interface GameResult {
  label: string;
  score: number;
}

interface NeuralProcessingProps {
  currentStep: 'input' | 'analysis' | 'classification';
  networkLayers: NetworkLayer[];
  predictions: GameResult[];
}

const NeuralProcessing = ({ currentStep, networkLayers, predictions }: NeuralProcessingProps) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">🔬 Processamento Neural</CardTitle>
      </CardHeader>
      <CardContent>
        {currentStep === 'input' && (
          <div className="text-center py-8">
            <Eye className="h-12 w-12 animate-pulse mx-auto mb-4 text-blue-500" />
            <p className="text-lg">Recebendo entrada...</p>
          </div>
        )}
        
        {currentStep === 'analysis' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-purple-500" />
              <p className="font-medium">Processando camadas neurais...</p>
            </div>
            {networkLayers.map((layer, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {layer.icon}
                <div className="flex-1">
                  <p className="font-medium text-sm">{layer.name}</p>
                  <p className="text-xs text-gray-600 mb-2">{layer.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {layer.features.map((feature, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {currentStep === 'classification' && predictions.length > 0 && (
          <div className="space-y-3">
            <p className="text-center font-medium text-green-700 mb-4">
              ✅ Análise Completa!
            </p>
            {predictions.map((prediction, index) => (
              <div key={index} className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                <span className="font-medium capitalize">{prediction.label}</span>
                <Badge variant={index === 0 ? "default" : "secondary"} className="bg-green-100 text-green-800">
                  {(prediction.score * 100).toFixed(1)}%
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralProcessing;
