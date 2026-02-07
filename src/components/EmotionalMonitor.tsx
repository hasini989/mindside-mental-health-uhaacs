import { useState, useEffect, useRef } from 'react';
import { Brain } from 'lucide-react';
import { Reality } from '../App';

type EmotionalMonitorProps = {
  onDistressDetected?: () => void;
  reality?: Reality;
};

export default function EmotionalMonitor({ onDistressDetected, reality = 'rift' }: EmotionalMonitorProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Reference for the video element
  const videoRef = useRef<HTMLVideoElement>(null);
  const isRift = reality === 'rift';

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  // Handle camera stream lifecycle
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 300 }, 
            height: { ideal: 300 },
            facingMode: "user" 
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setIsEnabled(false);
      }
    }

    function stopCamera() {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }

    if (isEnabled) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isEnabled]);

  return (
    <div 
      className="fixed top-20 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-end gap-3">
        {/* Brain Icon Trigger */}
        <div className={`cursor-pointer p-3 rounded-sm border backdrop-blur-md transition-all duration-300 ${
          isRift 
            ? 'bg-[#0f0f0f]/90 border-[#333333] hover:border-[#ff0000]' 
            : 'bg-[#0a1929]/90 border-[#1e3a5f] hover:border-[#FFD700]'
        }`}>
          <Brain className={`w-6 h-6 ${isRift ? 'text-[#ff0000]' : 'text-[#7dd3fc]'}`} />
        </div>

        {/* Expandable Menu */}
        {isHovered && (
          <div className="max-w-xs animate-in fade-in slide-in-from-right-5 duration-300">
            {/* Toggle UI */}
            <div className={`flex items-center gap-3 backdrop-blur-md px-4 py-2 rounded-sm border ${
              isRift ? 'bg-[#0f0f0f]/90 border-[#333333]' : 'bg-[#0a1929]/90 border-[#1e3a5f]'
            }`}>
              <span className="text-xs font-mono uppercase text-[#94a3b8]">Biometric Scan</span>
              <button
                onClick={handleToggle}
                className={`relative w-12 h-6 rounded-sm border transition-colors ${
                  isEnabled ? (isRift ? 'bg-[#ff0000]' : 'bg-[#FFD700]') : 'bg-gray-800'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white transition-transform duration-200 ${
                  isEnabled ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Webcam Viewport */}
            {isEnabled && (
              <div className="relative mt-3">
                <div className={`w-40 h-40 rounded-sm overflow-hidden relative border-2 bg-black ${
                  isRift ? 'border-[#ff0000]' : 'border-[#FFD700]'
                }`}>
                  
                  {/* The Actual Video Feed */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                  />
                  
                  {/* Cinematic Overlays */}
                  <div className={`absolute inset-0 pointer-events-none mix-blend-overlay opacity-40 ${
                    isRift ? 'bg-red-500/20' : 'bg-blue-400/20'
                  }`} />

                  {/* HUD Grids & Scanlines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-3 opacity-20">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className={`rounded-sm ${isRift ? 'bg-[#ff0000]' : 'bg-[#FFD700]'} animate-pulse`} />
                      ))}
                    </div>
                    {/* Scanline Animation */}
                    <div className={`w-full h-1 absolute top-0 shadow-[0_0_10px_rgba(255,255,255,0.5)] ${
                      isRift ? 'bg-[#ff0000]/40' : 'bg-[#FFD700]/40'
                    } animate-[scanline_2s_linear_infinite]`} />
                  </div>
                </div>
                
                <p className={`text-[10px] font-mono text-center mt-2 tracking-widest ${
                  isRift ? 'text-red-500' : 'text-[#FFD700]'
                }`}>
                  [ MONITORING ACTIVE ]
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Global CSS for the scanline if not in your tailwind config */}
      <style>{`
        @keyframes scanline {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}