import { AuthState, State, mapAuthState } from "../State"
import * as PaginationData from "../../../core/Data/PaginationData"
import { Nat0 } from "../../../core/Data/Number/Nat"
import * as Api from "../Api/User/List"
import { type Action } from "../Action"
import { Cmd, cmd } from "../Cmd"
import { _UsersState } from "../State/Users"

export function onEnterRoute(state: State): [State, Cmd] {
  return mapAuthState((authState: AuthState) => {
    const { token, users } = authState

    return users.data._t === "NotAsked"
      ? [
          _UsersState(authState, { data: PaginationData.loading() }),
          [
            Api.call(token.unwrap(), {
              offset: Nat0,
              limit: users.limit,
            }).then((r) => usersResponse(r)),
          ],
        ]
      : [authState, cmd()]
  }, state)
}

function usersResponse(response: Api.Response): Action {
  return (state: State) =>
    mapAuthState((authState: AuthState) => {
      if (response._t === "Left") {
        return [
          _UsersState(authState, {
            data: PaginationData.failure(response.error),
          }),
          [],
        ]
      }
      return [
        _UsersState(authState, {
          data: PaginationData.appendNewData(
            authState.users.data,
            response.value,
            authState.users.limit,
          ),
        }),
        cmd(),
      ]
    }, state)
}
