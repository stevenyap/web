import { toRoute } from "../Route"
import { State, _PublicState } from "../State"
import * as HomeAction from "./Home"
import * as UserAction from "./User"
import { type Action } from "../Action"
import { Cmd, cmd } from "../Cmd"

export function navigateTo(url: string): Action {
  // This will NOT trigger window.onpopstate
  window.history.pushState(null, "", url)
  // So we need to trigger onUrlChange
  return onUrlChange
}

export function onUrlChange(state: State): [State, Cmd] {
  const route = toRoute(window.location.href)
  const updatedState = _PublicState(state, { route })

  switch (route._t) {
    case "Login":
    case "NotFound":
      return [updatedState, cmd()]
    case "Home":
      return HomeAction.onEnterRoute(updatedState)
    case "User":
      return UserAction.onEnterRoute(updatedState, route.userID)
  }
}
