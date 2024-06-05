import * as RemoteData from "../../core/Data/RemoteData"
import * as PaginationData from "../../core/Data/PaginationData"
import type { User } from "../../core/App/User"
import type { PositiveInt } from "../../core/Data/PositiveInt"
import * as LocalStorage from "./Data/LocalStorage"
import * as Toast from "./Data/Toast"
import type * as ApiLogin from "./Api/Login"
import type * as ApiUserList from "./Api/User/List"
import type * as ApiUserDetail from "./Api/User/Detail"
import type { Cmd } from "./Action"
import type { Route } from "./Route"
import type { ApiError } from "./Api"

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
  toasts: Toast.Toast[]
}

export type LoginState = {
  email: string
  password: string
  data: RemoteData.RemoteData<ApiError<ApiLogin.ErrorCode>, ApiLogin.Payload>
}

export type AuthState = {
  token: string
  profile: User
  users: UsersState
  user: UserState
}

export type UsersState = {
  limit: PositiveInt
  lastID: PositiveInt | null
  data: PaginationData.PaginationData<
    ApiError<ApiUserList.ErrorCode>,
    ApiUserList.Payload
  >
}

export type UserState = {
  userID: PositiveInt | null
  data: RemoteData.RemoteData<
    ApiError<ApiUserDetail.ErrorCode>,
    ApiUserDetail.Payload
  >
}

export function init(route: Route): State {
  const token = LocalStorage.getToken()

  const login: LoginState = {
    email: "",
    password: "",
    data: RemoteData.notAsked(),
  }

  const publicState: PublicState = {
    route,
    login,
    toasts: [],
  }

  return { _t: token == null ? "Public" : "LoadingAuth", publicState }
}

export function _PublicState(
  state: State,
  publicState: Partial<PublicState>,
): State {
  return { ...state, publicState: { ...state.publicState, ...publicState } }
}

export function _AuthState(
  state: FullState,
  authState: Partial<AuthState>,
): State {
  return { ...state, authState: { ...state.authState, ...authState } }
}

export function mapFullState(
  fn: (state: FullState) => [State, Cmd],
  state: State,
): [State, Cmd] {
  if (state._t !== "Auth") return [state, []]
  return fn(state)
}

export function _Toast(state: State, toasts: Toast.Toast[]): State {
  return { ...state, publicState: { ...state.publicState, toasts } }
}

export function _Login(state: State, login: Partial<LoginState>): State {
  return {
    ...state,
    publicState: {
      ...state.publicState,
      login: { ...state.publicState.login, ...login },
    },
  }
}

export function _UsersState(
  state: FullState,
  users: Partial<UsersState>,
): State {
  return {
    ...state,
    authState: {
      ...state.authState,
      users: { ...state.authState.users, ...users },
    },
  }
}

export function _UserState(state: FullState, user: Partial<UserState>): State {
  return {
    ...state,
    authState: {
      ...state.authState,
      user: { ...state.authState.user, ...user },
    },
  }
}
