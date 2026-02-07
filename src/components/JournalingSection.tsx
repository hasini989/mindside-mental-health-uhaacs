import { useState } from 'react';
import Button from './Button';
import EmotionalMonitor from './EmotionalMonitor';
import PanicInterventionModal from './PanicInterventionModal';
import { Reality } from '../App';

type JournalingSectionProps = {
  prompt: string;
  onStartOver: () => void;
  reality: Reality;
  onPanicMode: () => void;
  onExitPanicMode: () => void;
};

export default function JournalingSection({ prompt, onStartOver, reality, onPanicMode, onExitPanicMode }: JournalingSectionProps) {
  const [journalText, setJournalText] = useState('');
  const [showPanicModal, setShowPanicModal] = useState(false);
  
  const isRift = reality === 'rift';
  const isHorizon = reality === 'horizon';

  // For demo purposes - in real app this would be triggered by emotion detection
  const handleDistressDetected = () => {
    setShowPanicModal(true);
    onPanicMode();
  };

  return (
    <div className="min-h-screen px-6 py-12 pt-24">
      {/* Emotional Monitor - Top Right */}
      <EmotionalMonitor onDistressDetected={handleDistressDetected} reality={reality} />

      {/* Panic Intervention Modal */}
      <PanicInterventionModal 
        isOpen={showPanicModal} 
        onClose={() => {
          setShowPanicModal(false);
          onExitPanicMode();
        }} 
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className={`text-4xl mb-6 tracking-wider transition-all duration-500 ${
            isRift ? 'text-[#ff0000] font-benguiat' : 'text-[#FFD700] font-celestial'
          }`}>
            {isRift ? 'JOURNAL ENTRY' : 'REFLECTION JOURNAL'}
          </h2>
          <div className={`h-0.5 w-24 mx-auto mb-6 transition-all duration-500 ${
            isRift ? 'bg-[#ff0000] opacity-60' : 'bg-[#FFD700] opacity-80'
          }`} />
          <p className={`text-sm mb-2 font-mono uppercase tracking-wide transition-all duration-500 ${
            isRift ? 'text-[#999999]' : 'text-[#94a3b8]'
          }`}>
            Let your thoughts flow without judgment.
          </p>
          <p className={`text-xs font-mono uppercase tracking-wider transition-all duration-500 ${
            isRift ? 'text-[#666666]' : 'text-[#64748b]'
          }`}>
            {isRift ? '⚠ CLASSIFIED: NOT SAVED OR SHARED' : '✦ PRIVATE: NOT SAVED OR SHARED'}
          </p>
        </div>

        <div className={`backdrop-blur-sm rounded-sm p-8 mb-6 border transition-all duration-500 ${
          isRift 
            ? 'bg-[#0f0f0f]/60 border-[#333333]' 
            : 'bg-[#0a1929]/60 border-[#1e3a5f]'
        }`}>
          <p className={`text-base italic leading-relaxed font-mono transition-all duration-500 ${
            isRift ? 'text-[#e0e0e0]' : 'text-[#e0f2fe]'
          }`}>
            {prompt}
          </p>
        </div>

        <textarea
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="Begin writing here..."
          className={`w-full h-96 px-8 py-6 backdrop-blur-sm rounded-sm border focus:outline-none text-base resize-none transition-all duration-500 leading-relaxed font-mono ${
            isRift 
              ? 'bg-[#0f0f0f]/60 border-[#333333] focus:border-[#ff0000] text-[#e0e0e0] placeholder-[#666666]'
              : 'bg-[#0a1929]/60 border-[#1e3a5f] focus:border-[#FFD700] text-[#e0f2fe] placeholder-[#64748b]'
          }`}
        />

        <div className="flex justify-center mt-8 gap-4">
          <Button onClick={onStartOver} variant="secondary" reality={reality} text="START OVER" />
        </div>

        {/* Demo button for panic intervention - can be removed or hidden */}
        <div className="text-center mt-6">
          <button
            onClick={() => setShowPanicModal(true)}
            className={`text-xs transition-colors underline font-mono uppercase tracking-wider ${
              isRift 
                ? 'text-[#666666] hover:text-[#ff0000]' 
                : 'text-[#64748b] hover:text-[#FFD700]'
            }`}
          >
            [ Access Grounding Exercise ]
          </button>
        </div>
      </div>
    </div>
  );
}