import React, { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import BehaviorSelection from './components/BehaviorSelection';
import ReflectionQuestions from './components/ReflectionQuestions';
import InsightResults from './components/InsightResults';
import JournalingSection from './components/JournalingSection';
import GlobalNav from './components/GlobalNav';
import RealitySwitcher from './components/RealitySwitcher';
import EmotionalMonitor from './components/EmotionalMonitor';
import PanicInterventionModal from './components/PanicInterventionModal';

// AI Service Logic Integration
export async function getAIPrompts(behaviorId: string, reality: string) {
  const systemPrompt = `You are a supportive AI mental health companion in a ${reality} themed app. 
  The user has selected the behavior pattern: "${behaviorId}". 
  Provide one deep, insightful journaling prompt to help them process this. 
  Keep it under 30 words and match the ${reality === 'rift' ? 'dark/gritty' : 'ethereal/calm'} aesthetic.`;

  try {
    const response = await fetch('/api/generate-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: systemPrompt }),
    });

    const data = await response.json();
    return data.text; 
  } catch (error) {
    console.error("AI Prompt Fetch Error:", error);
    return null;
  }
}

// Types
export type Behavior = 
  | 'shutdown'
  | 'avoid-conflict'
  | 'over-apologize'
  | 'responsible-for-others'
  | 'struggle-to-ask'
  | 'solid-foundation';

export type ReflectionAnswers = {
  conflictStyle?: string;
  mistakeResponse?: string;
  commonPhrase?: string;
  socialEnergy?: number;
  mentalClarity?: number;
  emotionalStability?: number;
  resilience?: number;
  worstCaseScenario?: number;
  feltUnderstood?: number;
  manageableResponsibilities?: number;
};

export type Insight = {
  learnedPattern: string;
  helpedBefore: string;
  showsUpNow: string;
  journalPrompt: string;
};

export type Reality = 'rift' | 'horizon' | 'neutral';

function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'behavior' | 'questions' | 'insight' | 'journal'>('welcome');
  const [selectedBehavior, setSelectedBehavior] = useState<Behavior | null>(null);
  const [answers, setAnswers] = useState<ReflectionAnswers>({});
  const [insight, setInsight] = useState<Insight | null>(null);
  const [currentReality, setCurrentReality] = useState<Reality>('horizon');
  const [isPanicModalOpen, setIsPanicModalOpen] = useState(false);

  // Update body class for global theme styling
  useEffect(() => {
    document.body.className = `theme-${currentReality}`;
  }, [currentReality]);

  const handleRealityToggle = (reality: 'rift' | 'horizon') => {
    setCurrentReality(reality);
  };

  const handleStartReflection = () => {
    setCurrentStep('behavior');
  };

  const handleBehaviorSelect = (behavior: Behavior) => {
    setSelectedBehavior(behavior);
    setCurrentStep('questions');
  };

  const handleQuestionsComplete = (reflectionAnswers: ReflectionAnswers) => {
    setAnswers(reflectionAnswers);
    const generatedInsight = generateInsight(selectedBehavior!, reflectionAnswers);
    setInsight(generatedInsight);
    setCurrentStep('insight');
  };

  const handleContinueToJournal = () => {
    setCurrentStep('journal');
  };

  const handleStartOver = () => {
    setCurrentStep('welcome');
    setSelectedBehavior(null);
    setAnswers({});
    setInsight(null);
  };

  const handleBackFromQuestions = () => setCurrentStep('behavior');
  const handleBackFromInsight = () => setCurrentStep('questions');
  const handleBackFromJournal = () => setCurrentStep('insight');

  const handleDistressDetected = () => {
    if (!isPanicModalOpen) {
      console.log("Distress Alert: Opening Panic Intervention Modal");
      setIsPanicModalOpen(true);
    }
  };

  const getProgress = () => {
    const stepProgress = {
      'welcome': 0,
      'behavior': 20,
      'questions': 40,
      'insight': 70,
      'journal': 100,
    };
    return stepProgress[currentStep];
  };

  const getNavProps = () => {
    switch (currentStep) {
      case 'welcome': return { showBack: false, showProgress: false };
      case 'behavior': return { showBack: true, onBack: () => setCurrentStep('welcome'), showProgress: true };
      case 'questions': return { showBack: true, onBack: handleBackFromQuestions, showProgress: true };
      case 'insight': return { showBack: true, onBack: handleBackFromInsight, showProgress: true };
      case 'journal': return { showBack: true, onBack: handleBackFromJournal, showProgress: true };
      default: return { showBack: false, showProgress: false };
    }
  };

  return (
    <div className={`min-h-screen vignette transition-all duration-500 ${
      currentReality === 'rift' ? 'bg-[#2b2b2b]' : currentReality === 'horizon' ? 'bg-[#0a1929]' : 'bg-[#f3f4f6]'
    }`}>
      {/* AI Monitoring - Global Overlay */}
      <EmotionalMonitor 
        onDistressDetected={handleDistressDetected} 
        reality={currentReality} 
      />

      {/* Panic Modal */}
      <PanicInterventionModal 
        isOpen={isPanicModalOpen} 
        onClose={() => setIsPanicModalOpen(false)} 
        reality={currentReality}
      />

      <GlobalNav {...getNavProps()} progress={getProgress()} reality={currentReality} />
      
      <RealitySwitcher 
        onToggle={handleRealityToggle} 
        currentReality={currentReality === 'neutral' ? 'rift' : currentReality}
        disabled={currentReality === 'neutral'}
      />
      
      <main className="relative z-10">
        {currentStep === 'welcome' && <Welcome onStart={handleStartReflection} reality={currentReality} />}
        {currentStep === 'behavior' && <BehaviorSelection onSelect={handleBehaviorSelect} reality={currentReality} />}
        {currentStep === 'questions' && (
          <ReflectionQuestions 
            behavior={selectedBehavior!} 
            onComplete={handleQuestionsComplete} 
            onBack={handleBackFromQuestions} 
            reality={currentReality} 
          />
        )}
        {currentStep === 'insight' && (
          <InsightResults 
            insight={insight!} 
            behavior={selectedBehavior!} 
            answers={answers} 
            onContinue={handleContinueToJournal} 
            reality={currentReality} 
          />
        )}
        {currentStep === 'journal' && (
          <JournalingSection 
            prompt={insight!.journalPrompt} 
            onStartOver={handleStartOver} 
            reality={currentReality} 
            onPanicMode={() => setCurrentReality('neutral')} 
            onExitPanicMode={() => setCurrentReality('horizon')} 
          />
        )}
      </main>
    </div>
  );
}

// Helper: Content Generation
function generateInsight(behavior: Behavior, answers: ReflectionAnswers): Insight {
  const insights: Record<Behavior, Insight> = {
    'shutdown': {
      learnedPattern: 'Emotional withdrawal as protection',
      helpedBefore: 'Shutting down may have helped you avoid overwhelming emotions or unpredictable reactions from others.',
      showsUpNow: 'You might find yourself going numb during difficult conversations, making resolution challenging.',
      journalPrompt: answers.commonPhrase 
        ? `When you heard "${answers.commonPhrase}" growing up, what did you learn about showing emotions?`
        : 'What would it feel like to stay present with an uncomfortable emotion for one more minute?'
    },
    'avoid-conflict': {
      learnedPattern: 'Conflict avoidance as peacekeeping',
      helpedBefore: 'Avoiding conflict maintained stability in unpredictable environments.',
      showsUpNow: 'You might say "yes" when you mean "no," letting resentment build.',
      journalPrompt: 'What might become possible if disagreement didn\'t mean disconnection?'
    },
    'over-apologize': {
      learnedPattern: 'Hyper-responsibility',
      helpedBefore: 'Over-apologizing helped you avoid blame from adults who lacked accountability.',
      showsUpNow: 'You might apologize for having needs, which diminishes your presence.',
      journalPrompt: 'Am I actually responsible for this, or am I apologizing to keep others comfortable?'
    },
    'responsible-for-others': {
      learnedPattern: 'Caretaking and emotional management',
      helpedBefore: 'Managing others\' emotions stabilized your world as a survival skill.',
      showsUpNow: 'Your own feelings take a backseat to keeping everyone else comfortable.',
      journalPrompt: 'What would it mean to let others hold their own discomfort today?'
    },
    'solid-foundation': {
      learnedPattern: 'Self-reliance as survival',
      helpedBefore: 'Not asking for help protected you from disappointment or rejection.',
      showsUpNow: 'You might push yourself to exhaustion rather than reaching out.',
      journalPrompt: 'What makes asking for help feel like a risk to you?'
    },
    'struggle-to-ask': {
      learnedPattern: 'Self-reliance as survival',
      helpedBefore: 'Not asking for help protected you from disappointment.',
      showsUpNow: 'You might push yourself to exhaustion rather than reach out.',
      journalPrompt: 'What story are you telling yourself about what it means to need support?'
    }
  };

  return insights[behavior];
}

export default App;