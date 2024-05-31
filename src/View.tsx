import { State } from "./State"

const View: React.FC<{ state: State }> = ({ state }) => {
  const { route } = state.publicState
  return <div>Hello {route._t}!</div>
}

export default View
