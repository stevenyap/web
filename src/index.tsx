import "normalize.css"
import React from "react"
import { flushSync } from "react-dom"
import { createRoot } from "react-dom/client"
import * as State from "./State"
import * as Action from "./Action"
import * as Route from "./Action/Route"
import * as Runtime from "./Runtime"
import View from "./View"
import { setEmit } from "./emit"

const rootElement = document.getElementById("app")
if (rootElement == null) {
  throw new Error("Cannot find root element")
}
const root = createRoot(rootElement)
function render(state: State.State): void {
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
export const emit = Runtime.start(State.init(), Action.initCmd(), render)
setEmit(emit)

// Subscriptions
window.onpopstate = () => emit(Route.onUrlChange)
