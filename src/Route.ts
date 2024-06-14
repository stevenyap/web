import * as JD from "decoders"
import * as Teki from "teki"
import { UserID, userIDDecoder } from "../../core/App/User"

export type Route =
  | { _t: "Home" }
  | { _t: "Login" }
  | { _t: "User"; userID: UserID }
  | { _t: "NotFound" }

const Router: Record<Route["_t"], RouteDecoder> = {
  Home: {
    url: "/",
    decoder: JD.always({ _t: "Home" }),
  },
  NotFound: {
    url: "/not-found",
    decoder: JD.always({ _t: "NotFound" }),
  },
  Login: {
    url: "/login",
    decoder: JD.always({ _t: "Login" }),
  },
  User: {
    url: "/user/:userID",
    decoder: JD.object({
      _t: JD.always("User"),
      userID: userIDDecoder,
    }),
  },
}

type RouteDecoder = {
  url: string
  decoder: JD.Decoder<Route>
}

export function toUrl(route: Route): string {
  switch (route._t) {
    case "Home":
      return "/"
    case "Login":
      return "/login"
    case "User":
      return `/user/${route.userID.unwrap()}`
    case "NotFound":
      return "/not-found"
  }
}

export function toRoute(url: string): Route {
  return toRoute_(url, Object.values(Router))
}

function toRoute_(url: string, routeDecoders: RouteDecoder[]): Route {
  const [current, ...rest] = routeDecoders
  if (current == null) return { _t: "NotFound" }
  const { url: url_, decoder } = current

  const parseResult = Teki.parse(url_)(url)
  const route = parseResult == null ? null : decoder.value(parseResult) || null

  return route != null ? route : toRoute_(url, rest)
}
