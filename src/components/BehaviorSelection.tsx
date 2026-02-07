import { useState } from 'react';
import { Behavior } from '../App';
import Card from './Card';
import Button from './Button';
import { Reality } from '../App';

type BehaviorSelectionProps = {
  onSelect: (behavior: Behavior) => void;
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
];

export default function BehaviorSelection({ onSelect, reality }: BehaviorSelectionProps) {
  const [selected, setSelected] = useState<Behavior | null>(null);
  const isRift = reality === 'rift';

  const handleContinue = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 pt-24">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h2 className={`text-4xl mb-6 font-benguiat tracking-wider transition-all duration-500 ${
            isRift ? 'text-[#ff0000]' : 'text-[#FFD700] font-celestial'
          }`}>
            SELECT PATTERN
          </h2>
          <div className={`h-0.5 w-24 mx-auto mb-6 transition-all duration-500 ${
            isRift ? 'bg-[#ff0000] opacity-60' : 'bg-[#FFD700] opacity-80'
          }`} />
          <p className={`text-base font-mono uppercase tracking-wide transition-all duration-500 ${
            isRift ? 'text-[#999999]' : 'text-[#94a3b8]'
          }`}>
            Choose the pattern that resonates most right now.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {behaviors.map((behavior) => (
            <Card
              key={behavior.id}
              onClick={() => setSelected(behavior.id)}
              selected={selected === behavior.id}
              interactive
              reality={reality}
            >
              <p className={`text-base font-mono transition-all duration-500 ${
                isRift ? 'text-[#e0e0e0]' : 'text-[#e0f2fe]'
              }`}>{behavior.label}</p>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button onClick={handleContinue} disabled={!selected} variant="primary" text="CONTINUE" reality={reality} />
        </div>
      </div>
    </div>
  );
}