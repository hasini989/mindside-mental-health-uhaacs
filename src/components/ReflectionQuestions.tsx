import { useState } from 'react';
import { Behavior, ReflectionAnswers, Reality } from '../App';
import Card from './Card';
import Button from './Button';
import { ChevronLeft } from 'lucide-react';

type ReflectionQuestionsProps = {
  behavior: Behavior;
  onComplete: (answers: ReflectionAnswers) => void;
  onBack: () => void;
  reality: Reality;
};

type Question = {
  id: string;
  question: string;
  type: 'slider';
};

const questions: Question[] = [
  {
    id: 'socialEnergy',
    question: 'Being around people lately gives me energy.',
    type: 'slider',
  },
  {
    id: 'mentalClarity',
    question: 'My thoughts feel clear and organized most days.',
    type: 'slider',
  },
  {
    id: 'emotionalStability',
    question: 'My emotions have felt steady and manageable recently.',
    type: 'slider',
  },
  {
    id: 'resilience',
    question: 'Even when things go wrong, I can bounce back without spiraling.',
    type: 'slider',
  },
  {
    id: 'routineMaintenance',
    question: 'Having a plan or routine right now feels easy to maintain.',
    type: 'slider',
  },
  {
    id: 'worstCaseScenario',
    question: 'When you imagine a worst-case scenario, does it feel like it is actually happening in the room?',
    type: 'slider',
  },
  {
    id: 'feltUnderstood',
    question: 'I feel understood by the people around me.',
    type: 'slider',
  },
  {
    id: 'enjoyMoments',
    question: "I've been able to enjoy small moments in my day.",
    type: 'slider',
  },
  {
    id: 'manageableResponsibilities',
    question: 'My responsibilities feel manageable right now.',
    type: 'slider',
  },
  {
    id: 'hopeful',
    question: 'I feel hopeful about the near future.',
    type: 'slider',
  },
];

export default function ReflectionQuestions({ behavior, onComplete, onBack, reality }: ReflectionQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ReflectionAnswers>({});

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const isRift = reality === 'rift';
  const isHorizon = reality === 'horizon';

  const handleSliderChange = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (isFirstQuestion) {
      onBack();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const canProceed = () => {
    return answers[currentQuestion.id] !== undefined;
  };

  const currentValue = answers[currentQuestion.id] as number | undefined;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 pt-24">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className={`h-1 rounded-none overflow-hidden border transition-all duration-500 ${
            isRift 
              ? 'bg-[#1a1a1a] border-[#333333]' 
              : 'bg-[#0a1929] border-[#1e3a5f]'
          }`}>
            <div
              className={`h-full transition-all duration-500 ease-out relative ${
                isRift ? 'bg-[#ff0000]' : 'bg-[#FFD700]'
              }`}
              style={{ width: `${progress}%` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent ${
                isRift ? 'animate-pulse' : ''
              }`}>
                {isHorizon && (
                  <div className="absolute right-0 top-0 w-3 h-full bg-gradient-to-l from-white/60 to-transparent animate-pulse" />
                )}
              </div>
            </div>
          </div>
          <p className={`text-xs mt-3 text-center font-mono uppercase tracking-widest transition-all duration-500 ${
            isRift ? 'text-[#666666]' : 'text-[#64748b]'
          }`}>
            QUESTION {currentQuestionIndex + 1} OF {questions.length}
          </p>
        </div>

        <div className="text-center mb-10">
          <h2 className={`text-2xl md:text-3xl leading-relaxed font-mono tracking-wide transition-all duration-500 ${
            isRift ? 'text-[#ff0000]' : 'text-[#FFD700]'
          }`}>
            {currentQuestion.question}
          </h2>
        </div>

        {/* Slider */}
        <div className="mb-12 px-4">
          <div className="relative">
            {/* Slider track and input */}
            <div className="relative">
              <input
                type="range"
                min="1"
                max="10"
                value={currentValue || 5}
                onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                className={`w-full h-2 rounded-sm appearance-none cursor-pointer transition-all duration-500 ${
                  isRift 
                    ? 'bg-[#1a1a1a] accent-[#ff0000]' 
                    : 'bg-[#0a1929] accent-[#FFD700]'
                }`}
                style={{
                  background: isRift
                    ? `linear-gradient(to right, #ff0000 0%, #ff0000 ${((currentValue || 5) - 1) * 11.11}%, #1a1a1a ${((currentValue || 5) - 1) * 11.11}%, #1a1a1a 100%)`
                    : `linear-gradient(to right, #FFD700 0%, #FFD700 ${((currentValue || 5) - 1) * 11.11}%, #0a1929 ${((currentValue || 5) - 1) * 11.11}%, #0a1929 100%)`,
                }}
              />
            </div>

            {/* Number labels and current value display */}
            <div className="flex justify-between items-center mt-4">
              <span className={`text-sm font-mono font-bold transition-all duration-500 ${
                isRift ? 'text-[#666666]' : 'text-[#64748b]'
              }`}>
                1
              </span>
              
              {currentValue !== undefined && (
                <div className={`px-4 py-2 rounded-sm border transition-all duration-500 ${
                  isRift 
                    ? 'bg-[#0f0f0f]/90 border-[#ff0000] shadow-[0_0_15px_rgba(255,0,0,0.3)]' 
                    : 'bg-[#0a1929]/90 border-[#FFD700] shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                }`}>
                  <span className={`text-2xl font-mono font-bold transition-all duration-500 ${
                    isRift ? 'text-[#ff0000]' : 'text-[#FFD700]'
                  }`}>
                    {currentValue}
                  </span>
                </div>
              )}
              
              <span className={`text-sm font-mono font-bold transition-all duration-500 ${
                isRift ? 'text-[#666666]' : 'text-[#64748b]'
              }`}>
                10
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={handleNext} disabled={!canProceed()} variant="primary" reality={reality} text={isLastQuestion ? 'SEE INSIGHTS' : 'NEXT'} />
        </div>
      </div>
    </div>
  );
}