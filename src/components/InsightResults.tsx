import React from 'react';
import { Insight, Reality, Behavior, ReflectionAnswers } from '../App';
import Card from './Card';
import Button from './Button';
import BehavioralMindMap from './BehavioralMindMap';

type InsightResultsProps = {
  insight: Insight;
  onContinue: () => void;
  behavior: Behavior;
  answers: ReflectionAnswers;
  reality: Reality;
};

export default function InsightResults({ insight, onContinue, behavior, answers, reality }: InsightResultsProps) {
  const isRift = reality === 'rift';

  return (
    <div className="min-h-screen px-6 py-12 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl mb-6 tracking-wider transition-all duration-500 ${
            isRift ? 'text-[#ff0000] font-benguiat' : 'text-[#FFD700] font-celestial'
          }`}>
            {isRift ? 'CASE FILE' : 'COSMIC REVELATIONS'}
          </h2>
          <div className={`h-0.5 w-24 mx-auto mb-6 transition-all duration-500 ${
            isRift ? 'bg-[#ff0000] opacity-60' : 'bg-[#FFD700] opacity-80'
          }`} />
          <p className={`text-sm font-mono uppercase tracking-wide transition-all duration-500 ${
            isRift ? 'text-[#999999]' : 'text-[#94a3b8]'
          }`}>
            These insights are an invitation to understand, not a judgment.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <Card reality={reality}>
            <h3 className={`text-xs uppercase tracking-widest mb-4 font-mono transition-all duration-500 ${
              isRift ? 'text-[#ff0000]' : 'text-[#FFD700]'
            }`}>
              {isRift ? '⚠ POSSIBLE LEARNED PATTERN' : '✦ DISCOVERED PATTERN'}
            </h3>
            <p className={`text-xl font-mono transition-all duration-500 ${
              isRift ? 'text-[#e0e0e0]' : 'text-[#e0f2fe]'
            }`}>
              {insight.learnedPattern}
            </p>
          </Card>

          <Card reality={reality}>
            <h3 className={`text-xs uppercase tracking-widest mb-4 font-mono transition-all duration-500 ${
              isRift ? 'text-[#ff0000]' : 'text-[#FFD700]'
            }`}>
              HOW IT MAY HAVE HELPED BEFORE
            </h3>
            <p className={`text-base leading-relaxed font-mono transition-all duration-500 ${
              isRift ? 'text-[#cccccc]' : 'text-[#cbd5e1]'
            }`}>
              {insight.helpedBefore}
            </p>
          </Card>

          <Card reality={reality}>
            <h3 className={`text-xs uppercase tracking-widest mb-4 font-mono transition-all duration-500 ${
              isRift ? 'text-[#ff0000]' : 'text-[#FFD700]'
            }`}>
              HOW IT MIGHT SHOW UP NOW
            </h3>
            <p className={`text-base leading-relaxed font-mono transition-all duration-500 ${
              isRift ? 'text-[#cccccc]' : 'text-[#cbd5e1]'
            }`}>
              {insight.showsUpNow}
            </p>
          </Card>

          <Card highlight reality={reality}>
            <h3 className={`text-xs uppercase tracking-widest mb-4 font-mono transition-all duration-500 ${
              isRift ? 'text-[#ff0000]' : 'text-[#FFD700]'
            }`}>
              {isRift ? '📝 YOUR JOURNAL PROMPT' : '✨ YOUR JOURNAL PROMPT'}
            </h3>
            <p className={`text-lg leading-relaxed italic font-mono transition-all duration-500 ${
              isRift ? 'text-[#e0e0e0]' : 'text-[#e0f2fe]'
            }`}>
              {insight.journalPrompt}
            </p>
          </Card>
        </div>

        {/* This is where the errors are likely originating */}
        <BehavioralMindMap behavior={behavior} answers={answers} reality={reality} />

        <div className="flex justify-center mt-12">
          <Button onClick={onContinue} variant="primary" reality={reality} text="CONTINUE TO JOURNAL" />
        </div>
      </div>
    </div>
  );
}