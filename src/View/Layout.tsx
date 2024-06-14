import { css } from "@emotion/css"
import { body, colors, theme } from "./Theme"
import Toast from "./Toast"
import Modal from "./Modal"
import { navigate } from "./Link"
import { AuthState, State } from "../State"
import { toUrl } from "../Route"
import { logout } from "../Action"
import { emit } from "../Emit"

export function LoadingLayout(): JSX.Element {
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

type EmptyLayoutProps = { state: State; Element: React.FC<{ state: State }> }
export function EmptyLayout({ state, Element }: EmptyLayoutProps): JSX.Element {
  return (
    <>
      <div className={styles.empty}>
        <Element state={state} />
      </div>
      <Toasts state={state} />
      <Modals state={state} />
    </>
  )
}

type AuthLayoutProps = {
  state: AuthState
  Element: React.FC<{ state: AuthState }>
}
export function AuthLayout({ state, Element }: AuthLayoutProps): JSX.Element {
  return (
    <div className={styles.authContainer}>
      <div className={styles.header}>
        <MenuLogo state={state} />
      </div>
      <div className={styles.body}>
        <Element state={state} />
      </div>
      <Toasts state={state} />
      <Modals state={state} />
    </div>
  )
}

type MenuLogoProps = { state: AuthState }
function MenuLogo({ state }: MenuLogoProps): JSX.Element {
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
          className={styles.menu(state.route._t === "Home")}
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

type StateProps = { state: State }
function Toasts({ state }: StateProps): JSX.Element {
  // Display 1 by 1
  const toast = state.toasts[0]
  return toast == null ? (
    <></>
  ) : (
    <Toast
      position="Bottom"
      toast={toast}
    />
  )
}

function Modals({ state }: StateProps): JSX.Element {
  const modals = state.modals.unwrap()
  return (
    <>
      {modals.map((modal, index) => (
        <Modal
          key={index}
          state={state}
          modal={modal}
        />
      ))}
    </>
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
