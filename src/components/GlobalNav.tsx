import { Reality } from '../App';

type GlobalNavProps = {
  showBack?: boolean;
  onBack?: () => void;
  progress?: number; // 0-100
  showProgress?: boolean;
  reality?: Reality;
};

export default function GlobalNav({ showBack = false, onBack, progress = 0, showProgress = false, reality = 'rift' }: GlobalNavProps) {
  const isRift = reality === 'rift';

  return (
    <div className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-all duration-500 ${
      isRift 
        ? 'bg-[#0f0f0f]/90 border-[#ff0000]/20' 
        : 'bg-[#0a1929]/90 border-[#14b8a6]/20'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button - VCR/Reality Style */}
          <div className="w-32">
            {showBack && onBack && (
              <button
                onClick={onBack}
                className={`vcr-rewind flex items-center gap-2 transition-all duration-500 group text-xs ${
                  isRift 
                    ? 'text-[#999999] hover:text-[#ff0000]' 
                    : 'text-[#94a3b8] hover:text-[#FFD700] flicker-gold'
                }`}
              >
                <span className="group-hover:-translate-x-1 transition-transform inline-block">
                  {isRift ? 'REWIND' : 'RETURN'}
                </span>
              </button>
            )}
          </div>

          {/* Progress Bar - Center */}
          <div className="flex-1 max-w-md mx-auto">
            {showProgress && (
              <div className="space-y-2">
                <div className={`h-1 rounded-none overflow-hidden border transition-all duration-500 ${
                  isRift 
                    ? 'bg-[#1a1a1a] border-[#333333]' 
                    : 'bg-[#0a1929] border-[#1e3a5f]'
                }`}>
                  <div
                    className={`h-full transition-all duration-500 ease-out relative ${
                      isRift ? 'bg-[#ff0000]' : 'comet-trail'
                    }`}
                    style={{ width: `${progress}%` }}
                  >
                    {isRift ? (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                    ) : null}
                  </div>
                </div>
                <p className={`text-[10px] text-center font-mono uppercase tracking-widest transition-all duration-500 ${
                  isRift ? 'text-[#666666]' : 'text-[#64748b]'
                }`}>
                  PROGRESS: {Math.round(progress)}% COMPLETE
                </p>
              </div>
            )}
          </div>

          {/* Right spacer for balance */}
          <div className="w-32" />
        </div>
      </div>
    </div>
  );
}