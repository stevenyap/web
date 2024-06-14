import * as RD from "../../../core/Data/RemoteData"
import type { ApiError } from "../Api"
import type * as Api from "../Api/User/Detail"
import type { AuthState } from "../State"
import { UserID } from "../../../core/App/User"

export type UserState = {
  userID: UserID | null
  data: RD.RemoteData<ApiError<Api.ErrorCode>, Api.Payload>
}

export function initUserState(): UserState {
  return {
    userID: null,
    data: RD.notAsked(),
  }
}

export function _UserState(
  state: AuthState,
  user: Partial<UserState>,
): AuthState {
  return { ...state, user: { ...state.user, ...user } }
}
