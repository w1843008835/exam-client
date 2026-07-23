import { create } from 'zustand';
import { Exam, Question, UserAnswer, User } from '../types';

interface ExamStore {
  user: User | null;
  currentExam: Exam | null;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  isCompleted: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
  setCurrentExam: (exam: Exam | null) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addUserAnswer: (questionId: string, selectedOption: number, isCorrect: boolean) => void;
  setIsCompleted: (completed: boolean) => void;
  resetExam: () => void;
  getAnswerStatus: (questionId: string) => 'correct' | 'wrong' | 'unanswered';
  getStatistics: () => { correct: number; wrong: number; unanswered: number; accuracy: number };
}

export const useExamStore = create<ExamStore>((set, get) => ({
  user: null,
  currentExam: null,
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  isCompleted: false,

  login: (username, token) => set({ user: { username, token } }),

  logout: () => set({ user: null }),

  setCurrentExam: (exam) => set({ currentExam: exam }),

  setQuestions: (questions) => set({ questions }),

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  addUserAnswer: (questionId: string, selectedOption: string[], isCorrect: boolean) => set((state) => {
    const existingIndex = state.userAnswers.findIndex(a => a.questionId === questionId);
    const updatedAnswers = existingIndex >= 0
      ? [...state.userAnswers.slice(0, existingIndex), { questionId, selectedOption, isCorrect }, ...state.userAnswers.slice(existingIndex + 1)]
      : [...state.userAnswers, { questionId, selectedOption, isCorrect }];
    
    const allAnswered = state.questions.every(q => updatedAnswers.some(a => a.questionId === q.id));
    return { userAnswers: updatedAnswers, isCompleted: allAnswered };
  }),

  setIsCompleted: (completed) => set({ isCompleted: completed }),

  resetExam: () => set({
    currentQuestionIndex: 0,
    userAnswers: [],
    isCompleted: false
  }),

  getAnswerStatus: (questionId) => {
    const answer = get().userAnswers.find(a => a.questionId === questionId);
    if (!answer) return 'unanswered';
    return answer.isCorrect ? 'correct' : 'wrong';
  },

  getStatistics: () => {
    const { userAnswers, questions } = get();
    const correct = userAnswers.filter(a => a.isCorrect).length;
    const wrong = userAnswers.filter(a => !a.isCorrect).length;
    const unanswered = questions.length - userAnswers.length;
    const accuracy = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
    return { correct, wrong, unanswered, accuracy };
  }
}));