import { css } from "@emotion/css"
import { body, colors, theme } from "../View/Theme"
import { FullState, UsersState } from "../State"
import * as ApiUsers from "../Api/Users"
import { navigate } from "../View/Link"
import { toUrl } from "../Route"

const View: React.FC<{ state: FullState }> = ({ state }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Users</div>
      <div className={styles.grids}>
        <div className={styles.gridHeader}>ID</div>
        <div className={styles.gridHeader}>Name</div>
        <div className={styles.gridHeader}>Email</div>
      </div>
      <Users users={state.authState.users} />
    </div>
  )
}

const Users: React.FC<{ users: UsersState }> = ({ users }) => {
  switch (users.data._t) {
    case "NotAsked":
      return <></>
    case "Loading":
      return <div className={styles.loading}>Loading...</div>
    case "Failure":
      return (
        <div className={styles.error}>
          {ApiUsers.errorString(users.data.error)}
        </div>
      )
    case "Loaded":
    case "LoadingMore":
    case "NoMore":
      return users.data.data.map((user) => (
        <div
          key={user.id.unwrap()}
          className={styles.grids}
        >
          <div className={styles.grid}>{user.id.unwrap()}</div>
          <a
            {...navigate(toUrl({ _t: "User", userID: user.id }))}
            className={styles.gridLink}
          >
            {user.name.unwrap()}
          </a>
          <div className={styles.grid}>{user.email.unwrap()}</div>
        </div>
      ))
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
  grids: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: theme.s2,
  }),
  gridHeader: css({
    ...body.small.bold,
    color: colors.blue500,
  }),
  grid: css({
    ...body.small.regular,
    color: colors.neutral700,
  }),
  gridLink: css({
    ...body.small.regular,
    color: colors.blue500,
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
