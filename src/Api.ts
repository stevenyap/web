import * as JD from "decoders"
import * as Teki from "teki"
import * as Logger from "./Data/Logger"
import Env from "./Env"
import {
  RequestData,
  RequestError,
  RequestResult,
  request,
} from "./Data/Request"
import {
  AuthApi,
  AuthNoneBodyApi,
  AuthStreamApi,
  PublicApi,
  PublicNoneBodyApi,
  ResponseJson,
  UrlRecord,
} from "../../core/Data/Api"
import { Either, left, right } from "../../core/Data/Either"
import { emit } from "./Emit"

export type ApiResponse<E, D> = Either<ApiError<E>, D>

export async function publicApi<
  Route extends string,
  UrlParams extends UrlRecord<Route>,
  RequestBody,
  ErrorCode,
  Payload,
>(
  contract: PublicApi<Route, UrlParams, RequestBody, ErrorCode, Payload>,
  urlData: UrlParams,
  bodyData: RequestBody,
): Promise<ApiResponse<ErrorCode, Payload>> {
  const { method, route, responseDecoder } = contract
  const path = Teki.reverse(route)(toStringRecord(urlData))
  return request(makePath(path), {
    method,
    headers: getHeaders(),
    body: JSON.stringify(bodyData),
  }).then(handleRequest(responseDecoder))
}

export async function publicNoneBodyApi<
  Route extends string,
  UrlParams extends UrlRecord<Route>,
  ErrorCode,
  Payload,
>(
  contract: PublicNoneBodyApi<Route, UrlParams, ErrorCode, Payload>,
  urlData: UrlParams,
): Promise<ApiResponse<ErrorCode, Payload>> {
  const { method, route, responseDecoder } = contract
  const path = Teki.reverse(route)(toStringRecord(urlData))
  return request(makePath(path), {
    method,
    headers: getHeaders(),
  }).then(handleRequest(responseDecoder))
}

export async function authApi<
  Route extends string,
  UrlParams extends UrlRecord<Route>,
  RequestBody,
  ErrorCode,
  Payload,
>(
  token: string,
  contract: AuthApi<Route, UrlParams, RequestBody, ErrorCode, Payload>,
  urlData: UrlParams,
  bodyData: RequestBody,
): Promise<ApiResponse<ErrorCode, Payload>> {
  const { method, route, responseDecoder } = contract
  const path = Teki.reverse(route)(toStringRecord(urlData))

  return request(makePath(path), {
    method,
    headers: getAuthHeaders(token),
    body: JSON.stringify(bodyData),
  }).then(handleRequest(responseDecoder))
}

export async function authNoneBodyApi<
  Route extends string,
  UrlParams extends UrlRecord<Route>,
  ErrorCode,
  Payload,
>(
  token: string,
  contract: AuthNoneBodyApi<Route, UrlParams, ErrorCode, Payload>,
  urlData: UrlParams,
): Promise<ApiResponse<ErrorCode, Payload>> {
  const { method, route, responseDecoder } = contract
  const path = Teki.reverse(route)(toStringRecord(urlData))

  return request(makePath(path), {
    method,
    headers: getAuthHeaders(token),
  }).then(handleRequest(responseDecoder))
}

export async function authStreamApi<
  Route extends string,
  UrlParams extends UrlRecord<Route>,
  ErrorCode,
  Payload,
>(
  token: string,
  contract: AuthStreamApi<Route, UrlParams, ErrorCode, Payload>,
  urlData: UrlParams,
  bodyData: File,
): Promise<ApiResponse<ErrorCode, Payload>> {
  const { route, responseDecoder } = contract
  const path = Teki.reverse(route)(toStringRecord(urlData))

  return request(makePath(path), {
    headers: getAuthHeaders(token),
    body: bodyData,
  }).then(handleRequest(responseDecoder))
}

export type ApiError<E> =
  | "NETWORK_ERROR"
  | "SERVER_ERROR"
  | "UNAUTHORISED"
  | "DECODE_ERROR"
  | "PAYLOAD_TOO_LARGE"
  | E

export function apiErrorString<E>(
  error: ApiError<E>,
  fn: (e: E) => string,
): string {
  switch (error) {
    case "NETWORK_ERROR":
      return "Internet is unavailable"
    case "SERVER_ERROR":
      return "Something went wrong with the server"
    case "UNAUTHORISED":
      return "Please login again to start using the app"
    case "DECODE_ERROR":
      return "Something went wrong with the server response"
    case "PAYLOAD_TOO_LARGE":
      return "Request payload is too large"
    default:
      return fn(error)
  }
}

// Internal

function toStringRecord<R extends string>(
  urlData: UrlRecord<R>,
): Record<string, string> {
  return Object.entries(urlData).reduce(
    (acc: Record<string, string>, [key, value]) => {
      acc[key] = value == null ? "" : JSON.stringify(value)
      return acc
    },
    {},
  )
}

function makePath(endpoint: string): string {
  return `${location.protocol}//${Env.API_HOST}${endpoint}`
}

function getHeaders(): Headers {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  return headers
}

function getAuthHeaders(token: string): Headers {
  const headers = getHeaders()
  headers.append("Authorization", `Bearer ${token}`)
  return headers
}

function handleRequest<E, D>(
  responseDecoder: (status: number) => JD.Decoder<ResponseJson<E, D>>,
): (result: RequestResult) => ApiResponse<E, D> {
  return function (result: RequestResult): ApiResponse<E, D> {
    return result._t === "Right"
      ? requestPayloadHandler(responseDecoder, result.value)
      : requestErrorHandler(result.error)
  }
}

function requestPayloadHandler<E, D>(
  responseDecoder: (status: number) => JD.Decoder<ResponseJson<E, D>>,
  [statusCode, payload]: RequestData,
): ApiResponse<E, D> {
  const data = responseDecoder(statusCode).decode(payload)
  if (data.ok === true) {
    switch (data.value._t) {
      case "Ok":
        return right(data.value.data)
      case "Err":
        if (data.value.code === "UNAUTHORISED") {
          emit((s) => [{ ...s, _t: "Public" }, []])
        }
        return left(data.value.code)
      case "ServerError":
        Logger.error(data.value.errorID)
        return left("SERVER_ERROR")
    }
  } else {
    Logger.error(data.error.text)
    return left("DECODE_ERROR")
  }
}

function requestErrorHandler<E, D>(error: RequestError): ApiResponse<E, D> {
  switch (error) {
    case "NETWORK_ERROR":
      return left("NETWORK_ERROR")
  }
}
