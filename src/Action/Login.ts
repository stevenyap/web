import { toUrl } from "../Route"
import { State, initAuthState } from "../State"
import * as RemoteData from "../../../core/Data/RemoteData"
import { createEmail } from "../../../core/Data/User/Email"
import { fromMaybe } from "../../../core/Data/Maybe"
import { createPassword } from "../../../core/Data/User/Password"
import { navigateTo } from "./Route"
import * as Api from "../Api/Login"
import { type Action } from "../Action"
import * as Toast from "../State/Toast"
import { Cmd, cmd, perform } from "../Cmd"
import { _LoginState, initLoginState } from "../State/Login"

export function changeEmail(email: string): Action {
  return (state: State) => {
    return [_LoginState(state, { email }), cmd()]
  }
}

export function changePassword(password: string): Action {
  return (state: State) => {
    return [_LoginState(state, { password }), cmd()]
  }
}

export function submit(state: State): [State, Cmd] {
  const { login } = state
  const email = fromMaybe(createEmail(login.email))
  const password = fromMaybe(createPassword(login.password))
  if (email == null || password == null) return [state, cmd()]

  return [
    _LoginState(state, { data: RemoteData.loading() }),
    [Api.call({ email, password }).then((r) => submitResponse(r))],
  ]
}

function submitResponse(response: Api.Response): Action {
  return (state: State) => {
    if (response._t === "Left") {
      const toastState = Toast.add(
        state,
        Toast.error(Api.errorString(response.error)),
      )

      return [
        _LoginState(toastState, {
          data: RemoteData.failure(response.error),
        }),
        cmd(),
      ]
    }

    const { token, user: profile } = response.value
    const toastState = Toast.add(state, Toast.success("Login successfully!"))
    const loginState = _LoginState(toastState, initLoginState())
    return [
      initAuthState(token, profile, loginState),
      cmd(perform(navigateTo(toUrl({ _t: "Home" })))),
    ]
  }
}
