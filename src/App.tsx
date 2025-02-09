import React, { useState, useCallback } from 'react';
import { Equal, Plus, Minus, X, Divide, RotateCcw, Calculator, Hash, Percent } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Create Audio instances for different sounds
  const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
  const operationSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
  const equalSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3');
  const clearSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3');

  const playSound = useCallback((sound: HTMLAudioElement) => {
    sound.currentTime = 0;
    sound.volume = 0.3;
    sound.play().catch(() => {}); // Ignore autoplay restrictions
  }, []);

  const handleNumber = (num: string) => {
    playSound(clickSound);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    if (display === '0' || resetDisplay) {
      setDisplay(num);
      setResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperation = (op: string) => {
    playSound(operationSound);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    setPreviousValue(parseFloat(display));
    setOperation(op);
    setResetDisplay(true);
  };

  const calculate = () => {
    if (previousValue === null || operation === null) return;
    
    playSound(equalSound);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    const current = parseFloat(display);
    let result = 0;
    
    switch (operation) {
      case '+':
        result = previousValue + current;
        break;
      case '-':
        result = previousValue - current;
        break;
      case '*':
        result = previousValue * current;
        break;
      case '/':
        result = previousValue / current;
        break;
    }
    
    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
  };

  const clear = () => {
    playSound(clearSound);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const Button = ({ children, onClick, className = '' }: { 
    children: React.ReactNode; 
    onClick: () => void; 
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`p-4 text-xl rounded-xl transition-all duration-200 
        hover:bg-opacity-80 active:scale-95 ${className}
        transform hover:-translate-y-0.5 hover:shadow-lg
        ${isAnimating ? 'animate-pulse' : ''}`}
    >
      {children}
    </button>
  );

  const FloatingIcon = ({ icon: Icon, className }: { icon: any, className: string }) => (
    <div className={`absolute text-indigo-300/20 ${className}`}>
      <Icon size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Characters */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingIcon icon={Calculator} className="animate-float-1 top-1/4 left-1/4" />
        <FloatingIcon icon={Hash} className="animate-float-2 top-1/3 right-1/4" />
        <FloatingIcon icon={Plus} className="animate-float-3 bottom-1/4 left-1/3" />
        <FloatingIcon icon={Percent} className="animate-float-4 top-1/2 right-1/3" />
        <FloatingIcon icon={X} className="animate-float-5 bottom-1/3 left-1/2" />
      </div>

      {/* Calculator */}
      <div className={`bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-xs relative z-10
        backdrop-blur-lg bg-opacity-90
        transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]
        ${isAnimating ? 'scale-[1.02]' : 'scale-100'}`}>
        <div className={`bg-gray-900 p-4 rounded-xl mb-4 transition-all duration-300
          ${isAnimating ? 'shadow-[0_0_20px_rgba(99,102,241,0.3)]' : ''}`}>
          <div className="text-right">
            {previousValue !== null && (
              <div className="text-gray-500 text-sm h-6 transition-opacity duration-200">
                {previousValue} {operation}
              </div>
            )}
            <div className={`text-white text-4xl font-light tracking-wider overflow-hidden
              transition-all duration-300 ${isAnimating ? 'text-indigo-400' : ''}`}>
              {display}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <Button onClick={clear} className="bg-red-500 text-white col-span-3
            hover:bg-red-600 transition-colors duration-200">
            <div className="flex items-center justify-center gap-2">
              <RotateCcw size={20} className="animate-spin-slow" /> Clear
            </div>
          </Button>
          <Button onClick={() => handleOperation('/')} className="bg-indigo-600 text-white
            hover:bg-indigo-700 transition-colors duration-200">
            <Divide size={24} />
          </Button>
          
          {['7', '8', '9'].map((num) => (
            <Button key={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white
              hover:bg-gray-600 transition-colors duration-200">
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperation('*')} className="bg-indigo-600 text-white
            hover:bg-indigo-700 transition-colors duration-200">
            <X size={24} />
          </Button>
          
          {['4', '5', '6'].map((num) => (
            <Button key={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white
              hover:bg-gray-600 transition-colors duration-200">
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperation('-')} className="bg-indigo-600 text-white
            hover:bg-indigo-700 transition-colors duration-200">
            <Minus size={24} />
          </Button>
          
          {['1', '2', '3'].map((num) => (
            <Button key={num} onClick={() => handleNumber(num)} className="bg-gray-700 text-white
              hover:bg-gray-600 transition-colors duration-200">
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperation('+')} className="bg-indigo-600 text-white
            hover:bg-indigo-700 transition-colors duration-200">
            <Plus size={24} />
          </Button>
          
          <Button onClick={() => handleNumber('0')} className="bg-gray-700 text-white col-span-2
            hover:bg-gray-600 transition-colors duration-200">
            0
          </Button>
          <Button onClick={() => handleNumber('.')} className="bg-gray-700 text-white
            hover:bg-gray-600 transition-colors duration-200">
            .
          </Button>
          <Button onClick={calculate} className="bg-green-500 text-white
            hover:bg-green-600 transition-colors duration-200">
            <Equal size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;