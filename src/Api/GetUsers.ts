import { authApi, ApiResponse, apiErrorString, ApiError } from "../Api"
import {
  contract,
  ErrorCode,
  UrlParams,
  Payload,
} from "../../../core/api/GetUsers"

export type { ErrorCode, Payload }
export type Response = ApiResponse<ErrorCode, Payload>

export function call(token: string, params: UrlParams): Promise<Response> {
  return authApi(token, contract, params, undefined)
}

export function errorString(code: ApiError<ErrorCode>): string {
  return apiErrorString(code, (_) => {
    return "Something went wrong. Please try again."
  })
}
