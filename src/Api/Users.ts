import { ApiResponse, apiErrorString, ApiError, authGetApi } from "../Api"
import {
  contract,
  ErrorCode,
  UrlParams,
  Payload,
} from "../../../core/api/Users"

export type { ErrorCode, Payload }
export type Response = ApiResponse<ErrorCode, Payload>

export function call(token: string, params: UrlParams): Promise<Response> {
  return authGetApi(token, contract, params)
}

export function errorString(code: ApiError<ErrorCode>): string {
  return apiErrorString(code, (_) => {
    return "Something went wrong. Please try again."
  })
}
