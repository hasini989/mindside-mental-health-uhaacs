import { Reality } from '../App';

export const getThemeColors = (reality: Reality) => {
  if (reality === 'rift') {
    return {
      primary: '#ff0000',
      secondary: '#999999',
      background: '#0f0f0f',
      card: '#1a1a1a',
      border: '#333333',
      text: '#e0e0e0',
      textMuted: '#666666',
      accent: '#ff0000',
    };
  } else if (reality === 'horizon') {
    return {
      primary: '#fbbf24',
      secondary: '#7dd3fc',
      background: '#0a1929',
      card: '#1e3a5f',
      border: '#14b8a6',
      text: '#e0f2fe',
      textMuted: '#94a3b8',
      accent: '#14b8a6',
    };
  } else {
    // neutral/safe mode
    return {
      primary: '#6b7280',
      secondary: '#9ca3af',
      background: '#f3f4f6',
      card: '#e5e7eb',
      border: '#d1d5db',
      text: '#374151',
      textMuted: '#6b7280',
      accent: '#9ca3af',
    };
  }
};

export const getHeadlineClass = (reality: Reality) => {
  if (reality === 'rift') {
    return 'font-benguiat';
  } else if (reality === 'horizon') {
    return 'font-celestial';
  } else {
    return 'font-mono';
  }
};
