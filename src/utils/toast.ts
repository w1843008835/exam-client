import { message, Modal, notification } from "antd"
import type { ModalFuncProps } from "antd"

/**
 * 全局 loading message ID，用于关闭时精确销毁
 */
let loadingMsgId: ReturnType<typeof message.loading> | null = null

/** toast 可选参数 */
interface ToastOptions {
  /** 补充描述，会显示在主消息下方 */
  description?: string
}

/**
 * 将 content 和 description 合并为 antd message 的内容
 * antd message 不支持 description，所以用换行拼接
 */
function formatContent(content: string, options?: ToastOptions): string {
  if (options?.description) {
    return `${content}：${options.description}`
  }
  return content
}

/**
 * 统一 toast 封装，基于 antd message
 * 外部只通过此文件调用，不直接依赖 antd
 */
export const toast = {
  success: (content: string, options?: ToastOptions) => message.success(formatContent(content, options)),
  error: (content: string, options?: ToastOptions) => message.error(formatContent(content, options)),
  warning: (content: string, options?: ToastOptions) => message.warning(formatContent(content, options)),
  info: (content: string, options?: ToastOptions) => message.info(formatContent(content, options)),
  message: (content: string, options?: ToastOptions) => message.open({ content: formatContent(content, options) }),

  /**
   * 确认弹窗，基于 antd Modal.confirm
   * 替代原生 window.confirm（同步阻塞 → 异步回调）
   */
  confirm: (props: Omit<ModalFuncProps, "onOk" | "onCancel"> & {
    onOk?: () => void | Promise<void>
    onCancel?: () => void
  }) => {
    const { onOk, onCancel, ...rest } = props
    return Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      ...rest,
      onOk,
      onCancel,
    })
  },
}

/**
 * 右侧 notification 提示，用于浏览器级别 HTTP/网络错误
 * 与 toast 的区别：使用 antd notification（右上角通知框），视觉上更醒目
 * toast 使用 antd message（顶部横条），用于普通业务提示
 */
export const notify = {
  success: (msg: string, description?: string) =>
    notification.success({ message: msg, description, placement: "topRight" }),
  error: (msg: string, description?: string) =>
    notification.error({ message: msg, description, placement: "topRight" }),
  warning: (msg: string, description?: string) =>
    notification.warning({ message: msg, description, placement: "topRight" }),
  info: (msg: string, description?: string) =>
    notification.info({ message: msg, description, placement: "topRight" }),
}

/**
 * 显示全局 loading 提示
 * @param content 加载提示文案，默认"加载中..."
 */
export function showLoading(content = "加载中...") {
  if (loadingMsgId !== null) {
    loadingMsgId()
  }
  loadingMsgId = message.loading(content, 0)
}

/**
 * 关闭全局 loading 提示
 */
export function hideLoading() {
  if (loadingMsgId !== null) {
    loadingMsgId()
    loadingMsgId = null
  }
}
