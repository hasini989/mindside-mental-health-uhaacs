import { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import BehaviorSelection from './components/BehaviorSelection';
import ReflectionQuestions from './components/ReflectionQuestions';
import InsightResults from './components/InsightResults';
import JournalingSection from './components/JournalingSection';
import GlobalNav from './components/GlobalNav';
import RealitySwitcher from './components/RealitySwitcher';
import EmotionalMonitor from './components/EmotionalMonitor';
import PanicInterventionModal from './components/PanicInterventionModal';
import React from 'react';

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
  
  // State to control the visibility of the Panic Intervention Modal
  const [isPanicModalOpen, setIsPanicModalOpen] = useState(false);

  // Update body class when reality changes
  useEffect(() => {
    document.body.className = `theme-${currentReality}`;
  }, [currentReality]);

  const handleRealityToggle = (reality: 'rift' | 'horizon') => {
    setCurrentReality(reality);
  };

  const handleStartReflection = () => {
    setSelectedBehavior('shutdown');
    setCurrentStep('questions');
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

  const handleBackFromQuestions = () => {
    setCurrentStep('welcome');
  };

  const handleBackFromInsight = () => {
    setCurrentStep('questions');
  };

  const handleBackFromJournal = () => {
    setCurrentStep('insight');
  };

  // Logic to handle when the EmotionalMonitor detects distress
  const handleDistressDetected = () => {
    if (!isPanicModalOpen) {
      console.log("Distress Alert: Opening Panic Intervention Modal");
      setIsPanicModalOpen(true);
    }
  };

  // Calculate overall progress
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

  // Determine navigation props
  const getNavProps = () => {
    switch (currentStep) {
      case 'welcome':
        return { showBack: false, showProgress: false };
      case 'behavior':
        return { showBack: true, onBack: () => setCurrentStep('welcome'), showProgress: true };
      case 'questions':
        return { showBack: true, onBack: handleBackFromQuestions, showProgress: true };
      case 'insight':
        return { showBack: true, onBack: handleBackFromInsight, showProgress: true };
      case 'journal':
        return { showBack: true, onBack: handleBackFromJournal, showProgress: true };
      default:
        return { showBack: false, showProgress: false };
    }
  };

  return (
    <div className={`min-h-screen vignette transition-all duration-500 ${
      currentReality === 'rift' ? 'bg-[#2b2b2b]' : currentReality === 'horizon' ? 'bg-[#0a1929]' : 'bg-[#f3f4f6]'
    }`}>
      {/* Monitoring active across all pages */}
      <EmotionalMonitor 
        onDistressDetected={handleDistressDetected} 
        reality={currentReality} 
      />

      {/* The Intervention Popup */}
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
      
      {currentStep === 'welcome' && <Welcome onStart={handleStartReflection} reality={currentReality} />}
      {currentStep === 'behavior' && <BehaviorSelection onSelect={handleBehaviorSelect} reality={currentReality} />}
      {currentStep === 'questions' && <ReflectionQuestions behavior={selectedBehavior!} onComplete={handleQuestionsComplete} onBack={handleBackFromQuestions} reality={currentReality} />}
      {currentStep === 'insight' && <InsightResults insight={insight!} behavior={selectedBehavior!} answers={answers} onContinue={handleContinueToJournal} reality={currentReality} />}
      {currentStep === 'journal' && <JournalingSection prompt={insight!.journalPrompt} onStartOver={handleStartOver} reality={currentReality} onPanicMode={() => setCurrentReality('neutral')} onExitPanicMode={() => setCurrentReality('horizon')} />}
    </div>
  );
}

function generateInsight(behavior: Behavior, answers: ReflectionAnswers): Insight {
  const insights: Record<Behavior, Insight> = {
    'shutdown': {
      learnedPattern: 'Emotional withdrawal as protection',
      helpedBefore: 'Shutting down may have helped you avoid overwhelming emotions or unpredictable reactions from others. It kept you safe when expressing feelings felt risky.',
      showsUpNow: 'You might find yourself going numb or disconnecting during difficult conversations, even when you want to stay present. This can make intimacy and conflict resolution challenging.',
      journalPrompt: answers.commonPhrase 
        ? `When you heard "${answers.commonPhrase}" growing up, what did you learn about showing your emotions? How might you respond to yourself differently today?`
        : 'What would it feel like to stay present with an uncomfortable emotion for just one more minute? What are you afraid might happen?'
    },
    'avoid-conflict': {
      learnedPattern: 'Conflict avoidance as peacekeeping',
      helpedBefore: 'Avoiding conflict may have helped maintain stability in an unpredictable environment. You learned that keeping the peace was your responsibility and that disagreement could lead to danger or disconnection.',
      showsUpNow: 'You might say "yes" when you mean "no," or let resentment build rather than addressing issues. Small disagreements can feel catastrophic before they even begin.',
      journalPrompt: answers.conflictStyle === 'loud-angry'
        ? 'Think of a time you avoided conflict recently. What did the younger you think would happen if you spoke up? Was that fear based on past experiences or present reality?'
        : 'What might become possible in your relationships if disagreement didn\'t mean disconnection? What would a "safe" conflict look like to you?'
    },
    'over-apologize': {
      learnedPattern: 'Hyper-responsibility and preemptive apology',
      helpedBefore: 'Over-apologizing may have helped you avoid blame or anger from adults who struggled with accountability. You learned to take responsibility for things that weren\'t yours to carry.',
      showsUpNow: 'You might apologize for taking up space, having needs, or things completely outside your control. This can diminish your presence and make it hard for others to see you clearly.',
      journalPrompt: answers.mistakeResponse
        ? `When you made mistakes as a child and experienced ${answers.mistakeResponse}, what did you learn about your worth? What would you tell that younger version of you now?`
        : 'For one day, notice each time you apologize. Ask yourself: "Am I actually responsible for this?" What patterns do you notice?'
    },
    'responsible-for-others': {
      learnedPattern: 'Caretaking and emotional management of others',
      helpedBefore: 'Taking responsibility for others\' emotions may have helped stabilize your environment. You became attuned to others\' feelings as a survival skill, learning to manage their emotions before they became overwhelming.',
      showsUpNow: 'You might feel anxious when others are upset, even when it has nothing to do with you. Your own feelings take a backseat to managing everyone else\'s emotional state.',
      journalPrompt: answers.conflictStyle
        ? 'Think about how conflict looked in your home. Whose job was it to "fix" everyone\'s feelings? What would it mean to let others hold their own emotions now?'
        : 'What would it feel like to witness someone else\'s discomfort without trying to fix it? What comes up for you when you imagine that?'
    },
    'solid-foundation': { // Changed from 'struggle-to-ask' to match common project needs or keep original
      learnedPattern: 'Self-reliance as survival',
      helpedBefore: 'Not asking for help may have protected you from disappointment, rejection, or burdening adults who were already overwhelmed.',
      showsUpNow: 'You might push yourself to exhaustion rather than reach out. Accepting help can feel vulnerable or shameful.',
      journalPrompt: 'Think of someone you trust. What makes asking them for help feel difficult?'
    },
    'struggle-to-ask': {
      learnedPattern: 'Self-reliance as survival',
      helpedBefore: 'Not asking for help may have protected you from disappointment, rejection, or burdening adults who were already overwhelmed. You learned that your needs were secondary or that asking made you weak.',
      showsUpNow: 'You might push yourself to exhaustion rather than reach out. Accepting help can feel vulnerable or shameful, even when support is freely offered.',
      journalPrompt: answers.commonPhrase
        ? `When you heard "${answers.commonPhrase}", what did you learn about having needs? How has that belief served you, and how has it limited you?`
        : 'Think of someone you trust. What makes asking them for help feel difficult? What story are you telling yourself about what it means to need support?'
    }
  };

  return insights[behavior];
}

export default App;