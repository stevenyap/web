import type { State } from "./State"
import type { Action } from "./Action"
import { flushSync } from "react-dom"

// Fundamental:
// - Couple Program with App Types so we can have init + update functions
// - We can init the state when the app was started
// - We export inject for injecting render function to Program
// - We export emit function which to allow view to send cmd
// - You should not trigger emit in state files

// Life cycle:
// Init -> [initState, initCmd] -> inject render -> render base on [initState, initCmd]
// Emit -> Action -> update -> [newState, newCmd] -> render base on [newState, newCmd]

// Side effect:
// - Developer can call emit before injecting render
// - Which will show an error message in browser
// - BUT the state is still update base on that emit Action

export type Cmd = Array<Promise<Action | null>>
export type Program = {
  update: (state: State, action: Action) => [State, Cmd]
  render: (state: State) => void
}

// Mutable program, state and render functions
let mutableState: State | null = null
const program: Program = {
  update: (state: State, _action: Action) => [state, []],
  render: () => <code>Error: call `inject` before you render.</code>,
}

/** Entry point to start running the program */
export function run(initState: State, initCmd: Cmd, p: Program): void {
  mutableState = initState
  program.update = p.update
  program.render = p.render
  updateAndRender([initState, initCmd])
}

/** emit an Action back to the update function and re-render the view */
export function emit(a: Action | null): void {
  if (a != null && mutableState != null)
    updateAndRender(program.update(mutableState, a))
}

// Set state - Run cmd - Render
function updateAndRender([state, cmds]: [State, Cmd]): void {
  mutableState = state
  cmds.forEach((cmd) => {
    cmd.then((action) => emit(action)).catch((e) => console.error(e))
  })

  // React does batch rendering instead of rendering synchronously
  // Hence we force React to render synchronously here on every state update
  flushSync(() => program.render(state))
}
