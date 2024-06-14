import { css } from "@emotion/css"
import { body, buttons, colors, theme } from "../View/Theme"
import { AuthState } from "../State"
import * as Api from "../Api/User/Detail"
import { navigate } from "../View/Link"
import { toUrl } from "../Route"
import { UserState } from "../State/User"

type Props = { state: AuthState }
function View({ state }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.title}>User Detail</div>
      <User user={state.user} />
      <a
        {...navigate(toUrl({ _t: "Home" }))}
        className={styles.back}
      >
        Back
      </a>
    </div>
  )
}

type UserProps = { user: UserState }
function User({ user }: UserProps): JSX.Element {
  switch (user.data._t) {
    case "NotAsked":
      return <></>
    case "Loading":
      return <div className={styles.loading}>Loading...</div>
    case "Failure":
      return (
        <div className={styles.error}>{Api.errorString(user.data.error)}</div>
      )
    case "Success":
      const { data } = user.data
      return (
        <div className={styles.infoContainer}>
          <div className={styles.info}>ID: {data.id.unwrap()}</div>
          <div className={styles.info}>Name: {data.name.unwrap()}</div>
          <div className={styles.info}>Email: {data.email.unwrap()}</div>
        </div>
      )
  }
}

const styles = {
  container: css({
    maxWidth: theme.s200,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.s4,
    gap: theme.s4,
  }),
  title: css({
    ...body.medium.bold,
    color: colors.blue500,
  }),
  back: css({
    ...buttons.primary.s2,
    alignSelf: "flex-start",
    padding: `${theme.s2} ${theme.s6}`,
    textDecoration: "none",
  }),
  infoContainer: css({
    display: "flex",
    flexDirection: "column",
    gap: theme.s2,
  }),
  info: css({
    ...body.small.regular,
    color: colors.neutral700,
  }),
  loading: css({
    ...body.small.bold,
    color: colors.blue500,
  }),
  error: css({
    ...body.small.bold,
    color: colors.red500,
  }),
}

export default View
