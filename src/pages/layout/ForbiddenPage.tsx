import { ShieldAlert } from "lucide-react"

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-6 text-center">
        <ShieldAlert className="h-20 w-20 text-muted-foreground" />
        <h1 className="text-7xl font-bold tracking-tight">403</h1>
        <p className="text-lg text-muted-foreground">
          抱歉，您没有权限访问该页面
        </p>
      </div>
    </div>
  )
}
