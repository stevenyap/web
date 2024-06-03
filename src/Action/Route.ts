import { toRoute } from "../Route"
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
import * as RemoteData from "../../../core/data/RemoteData"
import * as PaginationData from "../../../core/data/PaginationData"
import * as ApiUsers from "../Api/Users"
import * as ApiUser from "../Api/User"
import type { Action, Cmd } from "../Action"

export function navigateTo(url: string): Action {
  // This will NOT trigger window.onpopstate
  window.history.pushState(null, "", url)
  return onUrlChange
}

export function onUrlChange(state: State): [State, Cmd] {
  const updatedState = _PublicState(state, {
    route: toRoute(window.location.href),
  })
  if (updatedState._t !== "Auth") return [updatedState, []]

  const { authState, publicState } = updatedState
  const { route } = publicState
  const { token, users, user } = authState

  switch (route._t) {
    case "Login":
    case "NotFound":
      return [updatedState, []]
    case "Home":
      return users.data._t === "NotAsked"
        ? [
            _UsersState(updatedState, { data: PaginationData.loading() }),
            [
              ApiUsers.call(token, { lastID: null, limit: users.limit }).then(
                (r) => usersResponse(r),
              ),
            ],
          ]
        : [updatedState, []]
    case "User":
      return user.userID !== route.userID
        ? [
            _UserState(updatedState, { data: RemoteData.loading() }),
            [
              ApiUser.call(token, { userID: route.userID }).then((r) =>
                userResponse(r),
              ),
            ],
          ]
        : [updatedState, []]
  }
}

function userResponse(response: ApiUser.Response): Action {
  return (state: State) =>
    mapFullState((fullState: FullState) => {
      if (response._t === "Left") {
        return [
          _UserState(fullState, {
            data: RemoteData.failure(response.error),
          }),
          [],
        ]
      }
      return [
        _UserState(fullState, {
          data: RemoteData.success(response.value),
        }),
        [],
      ]
    }, state)
}

function usersResponse(response: ApiUsers.Response): Action {
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
