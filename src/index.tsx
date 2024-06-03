import "normalize.css"
import React from "react"
import { flushSync } from "react-dom"
import { createRoot } from "react-dom/client"
import { State, init } from "./State"
import * as Runtime from "./Runtime"
import View from "./View"
import { onUrlChange } from "./Action"
import { setEmit } from "./emit"

const rootElement = document.getElementById("app")
if (rootElement == null) {
  throw new Error("Cannot find root element")
}
const root = createRoot(rootElement)
function render(state: State): void {
  // React does batch rendering instead of rendering synchronously
  // Hence we force React to render synchronously here on every state update
  flushSync(() => {
    root.render(
      <React.StrictMode>
        <View state={state} />
      </React.StrictMode>,
    )
  })
}

// Export out the emit function
const [initState, initCmd] = init()
export const emit = Runtime.start(initState, initCmd, render)
setEmit(emit)

// Subscriptions
window.onpopstate = () => emit(onUrlChange)
