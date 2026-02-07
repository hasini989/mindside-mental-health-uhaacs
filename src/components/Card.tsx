import { ReactNode } from 'react';
import { Reality } from '../App';

type CardProps = {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  interactive?: boolean;
  highlight?: boolean;
  reality?: Reality;
};

export default function Card({ children, onClick, selected = false, interactive = false, highlight = false, reality = 'rift' }: CardProps) {
  const isRift = reality === 'rift';
  const baseStyles = 'rounded-sm p-6 transition-all duration-500 relative overflow-hidden';
  
  // Dark glassmorphism with semi-transparent blur
  const backgroundStyles = isRift
    ? (highlight ? 'bg-[#1a1a1a]/70 backdrop-blur-sm' : 'bg-[#0f0f0f]/60 backdrop-blur-sm')
    : (highlight ? 'bg-[#1e3a5f]/50 backdrop-blur-sm' : 'bg-[#0a1929]/60 backdrop-blur-sm');
  
  const interactiveStyles = interactive
    ? 'cursor-pointer hover:scale-[1.01]'
    : '';
  
  // Flickering neon glow when selected
  const selectedStyles = isRift
    ? (selected ? 'neon-flicker border border-[#ff0000]' : 'border border-[#333333] hover:border-[#ff0000]/50')
    : (selected ? 'golden-halo border-2 border-[#FFD700]' : 'border border-[#1e3a5f] hover:border-[#FFD700]/50');

  const borderStyles = interactive ? selectedStyles : (isRift ? 'border border-[#333333]' : 'border border-[#1e3a5f]');

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${backgroundStyles} ${interactiveStyles} ${borderStyles}`}
    >
      {/* Inner shadow for depth */}
      <div className="absolute inset-0 pointer-events-none" 
        style={{
          boxShadow: selected 
            ? (isRift 
                ? 'inset 0 0 20px rgba(255, 0, 0, 0.2)' 
                : 'inset 0 0 20px rgba(20, 184, 166, 0.2)')
            : 'inset 0 0 10px rgba(0, 0, 0, 0.3)'
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}