export interface Exam {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  coverImage: string;
}

export interface Question {
  id: string;
  examId: string;
  stem: string;
  options: Record<string, string>;
  correctAnswer: string[];
  explanation: string;
  questionType: number;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: string[];
  isCorrect: boolean;
}

export interface ExamState {
  currentExam: Exam | null;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  isCompleted: boolean;
}

export interface User {
  username: string;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}