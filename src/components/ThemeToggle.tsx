
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

interface ThemeToggleProps {
  isDarkTheme: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ isDarkTheme, onToggle }: ThemeToggleProps) => {
  return (
    <Button
      variant="outline"
      onClick={onToggle}
      className={`fixed top-4 right-4 z-50 ${
        isDarkTheme 
          ? 'bg-yellow-400 text-black border-yellow-500 hover:bg-yellow-300' 
          : 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200'
      }`}
    >
      <Palette className="h-4 w-4 mr-2" />
      {isDarkTheme ? '🌞 Claro' : '🌙 Escuro'}
    </Button>
  );
};

export default ThemeToggle;
