import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

export default function ErrorPage() {
  const error = useRouteError()

  // 获取错误信息
  let errorMessage = "页面不存在或发生错误"
  let errorStatus = "Error"

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status === 404 ? "404" : String(error.status)
    errorMessage = error.status === 404
      ? "抱歉，您访问的页面不存在"
      : error.statusText || errorMessage
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  // 从 URL 参数获取业务错误信息
  const urlParams = new URLSearchParams(window.location.search)
  const msgFromUrl = urlParams.get("msg")

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 px-4">
      {/* 错误图标 */}
      <div className="mb-8">
        <div className="relative">
          {/* 背景圆形 */}
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-red-100 shadow-lg">
            {/* 错误图标 SVG */}
            <svg
              className="h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          {/* 装饰圆圈 */}
          <div className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-red-200 opacity-50" />
          <div className="absolute -bottom-1 -left-3 h-5 w-5 rounded-full bg-orange-200 opacity-60" />
        </div>
      </div>

      {/* 错误卡片 */}
      <Card className="w-full max-w-md border-slate-200 bg-white shadow-xl">
        <CardContent className="pt-8 pb-8 text-center">
          {/* 错误状态码 */}
          <h1 className="mb-2 text-7xl font-bold text-slate-200">
            {errorStatus}
          </h1>

          {/* 错误标题 */}
          <h2 className="mb-4 text-2xl font-semibold text-slate-800">
            {msgFromUrl ? "访问受限" : "出错了"}
          </h2>

          {/* 错误描述 */}
          <p className="mb-2 text-slate-500">
            {msgFromUrl
              ? decodeURIComponent(msgFromUrl)
              : errorMessage}
          </p>
        </CardContent>
      </Card>

      {/* 底部提示 */}
      <p className="mt-8 text-center text-sm text-slate-400">
        如果问题持续存在，请联系管理员
      </p>

      {/* 装饰性背景元素 */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-blue-100 opacity-30 blur-3xl" />
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-red-100 opacity-20 blur-3xl" />
      </div>
    </div>
  )
}