import "normalize.css"
import React from "react"
import { flushSync } from "react-dom"
import { createRoot } from "react-dom/client"
import * as State from "./State"
import * as Route from "./Route"
import * as Action from "./Action"
import * as ActionRoute from "./Action/Route"
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
const route = Route.toRoute(window.location.href)
const state = State.init(route)
const cmd = Action.initCmd()
export const emit = Runtime.start(state, cmd, render)
setEmit(emit)

// Subscriptions
window.onpopstate = () => emit(ActionRoute.onUrlChange)
