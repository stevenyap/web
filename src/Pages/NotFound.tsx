import { css } from "@emotion/css"
import { body, colors, links, theme } from "../View/Theme"
import { State } from "../State"
import { navigate } from "../View/Link"
import { toUrl } from "../Route"

type Props = { state: State }
function View({}: Props): JSX.Element {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundPad}>
        <img
          width={"100%"}
          className={styles.notFoundImg}
          src={"/assets/logo.png"}
        />
        <div className={styles.notFoundText}>Page Not Found</div>
        <a
          {...navigate(toUrl({ _t: "Home" }))}
          className={styles.notFoundLink}
        >
          Back to Home
        </a>
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
  notFoundLink: css({
    ...links.s2,
  }),
}

export default View
