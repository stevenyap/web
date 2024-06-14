import { type Action } from "./Action"

export type Cmd = Array<Promise<Action | null>>

export function cmd(...xs: Cmd): Cmd {
  return xs
}

export function perform(a: Action): Promise<Action> {
  return Promise.resolve(a)
}
