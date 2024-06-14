import { AuthState, State } from "./State"
import NotFound from "./Pages/NotFound"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import User from "./Pages/User"
import { AuthLayout, EmptyLayout, LoadingLayout } from "./View/Layout"

type Props = { state: State }
function View({ state }: Props): JSX.Element {
  if (state._t === "LoadingAuth") {
    return <LoadingLayout />
  }

  switch (state.route._t) {
    case "Login":
      return (
        <EmptyLayout
          state={state}
          Element={Login}
        />
      )
    case "Home":
      return checkAuth(state, Home)
    case "User":
      return checkAuth(state, User)
    case "NotFound":
      return (
        <EmptyLayout
          state={state}
          Element={NotFound}
        />
      )
  }
}

function checkAuth(
  state: State,
  Element: React.FC<{ state: AuthState }>,
): JSX.Element {
  return state._t !== "Auth" ? (
    <EmptyLayout
      state={state}
      Element={Login}
    />
  ) : (
    <AuthLayout
      state={state}
      Element={Element}
    />
  )
}

export default View
