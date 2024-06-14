import {
  ApiResponse,
  apiErrorString,
  ApiError,
  authNoneBodyApi,
} from "../../Api"
import {
  contract,
  ErrorCode,
  UrlParams,
  Payload,
} from "../../../../core/Api/User/List"

export type { ErrorCode, Payload }
export type Response = ApiResponse<ErrorCode, Payload>

export async function call(
  token: string,
  params: UrlParams,
): Promise<Response> {
  return authNoneBodyApi(token, contract, params)
}

export function errorString(code: ApiError<ErrorCode>): string {
  return apiErrorString(code, (_) => {
    return "Something went wrong. Please try again."
  })
}
