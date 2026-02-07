import Button from './Button';
import { Reality } from '../App';

type WelcomeProps = {
  onStart: () => void;
  reality: Reality;
};

export default function Welcome({ onStart, reality }: WelcomeProps) {
  const isRift = reality === 'rift';
  const isHorizon = reality === 'horizon';

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full text-center">
        <h1 className={`text-6xl md:text-7xl mb-8 tracking-wider leading-tight transition-all duration-500 ${
          isRift 
            ? 'text-[#ff0000] font-benguiat' 
            : 'text-[#FFD700] font-celestial'
        }`}>
          {isRift ? 'THE UPSIDE DOWN' : 'THE CELESTIAL ARCHIVE'}
        </h1>
        <div className={`h-0.5 w-32 mx-auto mb-8 transition-all duration-500 ${
          isRift ? 'bg-[#ff0000] opacity-60' : 'bg-[#FFD700] opacity-80'
        }`} />
        <h2 className={`text-2xl md:text-3xl mb-6 font-mono tracking-wide transition-all duration-500 ${
          isRift ? 'text-[#e0e0e0]' : 'text-[#e0f2fe]'
        }`}>
          UNDERSTAND WHERE YOUR REACTIONS COME FROM
        </h2>
        <p className={`text-lg mb-12 leading-relaxed font-mono max-w-2xl mx-auto transition-all duration-500 ${
          isRift ? 'text-[#999999]' : 'text-[#94a3b8]'
        }`}>
          Explore how early environments shaped the patterns you carry today. 
          This reflective tool helps you map the connections between your past and present, 
          offering personalized prompts for deeper self-understanding.
        </p>
        <div className="mb-12">
          <Button onClick={onStart} variant="primary" reality={reality} />
        </div>
        <p className={`text-xs mt-8 font-mono uppercase tracking-widest transition-all duration-500 ${
          isRift ? 'text-[#666666]' : 'text-[#64748b]'
        }`}>
          {isRift ? '⚠ CLASSIFIED: FOR REFLECTION ONLY — NOT A DIAGNOSIS' : '✦ ARCHIVED: FOR REFLECTION ONLY — NOT A DIAGNOSIS'}
        </p>
      </div>
    </div>
  );
}