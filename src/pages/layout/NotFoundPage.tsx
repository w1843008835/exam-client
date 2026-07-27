import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-6 text-center">
        <FileQuestion className="h-20 w-20 text-muted-foreground" />
        <h1 className="text-7xl font-bold tracking-tight">404</h1>
        <p className="text-lg text-muted-foreground">
          抱歉，您访问的页面不存在
        </p>
      </div>
    </div>
  )
}
