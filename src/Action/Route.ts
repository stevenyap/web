import { toRoute } from "../Route"
import {
  State,
  _Login,
  _PublicState,
  _Toast,
  _UserState,
  _UsersState,
} from "../State"
import * as Home from "./Home"
import * as User from "./User"
import type { Action, Cmd } from "../Action"

export function navigateTo(url: string): Action {
  // This will NOT trigger window.onpopstate
  window.history.pushState(null, "", url)
  return onUrlChange
}

export function onUrlChange(state: State): [State, Cmd] {
  const route = toRoute(window.location.href)
  const updatedState = _PublicState(state, { route })

  switch (route._t) {
    case "Login":
    case "NotFound":
      return [updatedState, []]
    case "Home":
      return Home.onEnterRoute(updatedState)
    case "User":
      return User.onEnterRoute(updatedState, route.userID)
  }
}
