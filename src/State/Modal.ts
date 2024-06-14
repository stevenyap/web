import {
  Stacks,
  createStacks,
  popStack,
  pushStack,
} from "../../../core/Data/Stacks"
import type { State } from "../State"

export type Modals = Stacks<Modal>
export type Modal = "TermsAndConditions" | "PrivacyPolicies"

export function init(): Modals {
  return createStacks()
}

export function push(state: State, modal: Modal): State {
  return { ...state, modals: pushStack(modal, state.modals) }
}

export function pop(state: State): State {
  return { ...state, modals: popStack(state.modals) }
}
