import { ofetch } from "ofetch"
import type { FetchOptions } from "ofetch"
import { toast, notify } from "@/utils/toast"
import type { ApiResponse } from "@/types/index"
import { BusinessCode } from "@/types/index"

// Token 刷新状态管理
let isRefreshing = false
let pendingRequests: Array<(token: string) => void> = []

/**
 * 创建 ofetch 实例,配置 baseURL 和请求/响应拦截
 */
const request = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,


  // 响应拦截:HTTP 层面错误处理，使用右侧 notify 提示
  async onResponseError({ response }) {
    const data = response._data as ApiResponse | undefined
    const message = data?.message || `请求失败 (${response.status})`
    notify.error("请求失败", message)
    throw new Error(message)
  },

  // 请求拦截:网络层错误处理（如服务器未启动、CORS 错误等）
  async onRequestError({ error }) {
    const message = error.message || "网络连接失败，请检查网络或服务器状态"
    notify.error("网络异常", message)
    throw new Error(message)
  },
})

/**
 * 泛型请求方法:解析 ApiResponse<T>,code 为 200 返回 data,否则抛出 Error
 * 包含 Token 无感刷新逻辑：当 code=10103(Token过期) 时自动用 RefreshToken 刷新后重试
 */
async function handleResponse<T>(response: ApiResponse<T>, url: string, options: FetchOptions<"json">): Promise<T> {
  // 如果响应不是 ApiResponse 格式（没有 code 字段），直接返回原始数据
  if (response?.code === undefined) {
    return response as T
  }

  if (response.code === BusinessCode.SUCCESS) {
    return response.data
  }

  
  // 针对 401(未授权) / 10111(RefreshToken无效) / 10107(未登录): 直接清除认证信息并跳转首页
  if (
    response.code === BusinessCode.UNAUTHORIZED ||
    response.code === BusinessCode.REFRESH_TOKEN_INVALID ||
    response.code === BusinessCode.NOT_LOGIN
  ) {

    const errorMsg = response.message || "登录已过期，请重新登录"
    toast.error(errorMsg)
    if (import.meta.env.DEV) {
      console.warn(`[Auth] ${errorMsg}, code: ${response.code}, redirecting to /`)
    }
    // 延迟跳转，让用户看到错误提示
    setTimeout(() => {
      window.location.href = "/"
    }, 1500)
    return Promise.reject(new Error(errorMsg))
  }

  // 其他业务错误:toast 提示后端返回的 message
  const message = response.message || "请求失败"
  toast.error(message)
  throw new Error(message)
}

/**
 * GET 请求
 */
export async function get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  const response = await request<ApiResponse<T>>(url, { method: "GET", params })
  return handleResponse<T>(response, url, { method: "GET", params } as FetchOptions<"json">)
}

/**
 * POST 请求
 */
export async function post<T>(url: string, body?: object | null): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await request<ApiResponse<T>>(url, { method: "POST", body: body as Record<string, any> })
  return handleResponse<T>(response, url, { method: "POST", body } as FetchOptions<"json">)
}

/**
 * PUT 请求
 */
export async function put<T>(url: string, body?: object | null): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await request<ApiResponse<T>>(url, { method: "PUT", body: body as Record<string, any> })
  return handleResponse<T>(response, url, { method: "PUT", body } as FetchOptions<"json">)
}

/**
 * DELETE 请求
 */
export async function del<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  const response = await request<ApiResponse<T>>(url, { method: "DELETE", params })
  return handleResponse<T>(response, url, { method: "DELETE", params } as FetchOptions<"json">)
}

/**
 * DELETE 请求（带 JSON body）
 */
export async function delWithBody<T>(url: string, body?: object | null): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await request<ApiResponse<T>>(url, { method: "DELETE", body: body as Record<string, any> })
  return handleResponse<T>(response, url, { method: "DELETE", body } as FetchOptions<"json">)
}


export { request }
export default request
