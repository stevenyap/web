import type { Action, Cmd } from "./Action"
import { Route, toRoute } from "./Route"

export type State =
  | {
      _t: "Public"
      publicState: PublicState
    }
  | {
      _t: "Auth"
      publicState: PublicState
    }

export type PublicState = {
  route: Route
}

export type AuthState = {
  login: string
}

export function init(): [State, Cmd] {
  const publicState: PublicState = { route: toRoute(window.location.href) }
  return [{ _t: "Public", publicState }, []]
}

export function update(state: State, action: Action): [State, Cmd] {
  return action(state)
}

export function _PublicState(
  s: State,
  publicState: Partial<PublicState>,
): State {
  return { ...s, publicState: { ...s.publicState, ...publicState } }
}
