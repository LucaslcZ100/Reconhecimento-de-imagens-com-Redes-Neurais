
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Lightbulb, BookOpen, ArrowLeft } from 'lucide-react';
import { useMouseActivity } from '@/hooks/useMouseActivity';

interface AIUnpluggedInfoProps {
  onBack: () => void;
  isDarkTheme?: boolean;
}

const AIUnpluggedInfo = ({ onBack, isDarkTheme = true }: AIUnpluggedInfoProps) => {
  const isMouseActive = useMouseActivity();

  const curiosities = [
    {
      title: "🧠 O que é IA Desplugada?",
      description: "Computer Science Unplugged é uma metodologia que ensina conceitos de ciência da computação sem usar computadores, através de atividades práticas e jogos.",
      icon: <Brain className="h-6 w-6" />
    },
    {
      title: "🎯 Reconhecimento de Padrões",
      description: "Assim como você classificou imagens, as redes neurais aprendem a reconhecer padrões através de milhares de exemplos de treinamento.",
      icon: <Lightbulb className="h-6 w-6" />
    },
    {
      title: "🤖 Inteligência Humana vs IA",
      description: "Enquanto a IA processa dados rapidamente, a inteligência humana traz contexto, criatividade e raciocínio crítico único.",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      title: "📊 Aprendizado de Máquina",
      description: "Este jogo simula como algoritmos de ML fazem classificações - comparando sua decisão com padrões aprendidos.",
      icon: <Brain className="h-6 w-6" />
    },
    {
      title: "🎮 Gamificação do Aprendizado",
      description: "Jogos educativos como este tornam conceitos complexos de IA mais acessíveis e divertidos de aprender.",
      icon: <Lightbulb className="h-6 w-6" />
    },
    {
      title: "🔍 Análise Crítica",
      description: "O processo de analisar e questionar resultados da IA desenvolve pensamento crítico essencial na era digital.",
      icon: <BookOpen className="h-6 w-6" />
    }
  ];

  return (
    <div className={`min-h-screen p-4 bg-gradient-to-br from-black via-purple-900 to-indigo-900 font-neural transition-all duration-500 ${
      isMouseActive ? 'animate-fade-in' : ''
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={onBack}
            className={`mb-6 transition-all duration-300 ${
              isMouseActive ? 'transform hover:scale-110' : ''
            } ${
              isDarkTheme 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            🏠 Voltar ao Menu
          </Button>

          <Card className={`shadow-xl border-3 transition-all duration-500 ${
            isMouseActive ? 'transform hover:scale-105' : ''
          } ${
            isDarkTheme 
              ? 'bg-black border-purple-500 text-orange-100' 
              : 'bg-white border-purple-200'
          }`}>
            <CardHeader className={`${
              isDarkTheme 
                ? 'bg-gradient-to-r from-purple-900 to-indigo-900' 
                : 'bg-gradient-to-r from-purple-50 to-indigo-50'
            }`}>
              <CardTitle className={`text-2xl flex items-center gap-3 ${
                isDarkTheme ? 'text-purple-300' : 'text-purple-600'
              }`}>
                <Brain className={`h-8 w-8 ${isMouseActive ? 'animate-pulse' : ''}`} />
                🎓 Curiosidades sobre IA Desplugada
                <div className={`w-3 h-3 bg-purple-400 rounded-full ${isMouseActive ? 'animate-bounce' : ''}`}></div>
              </CardTitle>
              <p className={`text-lg ${
                isDarkTheme ? 'text-purple-200' : 'text-purple-700'
              }`}>
                Descubra como conceitos de Inteligência Artificial podem ser ensinados sem computadores!
              </p>
            </CardHeader>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curiosities.map((curiosity, index) => (
            <Card
              key={index}
              className={`shadow-xl border-2 transition-all duration-500 ${
                isMouseActive ? 'transform hover:scale-105 hover:rotate-1' : ''
              } ${
                isDarkTheme 
                  ? 'bg-gradient-to-br from-black to-purple-900 border-purple-600 hover:border-purple-400 text-purple-100 hover:shadow-purple-500/30' 
                  : 'bg-gradient-to-br from-white to-purple-50 border-purple-200 hover:border-purple-400 hover:shadow-purple-500/20'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className={`${
                isDarkTheme 
                  ? 'bg-gradient-to-r from-purple-800 to-indigo-800' 
                  : 'bg-gradient-to-r from-purple-100 to-indigo-100'
              }`}>
                <CardTitle className={`text-lg flex items-center gap-2 ${
                  isDarkTheme ? 'text-purple-200' : 'text-purple-700'
                }`}>
                  <div className={`p-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white transition-all duration-300 ${
                    isMouseActive ? 'animate-spin' : ''
                  }`}>
                    {curiosity.icon}
                  </div>
                  {curiosity.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className={`${
                  isDarkTheme ? 'text-purple-300' : 'text-purple-600'
                } leading-relaxed`}>
                  {curiosity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className={`mt-8 shadow-xl border-3 transition-all duration-500 ${
          isMouseActive ? 'transform hover:scale-105' : ''
        } ${
          isDarkTheme 
            ? 'bg-black border-purple-500 text-orange-100' 
            : 'bg-white border-purple-200'
        }`}>
          <CardHeader className={`${
            isDarkTheme 
              ? 'bg-gradient-to-r from-purple-900 to-indigo-900' 
              : 'bg-gradient-to-r from-purple-50 to-indigo-50'
          }`}>
            <CardTitle className={`text-xl flex items-center gap-2 ${
              isDarkTheme ? 'text-purple-300' : 'text-purple-600'
            }`}>
              <BookOpen className={`h-6 w-6 ${isMouseActive ? 'animate-bounce' : ''}`} />
              📚 Sobre Este Projeto
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className={`space-y-4 ${isDarkTheme ? 'text-purple-300' : 'text-purple-700'}`}>
              <p className="text-lg leading-relaxed">
                🎯 <strong>Objetivo:</strong> Demonstrar como a inteligência humana e artificial podem trabalhar juntas no reconhecimento de padrões visuais.
              </p>
              <p className="leading-relaxed">
                🧠 <strong>Metodologia:</strong> Baseado nos princípios de "Computer Science Unplugged", este jogo ensina conceitos de IA através da prática direta.
              </p>
              <p className="leading-relaxed">
                💡 <strong>Aprendizado:</strong> Você experimenta o processo de classificação que as redes neurais fazem milhões de vezes durante o treinamento.
              </p>
              <p className="leading-relaxed">
                🤖 <strong>Reflexão:</strong> Compare sua intuição humana com as sugestões da IA para entender como diferentes tipos de inteligência processam informações.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIUnpluggedInfo;
