import { FullState } from "../State"

const View: React.FC<{ state: FullState }> = ({ state }) => {
  return <>{state.publicState.route._t}</>
}

export default View
