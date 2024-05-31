import { State } from "./State"

const View: React.FC<{ state: State }> = ({ state }) => {
  const { login } = state.publicState
  return <div>Hello {login}!</div>
}

export default View
