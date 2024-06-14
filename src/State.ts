import type { User } from "../../core/App/User"
import * as LocalStorage from "./Data/LocalStorage"
import * as Toast from "./State/Toast"
import * as Modal from "./State/Modal"
import type { Route } from "./Route"
import { Token, createToken } from "./Data/LocalStorage"
import { Cmd } from "./Cmd"
import { LoginState, initLoginState } from "./State/Login"
import { UsersState, initUsersState } from "./State/Users"
import { UserState, initUserState } from "./State/User"

export type State = PublicState | AuthState

export type PublicState = {
  _t: "Public" | "LoadingAuth"
  route: Route
  login: LoginState
  toasts: Toast.Toast[]
  modals: Modal.Modals
}

export type AuthState = Omit<PublicState, "_t"> & {
  _t: "Auth"
  token: Token
  profile: User
  users: UsersState
  user: UserState
}

export function init(route: Route): State {
  const token = LocalStorage.getToken()
  const login = initLoginState()
  return {
    _t: token == null ? "Public" : "LoadingAuth",
    route,
    login,
    toasts: [],
    modals: Modal.init(),
  }
}

export function initAuthState(
  token: string,
  profile: User,
  state: State,
): AuthState {
  LocalStorage.setToken(token)
  const users = initUsersState()
  const user = initUserState()
  return {
    ...state,
    _t: "Auth",
    token: createToken(token),
    profile,
    users,
    user,
  }
}

export function _PublicState(
  state: State,
  publicState: Partial<PublicState>,
): State {
  return { ...state, ...publicState }
}

export function _AuthState(
  fn: (authState: AuthState) => [State, Cmd],
  state: State,
): [State, Cmd] {
  return state._t === "Auth" ? fn(state) : [state, []]
}

export function mapAuthState(
  fn: (state: AuthState) => [State, Cmd],
  state: State,
): [State, Cmd] {
  if (state._t !== "Auth") return [state, []]
  return fn(state)
}
