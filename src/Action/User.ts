import { AuthState, State, _AuthState, mapAuthState } from "../State"
import * as RemoteData from "../../../core/Data/RemoteData"
import * as ApiUserDetail from "../Api/User/Detail"
import type { Action } from "../Action"
import { UserID } from "../../../core/App/User"
import { Cmd } from "../Cmd"
import { _UserState } from "../State/User"

export function onEnterRoute(state: State, userID: UserID): [State, Cmd] {
  return _AuthState((authState: AuthState) => {
    const { token, user } = authState

    return user.userID !== userID || user.data._t !== "Success"
      ? [
          _UserState(authState, { data: RemoteData.loading() }),
          [
            ApiUserDetail.call(token.unwrap(), { userID }).then((r) =>
              userResponse(r),
            ),
          ],
        ]
      : [authState, []]
  }, state)
}

function userResponse(response: ApiUserDetail.Response): Action {
  return (state: State) =>
    mapAuthState((authState: AuthState) => {
      if (response._t === "Left") {
        return [
          _UserState(authState, {
            data: RemoteData.failure(response.error),
          }),
          [],
        ]
      }
      return [
        _UserState(authState, {
          data: RemoteData.success(response.value),
        }),
        [],
      ]
    }, state)
}
