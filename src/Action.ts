import { toRoute } from "./Route"
import { State, _PublicState } from "./State"

export type Cmd = Array<Promise<Action | null>>

export type Action = (s: State) => [State, Cmd]

export function onUrlChange(s: State): [State, Cmd] {
  return [
    _PublicState(s, {
      route: toRoute(window.location.href),
    }),
    [],
  ]
}
