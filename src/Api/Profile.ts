import { ApiResponse, apiErrorString, ApiError, authGetApi } from "../Api"
import { contract, ErrorCode, Payload } from "../../../core/api/Profile"

export type { ErrorCode, Payload }
export type Response = ApiResponse<ErrorCode, Payload>

export function call(token: string): Promise<Response> {
  return authGetApi(token, contract, {})
}

export function errorString(code: ApiError<ErrorCode>): string {
  return apiErrorString(code, (_) => {
    return "Something went wrong. Please try again."
  })
}
