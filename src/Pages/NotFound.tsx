import { css } from "@emotion/css"
import { body, colors, theme } from "../View/Theme"
import { State } from "../State"

const View: React.FC<{ state: State }> = ({}) => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundPad}>
        <img
          width={"100%"}
          className={styles.notFoundImg}
          src={"/assets/logo.png"}
        />
        <div className={styles.notFoundText}>Page Not Found</div>
      </div>
    </div>
  )
}

const styles = {
  notFound: css({
    width: "100dvw",
    height: "100dvh",
    display: "flex",
    overflow: "hidden",
  }),
  notFoundPad: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: theme.s4,
    gap: theme.s4,
  }),
  notFoundImg: css({
    maxWidth: theme.s82,
  }),
  notFoundText: css({
    ...body.medium.bold,
    color: colors.blue500,
  }),
}

export default View
