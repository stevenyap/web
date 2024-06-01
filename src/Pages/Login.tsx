import { css } from "@emotion/css"
import { body, buttons, breakpoint, colors, theme } from "../View/Theme"
import { State } from "../State"
import { loginSubmit, loginChangeEmail, loginChangePassword } from "../Action"
import { emit } from "../Program"
import { createEmail } from "../../../core/data/user/Email"
import { fromMaybe } from "../../../core/data/Maybe"
import { createPassword } from "../../../core/data/user/Password"

const View: React.FC<{ state: State }> = ({ state }) => {
  const { email, password } = state.publicState.login
  const disabled =
    fromMaybe(createEmail(email)) == null ||
    fromMaybe(createPassword(password)) == null
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>LOGIN</div>
        <div className={styles.form}>
          <div className={styles.formTitle}>Email</div>
          <input
            className={styles.formInput}
            value={email}
            onChange={(e) => emit(loginChangeEmail(e.target.value))}
          />
          <br />
          <div className={styles.formTitle}>Password</div>
          <input
            className={styles.formInput}
            value={password}
            onChange={(e) => emit(loginChangePassword(e.target.value))}
            type={"password"}
          />
          <br />
          <button
            className={styles.formButton(disabled)}
            disabled={disabled}
            onClick={() => emit(loginSubmit)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: theme.s4,
  }),
  box: css({
    width: "80%",
    maxWidth: "unset",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.s8,
    gap: theme.s4,
    borderRadius: theme.br4,
    border: `1px solid ${colors.neutral300}`,
    boxShadow: theme.elevation.medium,
    background: colors.neutral100,
    ...breakpoint.sm({
      width: "50%",
      maxWidth: theme.s82,
    }),
  }),
  title: css({
    ...body.large.medium,
    color: colors.blue500,
  }),
  form: css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.s1,
  }),
  formTitle: css({
    ...body.small.regular,
    color: colors.blue500,
  }),
  formInput: css({
    padding: `${theme.s1} ${theme.s2}`,
    borderRadius: theme.br2,
    border: `1px solid ${colors.neutral300}`,
    boxShadow: theme.elevation.small,
  }),
  formButton: (disabled: boolean) =>
    css({
      ...buttons.primary.s2,
      background: disabled ? colors.neutral400 : colors.blue500,
      cursor: disabled ? "default" : "pointer",
    }),
}

export default View
