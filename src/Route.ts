import * as JD from "decoders"
import { parse } from "teki"
import {
  PositiveInt,
  createPositiveInt,
  positiveIntDecoder,
} from "../../core/data/PositiveInt"
import { stringNumberDecoder } from "../../core/data/Decoder"
import { fromMaybe } from "../../core/data/Maybe"

export type Route =
  | { _t: "Home" }
  | { _t: "Login" }
  | { _t: "User"; userID: PositiveInt }
  | { _t: "NotFound" }

type ParserDecoder = [string[], JD.Decoder<Route>]

const allParsers: ParserDecoder[] = [
  [
    ["/", "/#:_"],
    JD.object({
      _t: JD.always("Home"),
    }),
  ],
  [
    ["/login", "/login/#:_"],
    JD.object({
      _t: JD.always("Login"),
    }),
  ],
  [
    ["/user/:userID", "/user/:userID/#:_"],
    JD.object({
      _t: JD.always("User"),
      userID: stringNumberDecoder.transform(positiveIntDecoder.verify),
    }),
  ],
  [
    ["/not-found", "/not-found/#:_"],
    JD.object({
      _t: JD.always("NotFound"),
    }),
  ],
]

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
  return toRoute_(url, allParsers)
}

function toRoute_(url: string, allParsers: ParserDecoder[]): Route {
  const [current, ...rest] = allParsers
  if (current == null) return { _t: "NotFound" }
  const [patterns, decoder] = current

  const route = patterns.reduce(
    (a: null | Route, pattern: string) =>
      a != null ? a : decoder.value(parse(pattern)(url)) || null,
    null,
  )

  return route != null ? route : toRoute_(url, rest)
}

// For testing purpose
export function _test(): void {
  const userID = fromMaybe(createPositiveInt(1))
  if (userID == null) throw "This is invalid positive int!"

  const urls: Array<[string, Route]> = [
    ["https://example.com", { _t: "Home" }],
    ["https://example.com#123", { _t: "Home" }],
    ["https://example.com?p=1", { _t: "Home" }],
    ["https://example.com?p=1#123", { _t: "Home" }],
    ["https://example.com/", { _t: "Home" }],
    ["https://example.com/#123", { _t: "Home" }],
    ["https://example.com/?p=1", { _t: "Home" }],
    ["https://example.com/?p=1#123", { _t: "Home" }],
    ["https://example.com/login", { _t: "Login" }],
    ["https://example.com/login#123", { _t: "Login" }],
    ["https://example.com/login?p=1", { _t: "Login" }],
    ["https://example.com/login?p=1#123", { _t: "Login" }],
    ["https://example.com/login/", { _t: "Login" }],
    ["https://example.com/login/#123", { _t: "Login" }],
    ["https://example.com/login/?p=1", { _t: "Login" }],
    ["https://example.com/login/?p=1#123", { _t: "Login" }],
    ["https://example.com/user/1", { _t: "User", userID }],
    ["https://example.com/user/1#123", { _t: "User", userID }],
    ["https://example.com/user/1?p=1", { _t: "User", userID }],
    ["https://example.com/user/1?p=1#123", { _t: "User", userID }],
    ["https://example.com/user/1/", { _t: "User", userID }],
    ["https://example.com/user/1/#123", { _t: "User", userID }],
    ["https://example.com/user/1/?p=1", { _t: "User", userID }],
    ["https://example.com/user/1/?p=1#123", { _t: "User", userID }],
    ["https://example.com/a", { _t: "NotFound" }],
    ["https://example.com/not-found", { _t: "NotFound" }],
  ]
  for (const [u, r] of urls) {
    const route = toRoute(u)
    if (r._t != route._t) {
      console.info(u, JSON.stringify(r), JSON.stringify(route))
    }
  }
}
