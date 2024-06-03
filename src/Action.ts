import { toUrl } from "./Route"
import {
  State,
  _Login,
  _PublicState,
  _Toast,
  _UserState,
  _UsersState,
} from "./State"
import * as Toast from "./Data/Toast"
import * as LocalStorage from "./Data/LocalStorage"
import * as ApiProfile from "./Api/Profile"
import { navigateTo, onUrlChange } from "./Action/Route"
import { initFullState } from "./Action/Login"

export type Cmd = Array<Promise<Action | null>>

export type Action = (s: State) => [State, Cmd]

export function initCmd(): Cmd {
  const token = LocalStorage.getToken()
  return token != null
    ? [ApiProfile.call(token).then((r) => profileResponse(token, r))]
    : []
}

function profileResponse(token: string, response: ApiProfile.Response): Action {
  return (state: State) => {
    if (response._t === "Left") {
      LocalStorage.removeToken()
      return [{ _t: "Public", publicState: state.publicState }, []]
    }
    const fullState = initFullState(token, response.value, state.publicState)
    return onUrlChange(fullState)
  }
}

export function logout(): Action {
  return (state: State) => {
    LocalStorage.removeToken()
    return [
      { _t: "Public", publicState: state.publicState },
      [Promise.resolve(navigateTo(toUrl({ _t: "Login" })))],
    ]
  }
}

export function removeToast(toast: Toast.Toast): Action {
  return (state: State) => {
    return [
      _PublicState(state, {
        toasts: Toast.remove(toast, state.publicState.toasts),
      }),
      [],
    ]
  }
}
