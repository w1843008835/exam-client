import { ofetch } from "ofetch"
import type { ApiResponse ,LoginDTO,LoginVO} from "@/types"
import { post, get } from "@/utils/request"
import { USER_ID, USER_NAME } from "@/constant/const"

/** 登录 */
export async function login(params: LoginDTO): Promise<LoginVO> {
  const data = await post<LoginVO>("/api/auth/login", params)
  // 存储 Token
  localStorage.setItem(USER_ID, data.userId.toString())
  localStorage.setItem(USER_NAME, data.userName)
  return data
}