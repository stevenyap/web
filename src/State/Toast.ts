import type { State } from "../State"

export type Toast = {
  text: string
  icon: "Success" | "Error" | "Loading" | "None"
}

export function success(text: string): Toast {
  return { icon: "Success", text }
}

export function error(text: string): Toast {
  return { icon: "Error", text }
}

export function info(text: string): Toast {
  return { icon: "None", text }
}

export function loading(text: string): Toast {
  return { icon: "Loading", text }
}

export function add(state: State, toast: Toast): State {
  return { ...state, toasts: add_(toast, state.toasts) }
}

export function remove(state: State, toast: Toast): State {
  return { ...state, toasts: remove_(toast, state.toasts) }
}

// Internal

function add_(toast: Toast, toasts: Toast[]): Toast[] {
  const filtered = toasts.filter(
    (currentMessage) => currentMessage.text !== toast.text,
  )
  return [...filtered, toast]
}

function remove_(toast: Toast, toasts: Toast[]): Toast[] {
  return toasts.filter((currentMessage) => currentMessage.text !== toast.text)
}
