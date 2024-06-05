import * as JD from "decoders"
import * as Teki from "teki"
import { PositiveInt, positiveIntDecoder } from "../../core/Data/PositiveInt"
import { stringNumberDecoder } from "../../core/Data/Decoder"

export type Route =
  | { _t: "Home" }
  | { _t: "Login" }
  | { _t: "User"; userID: PositiveInt }
  | { _t: "NotFound" }

const Router: Record<Route["_t"], RouteDecoder> = {
  Home: {
    urls: ["/", "/#:_"],
    decoder: JD.always({ _t: "Home" }),
  },
  NotFound: {
    urls: ["/not-found", "/not-found/#:_"],
    decoder: JD.always({ _t: "NotFound" }),
  },
  Login: {
    urls: ["/login", "/login/#:_"],
    decoder: JD.always({ _t: "Login" }),
  },
  User: {
    urls: ["/user/:userID", "/user/:userID/#:_"],
    decoder: JD.object({
      _t: JD.always("User"),
      userID: stringNumberDecoder.transform(positiveIntDecoder.verify),
    }),
  },
}

type RouteDecoder = {
  urls: string[]
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
  const { urls, decoder } = current

  const route = urls.reduce((route: Route | null, url_: string) => {
    if (route != null) return route

    const parseResult = Teki.parse(url_)(url)
    return parseResult == null ? null : decoder.value(parseResult) || null
  }, null)

  return route != null ? route : toRoute_(url, rest)
}
