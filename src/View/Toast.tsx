import { css } from "@emotion/css"
import { emit } from "../Emit"
import { Toast } from "../State/Toast"
import { body, keyframes, colors, theme, breakpoint, layoutSize } from "./Theme"
import Svg from "./Svg"
import { removeToast } from "../Action"

type Position = "Top" | "Bottom"
type Props = { position: Position; toast: Toast }
function View({ position, toast }: Props): JSX.Element {
  // Only automatically remove toast if it is not Loading
  if (toast.icon !== "Loading") {
    setTimeout(() => {
      emit(removeToast(toast))
    }, 3000)
  }

  return (
    <div className={styles.container(position)}>
      <div
        className={styles.wrapper}
        onClick={() => emit(removeToast(toast))}
      >
        <IconView toast={toast} />
        <div className={styles.text}>{toast.text}</div>
      </div>
    </div>
  )
}
type IconProps = { toast: Toast }
function IconView({ toast }: IconProps): JSX.Element {
  switch (toast.icon) {
    case "Success":
      return <Svg.Alert.Success />
    case "Error":
      return <Svg.Alert.Error />
    case "Loading":
      return <Svg.Alert.Loading className={styles.loading} />
    case "None":
      return <></>
  }
}

const styles = {
  container: (position: Position) =>
    css({
      width: "100%",
      display: "flex",
      justifyContent: "center",
      position: "fixed",
      left: 0,
      bottom: position === "Bottom" ? theme.s12 : undefined,
      top: position === "Top" ? 0 : undefined,
      zIndex: 101,
    }),
  wrapper: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: 1,
    gap: theme.s1,
    padding: theme.s4,
    margin: theme.s4,
    background: "rgba(0, 0, 0, 0.7)",
    borderRadius: theme.s4,
    ...breakpoint.lg({
      maxWidth: layoutSize.mainContainerMaxWidth,
    }),
  }),
  text: css({
    ...body.small.regular,
    flexGrow: 1,
    color: colors.neutral50,
  }),
  loading: css({
    animation: `${keyframes.spin} linear 2s infinite`,
  }),
}

export default View
