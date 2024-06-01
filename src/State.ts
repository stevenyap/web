import { User } from "../../core/app/User"
import * as RemoteData from "../../core/data/RemoteData"
import type { Action, Cmd } from "./Action"
import { ApiError } from "./Api"
import * as LocalStorage from "./Data/LocalStorage"
import { Route, toRoute } from "./Route"
import * as ApiProfile from "./Api/Profile"
import * as ApiLogin from "./Api/Login"

export type State =
  | {
      _t: "Public"
      publicState: PublicState
    }
  | {
      _t: "LoadingAuth"
      publicState: PublicState
    }
  | FullState

export type FullState = {
  _t: "Auth"
  publicState: PublicState
  authState: AuthState
}

export type PublicState = {
  route: Route
  login: LoginState
}

export type LoginState = {
  email: string
  password: string
  data: RemoteData.RemoteData<ApiError<ApiLogin.ErrorCode>, ApiLogin.Payload>
}

export type AuthState = {
  token: string
  user: User
}

export function init(): [State, Cmd] {
  const token = LocalStorage.getToken()

  const cmd =
    token != null
      ? [ApiProfile.call(token).then((r) => profileResponse(token, r))]
      : []

  const login: LoginState = {
    email: "",
    password: "",
    data: RemoteData.notAsked(),
  }

  const publicState: PublicState = {
    route: toRoute(window.location.href),
    login,
  }

  return [{ _t: token == null ? "Public" : "LoadingAuth", publicState }, cmd]
}

function profileResponse(token: string, response: ApiProfile.Response): Action {
  return (state: State) => {
    if (response._t === "Left") {
      LocalStorage.removeToken()
      return [{ _t: "Public", publicState: state.publicState }, []]
    }

    const authState = { token, user: response.value }
    return [{ ...state, _t: "Auth", authState }, []]
  }
}

export function update(state: State, action: Action): [State, Cmd] {
  return action(state)
}

export function _PublicState(
  state: State,
  publicState: Partial<PublicState>,
): State {
  return { ...state, publicState: { ...state.publicState, ...publicState } }
}
