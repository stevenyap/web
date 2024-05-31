import { Action } from "./Action"
import { Cmd } from "./Program"

export function init(): [State, Cmd] {
  const publicState: PublicState = { login: "Iker" }
  return [{ _t: "Public", publicState }, []]
}

export function update(state: State, action: Action): [State, Cmd] {
  switch (action._t) {
    case "OnUrlChange":
      return [state, []]
  }
}

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
  login: string
}

export type AuthState = {
  login: string
}
