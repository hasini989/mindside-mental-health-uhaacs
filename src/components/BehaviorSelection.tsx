import { useState } from 'react';
import { Behavior, Reality } from '../App';
import { getAIPrompts } from '../App'; // Import the service we merged into App.tsx
import Card from './Card';
import Button from './Button';
import React from 'react';

type BehaviorSelectionProps = {
  // Updated to allow the optional AI prompt string
  onSelect: (behavior: Behavior, aiPrompt?: string) => void;
  reality: Reality;
};

type BehaviorOption = {
  id: Behavior;
  label: string;
};

const behaviors: BehaviorOption[] = [
  { id: 'shutdown', label: 'I shut down emotionally' },
  { id: 'avoid-conflict', label: 'I avoid conflict' },
  { id: 'over-apologize', label: 'I over-apologize' },
  { id: 'responsible-for-others', label: "I feel responsible for others' emotions" },
  { id: 'struggle-to-ask', label: 'I struggle to ask for help' },
  { id: 'solid-foundation', label: 'I want to build a solid foundation' },
];

export default function BehaviorSelection({ onSelect, reality }: BehaviorSelectionProps) {
  const [selected, setSelected] = useState<Behavior | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Track AI generation
  const isRift = reality === 'rift';

  const handleContinue = async () => {
    if (selected) {
      setIsLoading(true);
      try {
        // 1. Call the AI service merged in App.tsx
        const aiGeneratedPrompt = await getAIPrompts(selected, reality);
        
        // 2. Pass both the behavior and the AI prompt back to the parent
        onSelect(selected, aiGeneratedPrompt); 
      } catch (error) {
        console.error("Failed to generate AI prompt:", error);
        // Fallback to just behavior if AI fails
        onSelect(selected);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 pt-24">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h2 className={`text-4xl mb-6 tracking-wider transition-all duration-500 ${
            isRift ? 'text-[#ff0000] font-benguiat' : 'text-[#FFD700] font-celestial'
          }`}>
            SELECT PATTERN
          </h2>
          <div className={`h-0.5 w-24 mx-auto mb-6 transition-all duration-500 ${
            isRift ? 'bg-[#ff0000] opacity-60' : 'bg-[#FFD700] opacity-80'
          }`} />
          <p className={`text-base font-mono uppercase tracking-wide transition-all duration-500 ${
            isRift ? 'text-[#999999]' : 'text-[#94a3b8]'
          }`}>
            {isLoading ? 'Consulting the patterns...' : 'Choose the pattern that resonates most right now.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {behaviors.map((behavior) => (
            <Card
              key={behavior.id}
              onClick={() => !isLoading && setSelected(behavior.id)}
              selected={selected === behavior.id}
              interactive={!isLoading}
              reality={reality}
            >
              <p className={`text-base font-mono transition-all duration-500 ${
                isRift ? 'text-[#e0e0e0]' : 'text-[#e0f2fe]'
              }`}>{behavior.label}</p>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={handleContinue} 
            disabled={!selected || isLoading} 
            variant="primary" 
            text={isLoading ? "GENERATING..." : "CONTINUE"} 
            reality={reality} 
          />
        </div>
      </div>
    </div>
  );
}