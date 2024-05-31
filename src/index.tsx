import React from "react"
import { createRoot } from "react-dom/client"
import "normalize.css"
import { State, init, update } from "./State"
import * as Program from "./Program"
import View from "./View"
import { onUrlChange } from "./Action"

window.onpopstate = () => Program.emit(onUrlChange)

const rootElement = document.getElementById("app")
if (rootElement == null) {
  throw new Error("Cannot find root element")
}
const root = createRoot(rootElement)
function render(state: State): void {
  root.render(
    <React.StrictMode>
      <View state={state} />
    </React.StrictMode>,
  )
}

function runProgram(): void {
  const [initState, initCmd] = init()
  Program.run(initState, initCmd, { update, render })
}

runProgram()
