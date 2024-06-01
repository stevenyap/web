import { css } from "@emotion/css"
import { body, colors, theme } from "./View/Theme"
import { FullState, State } from "./State"
import Login from "./Pages/Login"
import Home from "./Pages/Home"

const View: React.FC<{ state: State }> = ({ state }) => {
  if (state._t === "LoadingAuth") {
    return loadingLayout()
  }

  switch (state.publicState.route._t) {
    case "Login":
      return emptyLayout(<Login state={state} />)
    case "Home":
      return authLayout(state, Home)
    case "User":
      return authLayout(state, Home)
    case "NotFound":
      return authLayout(state, Home)
  }
}

function loadingLayout(): JSX.Element {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingPad}>
        <img
          width={"100%"}
          className={styles.loadingImg}
          src={"/assets/logo.jpg"}
        />
        <div className={styles.loadingText}>Loading...</div>
      </div>
    </div>
  )
}

function emptyLayout(element: JSX.Element): JSX.Element {
  return <div className={styles.empty}>{element}</div>
}

function authLayout(
  state: State,
  Element: React.FC<{ state: FullState }>,
): JSX.Element {
  if (state._t !== "Auth") {
    return emptyLayout(<Login state={state} />)
  }

  return (
    <div>
      <Element state={state} />
    </div>
  )
}

const styles = {
  loading: css({
    width: "100dvw",
    height: "100dvh",
    display: "flex",
    overflow: "hidden",
  }),
  loadingPad: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: theme.s4,
    gap: theme.s4,
  }),
  loadingImg: css({
    maxWidth: theme.s82,
  }),
  loadingText: css({
    ...body.medium.bold,
    color: colors.blue500,
  }),
  empty: css({
    width: "100dvw",
    height: "100dvh",
    display: "flex",
    overflow: "hidden",
  }),
}

export default View
