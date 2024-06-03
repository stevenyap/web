import { toRoute } from "./Route"
import { State, _PublicState } from "./State"
import * as RemoteData from "../../core/data/RemoteData"
import { createEmail } from "../../core/data/user/Email"
import { fromMaybe } from "../../core/data/Maybe"
import { createPassword } from "../../core/data/user/Password"
import * as LocalStorage from "./Data/LocalStorage"
import * as ApiProfile from "./Api/Profile"
import * as ApiLogin from "./Api/Login"

export type Cmd = Array<Promise<Action | null>>

export type Action = (s: State) => [State, Cmd]

export function init(): Cmd {
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

    const authState = { token, user: response.value }
    return [{ ...state, _t: "Auth", authState }, []]
  }
}

export function onUrlChange(state: State): [State, Cmd] {
  return [
    _PublicState(state, {
      route: toRoute(window.location.href),
    }),
    [],
  ]
}

export function loginChangeEmail(email: string): Action {
  return (s: State) => {
    return [
      _PublicState(s, {
        login: { ...s.publicState.login, email },
      }),
      [],
    ]
  }
}

export function loginChangePassword(password: string): Action {
  return (s: State) => {
    return [
      _PublicState(s, {
        login: { ...s.publicState.login, password },
      }),
      [],
    ]
  }
}

export function loginSubmit(state: State): [State, Cmd] {
  const { login } = state.publicState
  const email = fromMaybe(createEmail(login.email))
  const password = fromMaybe(createPassword(login.password))
  if (email == null || password == null) return [state, []]

  return [
    _PublicState(state, {
      login: { ...login, data: RemoteData.loading() },
    }),
    [ApiLogin.call({ email, password }).then((r) => loginResponse(r))],
  ]
}

function loginResponse(response: ApiLogin.Response): Action {
  return (state: State) => {
    const { login } = state.publicState
    if (response._t === "Left") {
      return [
        _PublicState(state, {
          login: { ...login, data: RemoteData.failure(response.error) },
        }),
        [],
      ]
    }

    const { token, user } = response.value
    const { publicState } = _PublicState(state, {
      login: { ...login, data: RemoteData.notAsked() },
    })
    LocalStorage.setToken(token)

    return [{ _t: "Auth", publicState, authState: { token, user } }, []]
  }
}
