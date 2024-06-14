import { ApiResponse, apiErrorString, ApiError, authNoneBodyApi } from "../Api"
import { contract, ErrorCode, Payload } from "../../../core/Api/Profile"

export type { ErrorCode, Payload }
export type Response = ApiResponse<ErrorCode, Payload>

export async function call(token: string): Promise<Response> {
  return authNoneBodyApi(token, contract, {})
}

export function errorString(code: ApiError<ErrorCode>): string {
  return apiErrorString(code, (_) => {
    return "Something went wrong. Please try again."
  })
}
