import type { EmitFn, Action } from "./Runtime"
import type { State } from "./State"

// Due to cyclic dependencies between Runtime and View,
// we have to do this trick to allow View to import emit
// This also resolves Runtime<S> and emit<State>
export let emit: EmitFn<State> = (action: Action<State>) => {
  pendingActions.push(action)
}

const pendingActions: Action<State>[] = []
let hasSetEmit: boolean = false
export function setEmit(e: EmitFn<State>): void {
  if (hasSetEmit === true) {
    throw new Error("You cannot setEmit more than once.")
  }

  emit = e
  hasSetEmit = true
  pendingActions.forEach(emit)
}
