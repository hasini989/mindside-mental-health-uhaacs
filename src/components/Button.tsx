import { ReactNode } from 'react';
import { Reality } from '../App';

type ButtonProps = {
  children?: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  text?: string;
  reality?: Reality;
};

export default function Button({ children, onClick, variant = 'primary', disabled = false, text, reality = 'rift' }: ButtonProps) {
  const displayText = text || children || 'Start Reflection';
  const isRift = reality === 'rift';
  const baseStyles = 'px-10 py-4 rounded-sm transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed font-mono uppercase tracking-wider text-sm relative overflow-hidden';
  
  const variantStyles = {
    primary: isRift
      ? 'bg-[#ff0000] text-white hover:bg-[#cc0000] disabled:hover:bg-[#ff0000] shadow-[0_0_15px_rgba(255,0,0,0.4)] hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]'
      : 'bg-gradient-to-r from-[#F59E0B] to-[#FFD700] text-[#0a1929] hover:from-[#D97706] hover:to-[#F59E0B] disabled:hover:from-[#F59E0B] disabled:hover:to-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_25px_rgba(255,215,0,0.7)]',
    secondary: isRift
      ? 'bg-transparent text-[#999999] border border-[#444444] hover:border-[#ff0000] hover:text-[#ff0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.3)]'
      : 'bg-transparent text-[#94a3b8] border border-[#1e3a5f] hover:border-[#FFD700] hover:text-[#FFD700] hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] flicker-gold',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} chromatic-aberration-button`}
      data-text={displayText}
    >
      <span className="relative z-10">{displayText}</span>
      {variant === 'primary' && isRift && (
        <>
          <span 
            className="absolute inset-0 opacity-50 mix-blend-screen text-[#ff0000] flex items-center justify-center pointer-events-none"
            style={{ transform: 'translate(-1px, 0)' }}
          >
            {displayText}
          </span>
          <span 
            className="absolute inset-0 opacity-50 mix-blend-screen text-[#00ffff] flex items-center justify-center pointer-events-none"
            style={{ transform: 'translate(1px, 0)' }}
          >
            {displayText}
          </span>
        </>
      )}
    </button>
  );
}