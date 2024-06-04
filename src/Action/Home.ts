import {
  FullState,
  State,
  _Login,
  _PublicState,
  _Toast,
  _UserState,
  _UsersState,
  mapFullState,
} from "../State"
import * as PaginationData from "../../../core/data/PaginationData"
import * as ApiUserList from "../Api/User/List"
import type { Action, Cmd } from "../Action"

export function onEnterRoute(state: State): [State, Cmd] {
  return mapFullState((fullState: FullState) => {
    const { token, users } = fullState.authState

    return users.data._t === "NotAsked"
      ? [
          _UsersState(fullState, { data: PaginationData.loading() }),
          [
            ApiUserList.call(token, { lastID: null, limit: users.limit }).then(
              (r) => usersResponse(r),
            ),
          ],
        ]
      : [fullState, []]
  }, state)
}

function usersResponse(response: ApiUserList.Response): Action {
  return (state: State) =>
    mapFullState((fullState: FullState) => {
      if (response._t === "Left") {
        return [
          _UsersState(fullState, {
            data: PaginationData.failure(response.error),
          }),
          [],
        ]
      }
      return [
        _UsersState(fullState, {
          data: PaginationData.appendNewData(
            fullState.authState.users.data,
            response.value,
            fullState.authState.users.limit,
          ),
        }),
        [],
      ]
    }, state)
}
