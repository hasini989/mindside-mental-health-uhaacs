import { useState } from 'react';
import { Behavior, Reality } from '../App';

type BehavioralMindMapProps = {
  behavior: Behavior;
  answers: {
    [key: string]: any;
  };
  reality?: Reality;
};

type MindMapNode = {
  id: string;
  label: string;
  type: 'center' | 'trigger' | 'reaction';
};

export default function BehavioralMindMap({ behavior, answers, reality = 'rift' }: BehavioralMindMapProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const isRift = reality === 'rift';

  // Generate nodes based on behavior and slider answers
  const getCenterNode = (): string => {
    const behaviorLabels: Record<Behavior, string> = {
      'shutdown': 'Emotional Shutdown',
      'avoid-conflict': 'Conflict Avoidance',
      'over-apologize': 'Over-Apologizing',
      'responsible-for-others': 'Caretaking',
      'struggle-to-ask': 'Self-Reliance',
    };
    return behaviorLabels[behavior];
  };

  const getTriggerNodes = (): string[] => {
    const triggers: string[] = [];
    
    // Analyze slider responses to determine triggers
    // Low scores (1-4) on positive questions or high scores (7-10) on negative questions indicate triggers
    
    if (answers.socialEnergy && answers.socialEnergy <= 4) {
      triggers.push('Social Exhaustion');
    }
    
    if (answers.mentalClarity && answers.mentalClarity <= 4) {
      triggers.push('Mental Fog');
    }
    
    if (answers.emotionalStability && answers.emotionalStability <= 4) {
      triggers.push('Emotional Volatility');
    }
    
    if (answers.resilience && answers.resilience <= 4) {
      triggers.push('Low Resilience');
    }
    
    if (answers.worstCaseScenario && answers.worstCaseScenario >= 7) {
      triggers.push('Catastrophic Thinking');
    }
    
    if (answers.feltUnderstood && answers.feltUnderstood <= 4) {
      triggers.push('Feeling Unseen');
    }
    
    if (answers.manageableResponsibilities && answers.manageableResponsibilities <= 4) {
      triggers.push('Overwhelm');
    }

    // Default triggers if none identified
    if (triggers.length === 0) {
      triggers.push('Stress Response', 'Protective Pattern');
    }

    return triggers.slice(0, 3); // Limit to 3 for visual clarity
  };

  const getReactionNodes = (): string[] => {
    const reactions: Record<Behavior, string[]> = {
      'shutdown': ['Going Numb', 'Disconnecting', 'Emotional Walls'],
      'avoid-conflict': ['People-Pleasing', 'Saying Yes', 'Silent Resentment'],
      'over-apologize': ['Taking Blame', 'Diminishing Self', 'Hyper-Responsibility'],
      'responsible-for-others': ['Managing Emotions', 'Caretaking', 'Ignoring Own Needs'],
      'struggle-to-ask': ['Self-Isolation', 'Pushing Through', 'Refusing Help'],
    };
    return reactions[behavior];
  };

  const centerNode = getCenterNode();
  const triggerNodes = getTriggerNodes();
  const reactionNodes = getReactionNodes();

  return (
    <div className="my-12">
      <div className="text-center mb-8">
        <h3 className={`text-3xl mb-3 tracking-wider transition-all duration-500 ${
          isRift ? 'text-[#ff0000] font-benguiat' : 'text-[#FFD700] font-celestial'
        }`}>
          {isRift ? "Detective's Wall" : "Constellation Map"}
        </h3>
        <p className={`font-mono text-sm uppercase tracking-wider transition-all duration-500 ${
          isRift ? 'text-[#999999]' : 'text-[#94a3b8]'
        }`}>
          {isRift ? 'How current patterns connect to responses' : 'Celestial patterns of current state'}
        </p>
      </div>

      <div className={`relative rounded-sm p-8 md:p-12 border min-h-[600px] overflow-x-auto transition-all duration-500 ${
        isRift ? 'bg-[#1a1a1a] border-[#333333]' : 'bg-[#0a1929]/80 border-[#1e3a5f]'
      }`}>
        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            {/* Rift: Organic vine gradient */}
            <linearGradient id="vineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#660000" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ff0000" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#660000" stopOpacity="0.6" />
            </linearGradient>
            
            {/* Horizon: Golden constellation gradient */}
            <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines from triggers to center */}
          {triggerNodes.map((_, index) => {
            const angle = (index * (180 / (triggerNodes.length - 1))) - 90;
            const startX = 50 + 35 * Math.cos((angle * Math.PI) / 180);
            const startY = 50 + 35 * Math.sin((angle * Math.PI) / 180);
            
            const cp1X = startX - 10;
            const cp1Y = startY + (Math.random() * 10 - 5);
            const cp2X = 50 - 10;
            const cp2Y = 50 + (Math.random() * 10 - 5);
            
            return (
              <path
                key={`trigger-line-${index}`}
                d={isRift 
                  ? `M ${startX}% ${startY}% Q ${cp1X}% ${cp1Y}%, ${(startX + 50) / 2}% ${(startY + 50) / 2}% T 50% 50%`
                  : `M ${startX}% ${startY}% L 50% 50%`
                }
                stroke={isRift ? "url(#vineGradient)" : "url(#constellationGradient)"}
                strokeWidth={isRift ? "3" : "2"}
                fill="none"
                filter="url(#lineGlow)"
                className={isRift ? 'vine-connector' : 'constellation-line'}
                style={{
                  opacity: hoveredNode === `trigger-${index}` || hoveredNode === 'center' ? 1 : 0.4,
                  transition: 'opacity 300ms'
                }}
                strokeDasharray={isRift ? "5,5" : "0"}
              />
            );
          })}

          {/* Connection lines from center to reactions */}
          {reactionNodes.map((_, index) => {
            const angle = (index * (180 / (reactionNodes.length - 1))) + 90;
            const endX = 50 + 35 * Math.cos((angle * Math.PI) / 180);
            const endY = 50 + 35 * Math.sin((angle * Math.PI) / 180);
            
            const cp1X = 50 + 10;
            const cp1Y = 50 + (Math.random() * 10 - 5);
            const cp2X = endX - 10;
            const cp2Y = endY + (Math.random() * 10 - 5);
            
            return (
              <path
                key={`reaction-line-${index}`}
                d={isRift
                  ? `M 50% 50% Q ${cp1X}% ${cp1Y}%, ${(50 + endX) / 2}% ${(50 + endY) / 2}% T ${endX}% ${endY}%`
                  : `M 50% 50% L ${endX}% ${endY}%`
                }
                stroke={isRift ? "url(#vineGradient)" : "url(#constellationGradient)"}
                strokeWidth={isRift ? "3" : "2"}
                fill="none"
                filter="url(#lineGlow)"
                className={isRift ? 'vine-connector' : 'constellation-line'}
                style={{
                  opacity: hoveredNode === `reaction-${index}` || hoveredNode === 'center' ? 1 : 0.4,
                  transition: 'opacity 300ms'
                }}
                strokeDasharray={isRift ? "5,5" : "0"}
              />
            );
          })}
        </svg>

        {/* Nodes Container */}
        <div className="relative" style={{ zIndex: 2 }}>
          {/* Trigger Nodes - Left side */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-6">
            {triggerNodes.map((trigger, index) => (
              <div
                key={`trigger-${index}`}
                className={`cursor-pointer transition-all duration-300 ${
                  isRift ? 'polaroid-frame' : ''
                }`}
                style={{ 
                  transform: isRift 
                    ? `rotate(${(index % 2 === 0 ? -3 : 3)}deg)` 
                    : 'none',
                  maxWidth: '200px'
                }}
                onMouseEnter={() => setHoveredNode(`trigger-${index}`)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {isRift ? (
                  // Rift: Polaroid style
                  <>
                    <div className="bg-[#0a0a0a] p-4 min-h-[80px] flex flex-col justify-center">
                      <p className="text-[9px] text-[#666666] uppercase tracking-widest mb-2 font-mono">
                        CURRENT TRIGGER
                      </p>
                      <p className="text-[#e0e0e0] font-mono text-sm leading-tight">{trigger}</p>
                    </div>
                    <div className="text-[10px] text-[#999999] mt-2 font-mono text-center">
                      EVIDENCE #{index + 1}
                    </div>
                  </>
                ) : (
                  // Horizon: Luminous orb
                  <div className={`luminous-orb w-40 h-40 flex items-center justify-center p-6 border-2 border-[#FFD700] transition-all duration-300 ${
                    hoveredNode === `trigger-${index}` ? 'scale-110' : ''
                  }`} style={{
                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2), rgba(10, 25, 41, 0.8))'
                  }}>
                    <div className="text-center">
                      <p className="text-[9px] text-[#FFD700] uppercase tracking-widest mb-2 font-mono">
                        TRIGGER
                      </p>
                      <p className="text-[#e0f2fe] font-mono text-xs leading-tight">{trigger}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Center Node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className={`relative px-12 py-10 cursor-pointer transition-all duration-300 border-2 ${
                isRift 
                  ? 'bg-[#ff0000] border-[#330000] rounded-sm'
                  : 'luminous-orb bg-gradient-to-br from-[#FFD700]/30 to-[#F59E0B]/30 border-[#FFD700] rounded-full'
              } ${
                hoveredNode === 'center' ? 'scale-110' : ''
              }`}
              onMouseEnter={() => setHoveredNode('center')}
              onMouseLeave={() => setHoveredNode(null)}
              style={{
                boxShadow: hoveredNode === 'center' 
                  ? (isRift 
                      ? '0 0 50px rgba(255,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5)' 
                      : '0 0 50px rgba(255,215,0,0.9), inset 0 0 30px rgba(255,215,0,0.5)')
                  : (isRift 
                      ? '0 0 35px rgba(255,0,0,0.5), inset 0 0 15px rgba(0,0,0,0.3)' 
                      : '0 0 30px rgba(255,215,0,0.6), inset 0 0 20px rgba(255,215,0,0.3)')
              }}
            >
              <p className={`text-[10px] uppercase tracking-widest mb-3 text-center font-mono ${
                isRift ? 'text-white/60' : 'text-[#FFD700]'
              }`}>
                {isRift ? '⚠ CORE PATTERN ⚠' : '✦ CORE PATTERN ✦'}
              </p>
              <p className={`text-lg font-mono font-bold text-center whitespace-nowrap uppercase tracking-wide ${
                isRift ? 'text-white' : 'text-[#FFD700]'
              }`}>
                {centerNode}
              </p>
              {/* Effects */}
              {isRift ? (
                <>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-[#ff0000] to-transparent opacity-70" />
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-1 bg-gradient-to-l from-[#ff0000] to-transparent opacity-70" />
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-1 bg-gradient-to-r from-[#ff0000] to-transparent opacity-70" />
                </>
              ) : null}
            </div>
          </div>

          {/* Reaction Nodes - Right side */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-6">
            {reactionNodes.map((reaction, index) => (
              <div
                key={`reaction-${index}`}
                className={`cursor-pointer transition-all duration-300 text-right ${
                  isRift ? `shredded-paper bg-[#1a1a1a] border px-6 py-5 ${
                    hoveredNode === `reaction-${index}`
                      ? 'shadow-[0_0_25px_rgba(255,0,0,0.4)] scale-105 border-[#ff0000]'
                      : 'shadow-[0_2px_10px_rgba(0,0,0,0.3)] border-[#444444]'
                  }` : ''
                }`}
                style={{ maxWidth: '220px' }}
                onMouseEnter={() => setHoveredNode(`reaction-${index}`)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {isRift ? (
                  // Rift: Shredded paper
                  <>
                    <p className="text-[9px] text-[#666666] uppercase tracking-widest mb-2 font-mono">
                      CURRENT RESPONSE
                    </p>
                    <p className="text-[#e0e0e0] font-mono text-sm leading-tight">{reaction}</p>
                  </>
                ) : (
                  // Horizon: Luminous orb
                  <div className={`luminous-orb w-40 h-40 flex items-center justify-center p-6 border-2 border-[#FFD700] mx-auto transition-all duration-300 ${
                    hoveredNode === `reaction-${index}` ? 'scale-110' : ''
                  }`} style={{
                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2), rgba(10, 25, 41, 0.8))'
                  }}>
                    <div className="text-center">
                      <p className="text-[9px] text-[#FFD700] uppercase tracking-widest mb-2 font-mono">
                        RESPONSE
                      </p>
                      <p className="text-[#e0f2fe] font-mono text-xs leading-tight">{reaction}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className={`text-xs font-mono uppercase tracking-wider transition-all duration-500 ${
          isRift ? 'text-[#666666]' : 'text-[#64748b]'
        }`}>
          {isRift ? '[ Hover over evidence to illuminate connections ]' : '[ Hover over nodes to reveal pathways ]'}
        </p>
      </div>
    </div>
  );
}