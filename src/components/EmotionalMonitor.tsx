import { useState } from 'react';
import { Brain } from 'lucide-react';
import { Reality } from '../App';

type EmotionalMonitorProps = {
  onDistressDetected?: () => void;
  reality?: Reality;
};

export default function EmotionalMonitor({ onDistressDetected, reality = 'rift' }: EmotionalMonitorProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isRift = reality === 'rift';
  const isHorizon = reality === 'horizon';

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    setIsActive(newState);
  };

  return (
    <div 
      className="fixed top-20 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-end gap-3">
        {/* Icon - Always Visible */}
        <div className={`cursor-pointer p-3 rounded-sm border backdrop-blur-md transition-all duration-300 ${
          isRift 
            ? 'bg-[#0f0f0f]/90 border-[#333333] hover:border-[#ff0000]' 
            : 'bg-[#0a1929]/90 border-[#1e3a5f] hover:border-[#FFD700]'
        }`}>
          <Brain className={`w-6 h-6 transition-all duration-300 ${
            isRift 
              ? 'text-[#999999] hover:text-[#ff0000]' 
              : 'text-[#7dd3fc] hover:text-[#FFD700]'
          }`} />
        </div>

        {/* Expanded Panel - Shows on Hover */}
        {isHovered && (
          <div className="max-w-xs animate-in fade-in slide-in-from-right-5 duration-300">
            {/* Privacy Toggle */}
            <div className={`flex items-center gap-3 backdrop-blur-md px-4 py-2 rounded-sm border transition-all duration-500 ${
              isRift 
                ? 'bg-[#0f0f0f]/90 border-[#333333]' 
                : 'bg-[#0a1929]/90 border-[#1e3a5f]'
            }`}>
              <span className={`text-xs hidden sm:inline font-mono uppercase tracking-wider transition-all duration-500 ${
                isRift ? 'text-[#999999]' : 'text-[#94a3b8]'
              }`}>
                Emotional Support Scan
              </span>
              <span className={`text-xs sm:hidden font-mono uppercase transition-all duration-500 ${
                isRift ? 'text-[#999999]' : 'text-[#94a3b8]'
              }`}>
                Scan
              </span>
              <button
                onClick={handleToggle}
                className={`relative w-12 h-6 rounded-sm transition-all duration-300 border ${
                  isEnabled 
                    ? (isRift 
                        ? 'bg-[#ff0000] border-[#ff0000]' 
                        : 'bg-[#FFD700] border-[#FFD700]')
                    : (isRift 
                        ? 'bg-[#1a1a1a] border-[#333333]' 
                        : 'bg-[#0f1620] border-[#1e3a5f]')
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-sm transition-transform duration-300 ${
                    isEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Webcam Container */}
            {isEnabled && (
              <div className="relative mt-3">
                {/* Neural Scan Container */}
                <div
                  className={`w-36 h-36 rounded-sm overflow-hidden relative border-2 transition-all duration-500 ${
                    isActive 
                      ? (isRift 
                          ? 'bg-[#0a0a0a] border-[#ff0000] neon-flicker' 
                          : 'bg-[#050a10] border-[#FFD700] golden-halo')
                      : (isRift 
                          ? 'bg-[#0a0a0a] border-[#333333]' 
                          : 'bg-[#050a10] border-[#1e3a5f]')
                  }`}
                >
                  {/* Status Glow */}
                  {isActive && (
                    <>
                      <div className={`absolute inset-0 opacity-10 animate-pulse transition-all duration-500 ${
                        isRift ? 'bg-[#ff0000]' : 'bg-[#FFD700]'
                      }`} />
                      <div className={`absolute inset-0 rounded-sm border-2 animate-ping opacity-30 transition-all duration-500 ${
                        isRift ? 'border-[#ff0000]' : 'border-[#FFD700]'
                      }`} />
                    </>
                  )}

                  {/* Placeholder for webcam feed - shows geometric pattern */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Neural Scan Grid Pattern */}
                      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-3">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div
                            key={i}
                            className={`opacity-20 rounded-sm transition-all duration-500 ${
                              isRift ? 'bg-[#ff0000]' : 'bg-[#FFD700]'
                            }`}
                            style={{
                              animationDelay: `${i * 0.1}s`,
                              animation: 'pulse 2s ease-in-out infinite',
                            }}
                          />
                        ))}
                      </div>

                      {/* Center crosshair indicator */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-8 h-8">
                          <div className={`absolute top-1/2 left-0 w-full h-[1px] transition-all duration-500 ${
                            isRift ? 'bg-[#ff0000]' : 'bg-[#FFD700]'
                          }`} />
                          <div className={`absolute left-1/2 top-0 w-[1px] h-full transition-all duration-500 ${
                            isRift ? 'bg-[#ff0000]' : 'bg-[#FFD700]'
                          }`} />
                          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border rounded-sm animate-pulse transition-all duration-500 ${
                            isRift ? 'border-[#ff0000]' : 'border-[#FFD700]'
                          }`} />
                        </div>
                      </div>

                      {/* Scanline effect */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div 
                          className={`w-full h-1 bg-gradient-to-b from-transparent to-transparent transition-all duration-500 ${
                            isRift ? 'via-[#ff0000]/30' : 'via-[#FFD700]/30'
                          }`}
                          style={{ animation: 'scanline 2s linear infinite' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Text */}
                <div className="absolute -bottom-8 left-0 right-0 text-center">
                  <p className={`text-[10px] font-mono uppercase tracking-widest transition-all duration-500 ${
                    isRift ? 'text-[#666666]' : 'text-[#64748b]'
                  }`}>
                    {isActive ? '[ MONITORING ]' : '[ INACTIVE ]'}
                  </p>
                </div>
              </div>
            )}

            {/* Privacy Notice */}
            {isEnabled && (
              <div className={`mt-3 backdrop-blur-md px-4 py-2 rounded-sm border max-w-xs transition-all duration-500 ${
                isRift 
                  ? 'bg-[#0f0f0f]/90 border-[#333333]' 
                  : 'bg-[#0a1929]/90 border-[#1e3a5f]'
              }`}>
                <p className={`text-[10px] text-center font-mono uppercase tracking-wider transition-all duration-500 ${
                  isRift ? 'text-[#666666]' : 'text-[#64748b]'
                }`}>
                  🔒 LOCAL DEVICE ONLY
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}