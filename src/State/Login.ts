import * as RD from "../../../core/Data/RemoteData"
import type { ApiError } from "../Api"
import type { State } from "../State"
import type * as Api from "../Api/Login"

export type LoginState = {
  email: string
  password: string
  data: RD.RemoteData<ApiError<Api.ErrorCode>, Api.Payload>
}

export function initLoginState(): LoginState {
  return {
    email: "",
    password: "",
    data: RD.notAsked(),
  }
}

export function _LoginState(state: State, login: Partial<LoginState>): State {
  return { ...state, login: { ...state.login, ...login } }
}
