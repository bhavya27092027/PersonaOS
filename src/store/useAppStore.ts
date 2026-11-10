import { create } from 'zustand';

export type VisitorType = 'recruiter' | 'engineer' | 'founder' | 'student' | 'explorer' | null;

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  results: string[];
  github: string;
  live?: string;
  color: string;
  problemStatement?: string;
  architecture?: string;
  impact?: string;
  futureScope?: string;
  keyLearnings?: string[];
  metrics?: string[];
}

interface AppState {
  // Boot sequence
  bootComplete: boolean;
  setBootComplete: (value: boolean) => void;

  // Visitor
  visitorType: VisitorType;
  setVisitorType: (type: VisitorType) => void;
  visitorName: string;
  setVisitorName: (name: string) => void;

  // Navigation
  currentSection: string;
  setCurrentSection: (section: string) => void;

  // Modal states
  visitorModalOpen: boolean;
  setVisitorModalOpen: (value: boolean) => void;
  projectModalOpen: boolean;
  setProjectModalOpen: (value: boolean) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;

  // AI Chat
  aiChatOpen: boolean;
  setAiChatOpen: (value: boolean) => void;
  chatMessages: Array<{ role: 'user' | 'assistant'; content: string }>;
  addChatMessage: (message: { role: 'user' | 'assistant'; content: string }) => void;

  // Games
  currentGame: string | null;
  setCurrentGame: (game: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Boot sequence
  bootComplete: false,
  setBootComplete: (value) => set({ bootComplete: value }),

  // Visitor
  visitorType: null,
  setVisitorType: (type) => set({ visitorType: type }),
  visitorName: '',
  setVisitorName: (name) => set({ visitorName: name }),

  // Navigation
  currentSection: 'hero',
  setCurrentSection: (section) => set({ currentSection: section }),

  // Modal states
  visitorModalOpen: false,
  setVisitorModalOpen: (value) => set({ visitorModalOpen: value }),
  projectModalOpen: false,
  setProjectModalOpen: (value) => set({ projectModalOpen: value }),
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),

  // AI Chat
  aiChatOpen: false,
  setAiChatOpen: (value) => set({ aiChatOpen: value }),
  chatMessages: [],
  addChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),

  // Games
  currentGame: null,
  setCurrentGame: (game) => set({ currentGame: game }),
}));
