import { create } from 'zustand';
import { Exam, Question, UserAnswer, User, ExamAnswer, QuestionDetailDto } from '../types';
import { getExamDetail } from '../service/examService';

/** 判断作答是否正确（忽略选项顺序） */
function isAnswerCorrect(selected: string[], correct: string[]): boolean {
  if (selected.length !== correct.length) return false;
  const s = [...selected].sort();
  const c = [...correct].sort();
  return s.every((v, i) => v === c[i]);
}

interface ExamStore {
  user: User | null;
  currentExam: Exam | null;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: ExamAnswer[];
  isCompleted: boolean;
  answerCard: UserAnswer ;
  questionDetail: Question ;
  exam: Exam ;
  login: (username: string, token: string) => void;
  logout: () => void;
  setAnswerCard: (answerCard: UserAnswer) => void;
  setQuestionDetail: (questionDetail: Question) => void;
  setExam:(exam: Exam) => void;
 
  setCurrentExam: (exam: Exam | null) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addUserAnswer: (questionId: number, selectedOption: string[], isCorrect: boolean) => void;
  /**
   * 请求题目详情（POST /api/exam/question）
   * 下一题/上一题/答题卡跳题 共用，请求成功后用后端返回的 userAnswer 同步 userAnswers
   */
  fetchQuestionDetail: (param: QuestionDetailDto) => Promise<Question>;
  setIsCompleted: (completed: boolean) => void;
  resetExam: () => void;
  getAnswerStatus: (questionId: number) => 'correct' | 'wrong' | 'unanswered';
  getStatistics: () => { correct: number; wrong: number; unanswered: number; accuracy: number };
}

export const useExamStore = create<ExamStore>((set, get) => ({
  user: null,
  currentExam: null,
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  isCompleted: false,
  answerCard: null,
  questionDetail: null,
  exam: null,

  login: (username, token) => set({ user: { username, token } }),

  logout: () => set({ user: null }),
  setAnswerCard: (answerCard) => set({ answerCard }),
  setQuestionDetail: (questionDetail) => set({ questionDetail }),
  setExam:(exam)=> set({ exam }),

  setCurrentExam: (exam) => set({ currentExam: exam }),

  setQuestions: (questions) => set({ questions }),


  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  addUserAnswer: (questionId: number, selectedOption: string[], isCorrect: boolean) => set((state) => {
    // 已答过则覆盖，未答过则追加
    const existingIndex = state.userAnswers.findIndex(a => a.questionId === questionId);
    const newAnswer: ExamAnswer = { questionId, selectedOption, isCorrect };
    const updatedAnswers = existingIndex >= 0
      ? state.userAnswers.map((a, i) => (i === existingIndex ? newAnswer : a))
      : [...state.userAnswers, newAnswer];

    const allAnswered = state.questions.length > 0
      && state.questions.every(q => updatedAnswers.some(a => a.questionId === q.questionId));
    return { userAnswers: updatedAnswers, isCompleted: allAnswered };
  }),

  fetchQuestionDetail: async (param: QuestionDetailDto) => {
    const detail = await getExamDetail(param);
    set({ questionDetail: detail });

    // 后端返回该题已作答内容，则同步进 userAnswers（已存在则覆盖）
    if (detail?.userAnswer) {
      const selectedArr = detail.userAnswer.split(',').filter(Boolean);
      const correctArr = (detail.correctAnswer || '').split(',').filter(Boolean);
      get().addUserAnswer(detail.questionId, selectedArr, isAnswerCorrect(selectedArr, correctArr));
    }
    return detail;
  },

  setIsCompleted: (completed) => set({ isCompleted: completed }),

  resetExam: () => set({
    currentQuestionIndex: 0,
    userAnswers: [],
    isCompleted: false
  }),


  getStatistics: () => {
    const { userAnswers, questions } = get();
    const correct = userAnswers.filter(a => a.isCorrect).length;
    const wrong = userAnswers.filter(a => !a.isCorrect).length;
    const unanswered = questions.length - userAnswers.length;
    const accuracy = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
    return { correct, wrong, unanswered, accuracy };
  }
}));