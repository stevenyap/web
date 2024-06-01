import * as JD from "decoders"
import * as Teki from "teki"
import Env from "./Env"
import {
  RequestData,
  RequestError,
  RequestResult,
  request,
} from "./Data/Request"
import {
  AuthApi,
  PublicApi,
  ResponseJson,
  UrlRecord,
} from "../../core/data/Api"
import { Either, left, right } from "../../core/data/Either"
import { emit } from "./Program"

export type ApiError<E> =
  | "NETWORK_ERROR"
  | "SERVER_ERROR"
  | "UNAUTHORISED"
  | "DECODE_ERROR"
  | "PAYLOAD_TOO_LARGE"
  | E

export type ApiResponse<E, D> = Either<ApiError<E>, D>
export function getErrorCode<E>(error: ApiError<E>): E | null {
  switch (error) {
    case "NETWORK_ERROR":
    case "SERVER_ERROR":
    case "UNAUTHORISED":
    case "DECODE_ERROR":
    case "PAYLOAD_TOO_LARGE":
      return null
    default:
      return error
  }
}

export function publicApi<
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

export function toStringRecord<R extends string>(
  urlData: UrlRecord<R>,
): Record<string, string> {
  return Object.entries(urlData).reduce(
    (acc: Record<string, string>, [key, value]) => {
      acc[key] = String(value)
      return acc
    },
    {},
  )
}

export function makePath(endpoint: string): string {
  return `${location.protocol}//${Env.API_HOST}${endpoint}`
}

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
      return "Request is too large"
    default:
      return fn(error)
  }
}

// Internal

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
          emit((s) => [{ _t: "Public", publicState: s.publicState }, []])
        }
        return left(data.value.code)
      case "ServerError":
        console.error(data.value.errorID)
        return left("SERVER_ERROR")
    }
  } else {
    console.error(data.error.text)
    return left("DECODE_ERROR")
  }
}

function requestErrorHandler<E, D>(error: RequestError): ApiResponse<E, D> {
  switch (error) {
    case "PAYLOAD_TOO_LARGE":
      return left("PAYLOAD_TOO_LARGE")
    case "NETWORK_ERROR":
      return left("NETWORK_ERROR")
  }
}
