import { toUrl } from "../Route"
import {
  AuthState,
  FullState,
  PublicState,
  State,
  UserState,
  UsersState,
  _Login,
  _PublicState,
  _Toast,
  _UserState,
  _UsersState,
} from "../State"
import * as RemoteData from "../../../core/data/RemoteData"
import { createEmail } from "../../../core/data/user/Email"
import { fromMaybe } from "../../../core/data/Maybe"
import { createPassword } from "../../../core/data/user/Password"
import { positiveInt } from "../../../core/data/PositiveInt"
import * as PaginationData from "../../../core/data/PaginationData"
import { User } from "../../../core/app/User"
import { navigateTo } from "./Route"
import * as LocalStorage from "../Data/LocalStorage"
import * as Toast from "../Data/Toast"
import * as ApiLogin from "../Api/Login"
import type { Action, Cmd } from "../Action"

export function loginChangeEmail(email: string): Action {
  return (state: State) => {
    return [_Login(state, { email }), []]
  }
}

export function loginChangePassword(password: string): Action {
  return (state: State) => {
    return [_Login(state, { password }), []]
  }
}

export function loginSubmit(state: State): [State, Cmd] {
  const { login } = state.publicState
  const email = fromMaybe(createEmail(login.email))
  const password = fromMaybe(createPassword(login.password))
  if (email == null || password == null) return [state, []]

  return [
    _Login(state, { data: RemoteData.loading() }),
    [ApiLogin.call({ email, password }).then((r) => loginResponse(r))],
  ]
}

function loginResponse(response: ApiLogin.Response): Action {
  return (state: State) => {
    if (response._t === "Left") {
      const toastState = _Toast(
        state,
        Toast.addError(
          ApiLogin.errorString(response.error),
          state.publicState.toasts,
        ),
      )

      return [
        _Login(toastState, { data: RemoteData.failure(response.error) }),
        [],
      ]
    }

    const { token, user: profile } = response.value
    const toastState = _Toast(
      state,
      Toast.addSuccess("Login successfully!", state.publicState.toasts),
    )
    const updatedState = _Login(toastState, {
      email: "",
      password: "",
      data: RemoteData.notAsked(),
    })

    return [
      initFullState(token, profile, updatedState.publicState),
      [Promise.resolve(navigateTo(toUrl({ _t: "Home" })))],
    ]
  }
}

export function initFullState(
  token: string,
  profile: User,
  publicState: PublicState,
): FullState {
  LocalStorage.setToken(token)
  const limit = positiveInt(20)

  const users: UsersState = {
    limit,
    lastID: null,
    data: PaginationData.notAsked(),
  }

  const user: UserState = {
    userID: null,
    data: RemoteData.notAsked(),
  }

  const authState: AuthState = { token, profile, users, user }
  return { _t: "Auth", publicState, authState }
}
