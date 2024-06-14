import { css } from "@emotion/css"
import { body, buttons, colors, links, theme } from "../View/Theme"
import { State } from "../State"
import { emit } from "../Emit"
import { popModal, pushModal } from "../Action"

type Props = { state: State }
function View({}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Terms and Conditions</div>
        <div className={styles.body}>
          <div className={styles.text}>
            {`Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.`}
          </div>
          <div className={styles.text}>
            {`Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.`}
          </div>
          <a
            className={styles.linkButton}
            onClick={() => emit(pushModal("PrivacyPolicies"))}
          >
            Read more about Privacy Policies
          </a>
        </div>
        <button
          className={styles.button}
          onClick={() => emit(popModal())}
        >
          Close
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: theme.s8,
  }),
  wrapper: css({
    maxHeight: "80dvh",
    maxWidth: theme.s160,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.s4,
    gap: theme.s6,
    alignItems: "center",
    background: colors.neutral50,
    borderRadius: theme.br2,
    border: `1px solid ${colors.neutral200}`,
    overflowY: "auto",
  }),
  title: css({
    ...body.large.bold,
    color: colors.blue500,
  }),
  body: css({
    display: "flex",
    flexDirection: "column",
    gap: theme.s2,
    overflowY: "auto",
  }),
  text: css({
    ...body.small.regular,
    color: colors.neutral800,
  }),
  linkButton: css({
    ...links.s2,
  }),
  button: css({
    ...buttons.primary.s2,
    padding: `${theme.s2} ${theme.s4}`,
  }),
}

export default View
