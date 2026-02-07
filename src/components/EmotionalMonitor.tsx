import { useState, useEffect, useRef } from 'react';
import { Brain } from 'lucide-react';
import { Reality } from '../App';
import { loadFaceApiModels, detectDistress } from '../services/faceDetection';
import React from 'react';

type EmotionalMonitorProps = {
  onDistressDetected?: () => void;
  reality?: Reality;
};

export default function EmotionalMonitor({ onDistressDetected, reality = 'rift' }: EmotionalMonitorProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const isRift = reality === 'rift';

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  useEffect(() => {
    let stream: MediaStream | null = null;
    let detectionInterval: NodeJS.Timeout | null = null;

    async function startCameraAndDetection() {
      try {
        await loadFaceApiModels();

        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 300, height: 300, facingMode: "user" } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          // Wait for the video to be ready (readyState 2 means data is available)
          const checkVideoStatus = setInterval(() => {
            if (videoRef.current && videoRef.current.readyState >= 2) {
              clearInterval(checkVideoStatus);
              console.log("Video active. Starting AI detection loop...");
              
              detectionInterval = setInterval(async () => {
                if (videoRef.current && isEnabled) {
                  const isDistressed = await detectDistress(videoRef.current);
                  if (isDistressed) {
                    onDistressDetected?.();
                  }
                }
              }, 1000); // Check every 1 second
            }
          }, 500);
        }

      } catch (err) {
        console.error("Monitor Error:", err);
        setIsEnabled(false);
      }
    }

    function stopEverything() {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    }

    if (isEnabled) {
      startCameraAndDetection();
    } else {
      stopEverything();
    }

    return () => stopEverything();
  }, [isEnabled, onDistressDetected]);

  return (
    <div 
      className="fixed top-20 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-end gap-3">
        <div className={`cursor-pointer p-3 rounded-sm border backdrop-blur-md transition-all duration-300 ${
          isRift 
            ? 'bg-[#0f0f0f]/90 border-[#333333] hover:border-[#ff0000]' 
            : 'bg-[#0a1929]/90 border-[#1e3a5f] hover:border-[#FFD700]'
        }`}>
          <Brain className={`w-6 h-6 ${isRift ? 'text-[#ff0000]' : 'text-[#7dd3fc]'}`} />
        </div>

        {isHovered && (
          <div className="max-w-xs animate-in fade-in slide-in-from-right-5 duration-300">
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

            {isEnabled && (
              <div className="relative mt-3">
                <div className={`w-40 h-40 rounded-sm overflow-hidden relative border-2 bg-black ${
                  isRift ? 'border-[#ff0000]' : 'border-[#FFD700]'
                }`}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                  />
                  <div className={`absolute inset-0 pointer-events-none mix-blend-overlay opacity-40 ${
                    isRift ? 'bg-red-500/20' : 'bg-blue-400/20'
                  }`} />
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-3 opacity-20">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className={`rounded-sm ${isRift ? 'bg-[#ff0000]' : 'bg-[#FFD700]'} animate-pulse`} />
                      ))}
                    </div>
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
      <style>{`
        @keyframes scanline {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}