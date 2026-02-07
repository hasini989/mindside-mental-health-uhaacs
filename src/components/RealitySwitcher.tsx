import { Zap, Star } from 'lucide-react';

type RealitySwitcherProps = {
  currentReality: 'rift' | 'horizon';
  onToggle: (reality: 'rift' | 'horizon') => void;
  disabled?: boolean;
};

export default function RealitySwitcher({ currentReality, onToggle, disabled = false }: RealitySwitcherProps) {
  const isRift = currentReality === 'rift';

  const handleToggle = () => {
    if (!disabled) {
      onToggle(isRift ? 'horizon' : 'rift');
    }
  };

  return (
    <div className="fixed top-20 left-6 z-50">
      <div className={`flex flex-col items-start gap-3 transition-all duration-500 ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}>
        {/* Toggle Label - Changed to Upside Down / Rightside Up */}
        <div className={`px-4 py-2 rounded-sm border backdrop-blur-md transition-all duration-500 ${
          isRift 
            ? 'bg-[#0f0f0f]/90 border-[#333333]' 
            : 'bg-[#0a1929]/90 border-[#1e3a5f]'
        }`}>
          <p className={`text-[10px] uppercase tracking-widest font-mono transition-colors duration-500 ${
            isRift ? 'text-[#999999]' : 'text-[#7dd3fc]'
          }`}>
            {isRift ? 'Upside Down' : 'Rightside Up'}
          </p>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={handleToggle}
          disabled={disabled}
          className={`relative w-24 h-12 rounded-sm transition-all duration-500 border-2 ${
            isRift
              ? 'bg-gradient-to-r from-[#1a0000] to-[#0a0a0a] border-[#ff0000]'
              : 'bg-gradient-to-r from-[#0a1929] to-[#164e63] border-[#fbbf24]'
          }`}
        >
          {/* Slider */}
          <div
            className={`absolute top-1 w-10 h-8 rounded-sm transition-all duration-500 flex items-center justify-center ${
              isRift
                ? 'translate-x-1 bg-[#ff0000] shadow-[0_0_15px_rgba(255,0,0,0.6)]'
                : 'translate-x-12 bg-[#fbbf24] shadow-[0_0_15px_rgba(251,191,36,0.6)]'
            }`}
          >
            {isRift ? (
              <Zap className="w-5 h-5 text-white" />
            ) : (
              <Star className="w-5 h-5 text-[#0a1929]" />
            )}
          </div>

          {/* Background Icons */}
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <Zap className={`w-4 h-4 transition-opacity duration-500 ${
              isRift ? 'opacity-0' : 'opacity-50 text-[#ff0000]'
            }`} />
            <Star className={`w-4 h-4 transition-opacity duration-500 ${
              isRift ? 'opacity-50 text-[#fbbf24]' : 'opacity-0'
            }`} />
          </div>
        </button>

        {/* Reality Label */}
        <div className={`px-4 py-2 rounded-sm border backdrop-blur-md transition-all duration-500 ${
          isRift 
            ? 'bg-[#0f0f0f]/90 border-[#333333]' 
            : 'bg-[#0a1929]/90 border-[#1e3a5f]'
        }`}>
          <p className={`text-xs uppercase tracking-wider font-mono font-bold transition-colors duration-500 ${
            isRift ? 'text-[#ff0000]' : 'text-[#fbbf24]'
          }`}>
            {isRift ? '[ THE RIFT ]' : '[ THE HORIZON ]'}
          </p>
        </div>
      </div>
    </div>
  );
}