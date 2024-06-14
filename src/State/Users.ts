import { Nat, Nat0 } from "../../../core/Data/Number/Nat"
import {
  PositiveInt,
  PositiveInt20,
} from "../../../core/Data/Number/PositiveInt"
import * as PD from "../../../core/Data/PaginationData"
import type { ApiError } from "../Api"
import type * as Api from "../Api/User/List"
import type { AuthState } from "../State"

export type UsersState = {
  limit: PositiveInt
  offset: Nat
  data: PD.PaginationData<ApiError<Api.ErrorCode>, Api.Payload>
}

export function initUsersState(): UsersState {
  return {
    limit: PositiveInt20,
    offset: Nat0,
    data: PD.notAsked(),
  }
}

export function _UsersState(
  state: AuthState,
  users: Partial<UsersState>,
): AuthState {
  return { ...state, users: { ...state.users, ...users } }
}
