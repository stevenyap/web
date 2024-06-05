import { css } from "@emotion/css"
import { body, colors, theme } from "./View/Theme"
import Toast from "./View/Toast"
import { navigate } from "./View/Link"
import { FullState, State } from "./State"
import { toUrl } from "./Route"
import NotFound from "./Pages/NotFound"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import User from "./Pages/User"
import { logout } from "./Action"
import { emit } from "./Emit"

const View: React.FC<{ state: State }> = ({ state }) => {
  if (state._t === "LoadingAuth") {
    return loadingLayout()
  }

  switch (state.publicState.route._t) {
    case "Login":
      return emptyLayout(state, Login)
    case "Home":
      return authLayout(state, Home)
    case "User":
      return authLayout(state, User)
    case "NotFound":
      return emptyLayout(state, NotFound)
  }
}

function loadingLayout(): JSX.Element {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingPad}>
        <img
          width={"100%"}
          className={styles.loadingImg}
          src={"/assets/logo.png"}
        />
        <div className={styles.loadingText}>Loading...</div>
      </div>
    </div>
  )
}

function emptyLayout(
  state: State,
  Element: React.FC<{ state: State }>,
): JSX.Element {
  const toast = state.publicState.toasts[0]
  return (
    <>
      <div className={styles.empty}>
        <Element state={state} />
      </div>
      {toast != null && (
        <Toast
          position="Bottom"
          toast={toast}
        />
      )}
    </>
  )
}

function authLayout(
  state: State,
  Element: React.FC<{ state: FullState }>,
): JSX.Element {
  if (state._t !== "Auth") {
    return emptyLayout(state, Login)
  }
  const toast = state.publicState.toasts[0]

  return (
    <div className={styles.authContainer}>
      <div className={styles.header}>
        <MenuLogo state={state} />
      </div>
      <div className={styles.body}>
        <Element state={state} />
      </div>
      {toast != null && (
        <Toast
          position="Bottom"
          toast={toast}
        />
      )}
    </div>
  )
}

const MenuLogo: React.FC<{ state: FullState }> = ({ state }) => {
  return (
    <div className={styles.menuLogo}>
      <a {...navigate(toUrl({ _t: "Home" }))}>
        <img
          width={"100%"}
          className={styles.logo}
          src={"/assets/logo.png"}
        />
      </a>
      <div className={styles.menus}>
        <a
          {...navigate(toUrl({ _t: "Home" }))}
          className={styles.menu(state.publicState.route._t === "Home")}
        >
          Home
        </a>
        <a
          {...navigate(toUrl({ _t: "Home" }), () => emit(logout()))}
          className={styles.menu(false)}
        >
          Logout
        </a>
      </div>
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
  authContainer: css({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  }),
  header: css({
    width: "100%",
    height: theme.s15,
    display: "flex",
    justifyContent: "center",
    background: colors.neutral200,
    position: "fixed",
    overflow: "hidden",
  }),
  body: css({
    marginTop: theme.s15,
    display: "flex",
    justifyContent: "center",
  }),
  menuLogo: css({
    maxWidth: theme.s200,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.s4,
    flexGrow: 1,
    background: colors.neutral200,
  }),
  logo: css({
    maxWidth: theme.s10,
  }),
  menus: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.s4,
  }),
  menu: (active: boolean) =>
    css({
      ...body.small.regular,
      color: active ? colors.blue500 : colors.neutral800,
      textDecoration: "none",
    }),
}

export default View
