export type Toast = {
  text: string
  icon: "Success" | "Error" | "Loading" | null
}

export function addSuccess(text: string, toasts: Toast[]): Toast[] {
  return add(success(text), toasts)
}

export function addError(text: string, toasts: Toast[]): Toast[] {
  return add(error(text), toasts)
}

export function addInfo(text: string, toasts: Toast[]): Toast[] {
  return add(info(text), toasts)
}

export function add(toast: Toast, toasts: Toast[]): Toast[] {
  const filtered = toasts.filter(
    (currentMessage) => currentMessage.text !== toast.text,
  )
  return [...filtered, toast]
}

export function remove(toast: Toast, toasts: Toast[]): Toast[] {
  return toasts.filter((currentMessage) => currentMessage.text !== toast.text)
}

export function success(text: string): Toast {
  return { icon: "Success", text }
}

export function error(text: string): Toast {
  return { icon: "Error", text }
}

export function info(text: string): Toast {
  return { icon: null, text }
}

export function loading(text: string): Toast {
  return { icon: "Loading", text }
}
