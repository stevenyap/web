import { toUrl } from "./Route"
import { State, _PublicState, initAuthState } from "./State"
import * as Toast from "./State/Toast"
import * as Modal from "./State/Modal"
import * as LocalStorage from "./Data/LocalStorage"
import * as ApiProfile from "./Api/Profile"
import { navigateTo, onUrlChange } from "./Action/Route"
import { perform, Cmd } from "./Cmd"

export type Action = (s: State) => [State, Cmd]

export function initCmd(): Cmd {
  const token = LocalStorage.getToken()
  return token != null
    ? [
        ApiProfile.call(token.unwrap()).then((r) =>
          profileResponse(token.unwrap(), r),
        ),
      ]
    : []
}

function profileResponse(token: string, response: ApiProfile.Response): Action {
  return (state: State) => {
    if (response._t === "Left") {
      LocalStorage.removeToken()
      return [{ ...state, _t: "Public" }, []]
    }
    const fullState = initAuthState(token, response.value, state)
    return onUrlChange(fullState)
  }
}

export function logout(): Action {
  return (state: State) => {
    LocalStorage.removeToken()
    return [
      { ...state, _t: "Public" },
      [perform(navigateTo(toUrl({ _t: "Login" })))],
    ]
  }
}

export function addToast(toast: Toast.Toast): Action {
  return (state: State) => {
    return [Toast.add(state, toast), []]
  }
}

export function removeToast(toast: Toast.Toast): Action {
  return (state: State) => {
    return [Toast.remove(state, toast), []]
  }
}

export function pushModal(modal: Modal.Modal): Action {
  return (state: State) => {
    return [Modal.push(state, modal), []]
  }
}

export function popModal(): Action {
  return (state: State) => {
    return [Modal.pop(state), []]
  }
}
