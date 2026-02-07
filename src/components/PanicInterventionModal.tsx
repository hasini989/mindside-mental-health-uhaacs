import { useState, useEffect } from 'react';

type PanicInterventionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PanicInterventionModal({ isOpen, onClose }: PanicInterventionModalProps) {
  const [showGrounding, setShowGrounding] = useState(false);
  const [vineReceding, setVineReceding] = useState(false);

  // Reset grounding exercise when modal opens
  useEffect(() => {
    if (isOpen) {
      setVineReceding(true);
      setShowGrounding(false);
      
      // Vines recede, then show safe room
      const timer = setTimeout(() => {
        setVineReceding(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const groundingExercises = [
    'Name 5 things you can see around you right now.',
    'Name 4 things you can physically feel (your feet on the floor, clothes on your skin).',
    'Name 3 things you can hear in this moment.',
    'Name 2 things you can smell, or 2 smells you enjoy.',
    'Name 1 thing you can taste, or 1 thing you\'re grateful for right now.',
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Vine overlay - recedes when opening */}
      {vineReceding && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <radialGradient id="vineRecede">
              <stop offset="0%" stopColor="#ff0000" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#330000" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[...Array(20)].map((_, i) => {
            const angle = (i * 18) * (Math.PI / 180);
            const x1 = 50;
            const y1 = 50;
            const x2 = 50 + 50 * Math.cos(angle);
            const y2 = 50 + 50 * Math.sin(angle);
            
            return (
              <line
                key={i}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#vineRecede)"
                strokeWidth="3"
                className="vine-recede"
                strokeDasharray="500"
                strokeDashoffset="0"
              />
            );
          })}
        </svg>
      )}

      {/* Safe Room Background */}
      <div className="absolute inset-0 safe-room" />
      
      <div className="relative z-20 max-w-2xl w-full mx-6">
        {!showGrounding ? (
          <div className="text-center">
            {/* Breathing Circle Animation */}
            <div className="flex justify-center mb-12">
              <div className="relative w-72 h-72">
                {/* Outer glow ring - blue tint for safe room */}
                <div className="absolute inset-0 rounded-full border-2 border-[#add8ff] opacity-40 animate-breathing-slow" />
                
                {/* Middle ring */}
                <div className="absolute inset-8 rounded-full border-2 border-[#add8ff] opacity-60 animate-breathing-medium" />
                
                {/* Inner circle */}
                <div className="absolute inset-16 rounded-full bg-[#add8ff] opacity-80 animate-breathing-fast flex items-center justify-center shadow-[0_0_40px_rgba(173,216,255,0.6)]">
                  <div className="text-[#1a2332] text-4xl font-mono font-bold uppercase tracking-widest">Breathe</div>
                </div>
              </div>
            </div>

            {/* Supportive Text */}
            <div className="space-y-6 mb-12">
              <h2 className="text-4xl text-[#add8ff] font-benguiat tracking-wider">
                SAFE ROOM ACTIVATED
              </h2>
              <div className="h-0.5 w-24 bg-[#add8ff] mx-auto opacity-60" />
              <p className="text-xl text-[#d0e8ff] leading-relaxed font-mono">
                Deep breath. You are safe here.
              </p>
              <p className="text-sm text-[#8bb4d9] font-mono uppercase tracking-wider">
                Follow the breathing circle
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={onClose}
                className="px-8 py-4 bg-[#add8ff] text-[#0a0a0a] rounded-sm hover:bg-[#d0e8ff] transition-all duration-200 font-mono uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(173,216,255,0.4)]"
              >
                I'm Okay Now
              </button>
              <button
                onClick={() => setShowGrounding(true)}
                className="px-8 py-4 bg-transparent text-[#add8ff] border border-[#add8ff] rounded-sm hover:bg-[#add8ff]/10 hover:shadow-[0_0_15px_rgba(173,216,255,0.3)] transition-all duration-200 font-mono uppercase tracking-wider text-sm"
              >
                5-4-3-2-1 Exercise
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl text-[#add8ff] mb-8 font-benguiat tracking-wider">
              5-4-3-2-1 GROUNDING
            </h2>
            <div className="h-0.5 w-24 bg-[#add8ff] mx-auto mb-8 opacity-60" />
            
            <p className="text-lg text-[#d0e8ff] mb-10 font-mono">
              Take your time with each step. There's no rush.
            </p>

            <div className="space-y-6 mb-12 text-left">
              {groundingExercises.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-[#0f1419]/60 rounded-sm p-6 border border-[#add8ff]/30 hover:border-[#add8ff] transition-colors backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-[#add8ff] flex items-center justify-center text-[#0a0a0a] font-mono font-bold text-lg shadow-[0_0_15px_rgba(173,216,255,0.4)]">
                      {5 - index}
                    </div>
                    <p className="text-base text-[#d0e8ff] pt-2 font-mono leading-relaxed">
                      {exercise}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => setShowGrounding(false)}
                className="px-8 py-4 bg-transparent text-[#add8ff] border border-[#add8ff] rounded-sm hover:bg-[#add8ff]/10 hover:shadow-[0_0_15px_rgba(173,216,255,0.3)] transition-all duration-200 font-mono uppercase tracking-wider text-sm"
              >
                Back to Breathing
              </button>
              <button
                onClick={onClose}
                className="px-8 py-4 bg-[#add8ff] text-[#0a0a0a] rounded-sm hover:bg-[#d0e8ff] transition-all duration-200 font-mono uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(173,216,255,0.4)]"
              >
                Back to Journal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}