import { css } from "@emotion/css"
import { State } from "../State"
import { Modal } from "../State/Modal"
import { emit } from "../Emit"
import { popModal } from "../Action"
import Term from "../Modal/Term"
import Policy from "../Modal/Policy"

type Props = { state: State; modal: Modal }
function View({ state, modal }: Props): JSX.Element {
  switch (modal) {
    case "TermsAndConditions":
      return (
        <FullScreenModal>
          <Term state={state} />
        </FullScreenModal>
      )
    case "PrivacyPolicies":
      return (
        <FullScreenModal>
          <Policy state={state} />
        </FullScreenModal>
      )
  }
}

type FullScreenModalProp = {
  children: JSX.Element
  onClose?: () => void
}
function FullScreenModal({
  children,
  onClose,
}: FullScreenModalProp): JSX.Element {
  return (
    <div
      className={styles.background}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (onClose == null) {
            emit(popModal())
          } else {
            onClose()
          }
        }
      }}
    >
      {children}
    </div>
  )
}

const styles = {
  background: css({
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 100,
    maxWidth: "100dvw",
    maxHeight: "100dvh",
    width: "100dvw",
    height: "100dvh",
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
}

export default View
