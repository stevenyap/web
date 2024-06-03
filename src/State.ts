import { User } from "../../core/app/User"
import * as RemoteData from "../../core/data/RemoteData"
import * as LocalStorage from "./Data/LocalStorage"
import { Route, toRoute } from "./Route"
import type { ApiError } from "./Api"
import type * as ApiLogin from "./Api/Login"

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

export function init(): State {
  const token = LocalStorage.getToken()

  const login: LoginState = {
    email: "",
    password: "",
    data: RemoteData.notAsked(),
  }

  const publicState: PublicState = {
    route: toRoute(window.location.href),
    login,
  }

  return { _t: token == null ? "Public" : "LoadingAuth", publicState }
}

export function _PublicState(
  state: State,
  publicState: Partial<PublicState>,
): State {
  return { ...state, publicState: { ...state.publicState, ...publicState } }
}
