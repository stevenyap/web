import { BaseSyntheticEvent } from "react"
import { navigateTo } from "../Action/Route"
import { emit } from "../emit"

export function navigate(url: string, onClick?: () => void) {
  return {
    onClick: (e: BaseSyntheticEvent) => {
      emit(navigateTo(url))
      if (onClick) {
        onClick()
      }
      e.preventDefault()
    },
    href: url,
  }
}
