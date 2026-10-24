export interface Exam {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  examType: string;
}

export interface Question {
  questionId: number;
  sort: number;
  title: string;
  questionType: string;
  options: ChoiceDto[];
  correctAnswer: string;
  analysis: string;
  userAnswer?: string;
}
export interface ChoiceDto {
  label: string;
  value: string;
}

export interface UserAnswer {
  correct: number;
  incorrect:number;
  undo: number;
  options: UserAnswerOption[];
}
export interface UserAnswerOption {
  questionId: number;
  questionNumber:number;
  isCorrect: string;
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
/**
 * 后端统一响应类型
 */
export interface ApiResponse<T = unknown> {
  /** 业务状态码,200 表示成功 */
  code: BusinessCode
  /** 提示信息 */
  message: string
  /** 实际业务数据 */
  data: T
}

/**
 * 业务状态码常量(从后端枚举转换)
 * 使用 as const 对象替代 enum,兼容 erasableSyntaxOnly
 */
export const BusinessCode = {
  // 成功
  SUCCESS: 200,

  // 通用错误
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_METHOD: 405,
  INTERNAL_ERROR: 500,

  // 参数模块 10000-10099
  PARAM_MISSING: 10000,
  DATA_NOT_EXIST: 10001,
  PARAMS_ERROR: 10002,

  // 用户模块 10100-10199
  USER_NOT_FOUND: 10100,
  PASSWORD_ERROR: 10101,
  TOKEN_INVALID: 10102,
  TOKEN_EXPIRED: 10103,
  USER_IS_EXITS: 10104,
  ACCOUNT_DISABLED: 10105,
  CODE_ERROR: 10106,
  NOT_LOGIN: 10107,
  NO_PERMISSION: 10109,
  REFRESH_TOKEN_INVALID: 10111,
} as const

export type BusinessCode = (typeof BusinessCode)[keyof typeof BusinessCode]

/** 登录请求参数 */
export interface LoginDTO {
  username: string
  password: string
}
export interface LoginVO {
  userId: number
  userName: string
  token: string
}

export interface QuestionDetailDto {
  userId: number
  questionNumber: number
  examType: string
  userAnswer: string
}

/** 用户作答记录（前端本地维护，与接口返回的 UserAnswer 区分） */
export interface ExamAnswer {
  /** 题目 ID */
  questionId: number
  /** 已选选项 */
  selectedOption: string[]
  /** 是否答对 */
  isCorrect: boolean
}

