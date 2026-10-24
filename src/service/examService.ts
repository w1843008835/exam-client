import { ofetch } from "ofetch"
import type { ApiResponse ,LoginDTO,Exam,Question,UserAnswer} from "@/types"
import { post, get } from "@/utils/request"
import { USER_ID, USER_NAME } from "@/constant/const"


export async function getExamList(): Promise<Exam[]> {
  const data = await get<Exam[]>("/api/exam/tiku")
  return data
}

export async function getExamDetail(param): Promise<Question> {
  const data = await post<Question>("/api/exam/question", param)
  return data
}

export async function getAnswerCard(examType): Promise<UserAnswer> {
  const data = await get<UserAnswer>("/api/exam/answerCard/"+examType)
  return data
}

/**
 * 清空重做：清除该用户在此题库下的全部答题记录
 */
export async function resetExam(param: { userId: number; examType: string }): Promise<void> {
  await post<void>("/api/exam/reset", param)
}
