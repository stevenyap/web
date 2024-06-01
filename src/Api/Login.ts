import { publicApi, ApiResponse, apiErrorString, ApiError } from "../Api"
import {
  contract,
  ErrorCode,
  Payload,
  BodyParams,
} from "../../../core/api/Login"

export type { ErrorCode, Payload }
export type Response = ApiResponse<ErrorCode, Payload>

export function call(params: BodyParams): Promise<Response> {
  return publicApi(contract, {}, params)
}

export function errorString(code: ApiError<ErrorCode>): string {
  return apiErrorString(code, (code) => {
    switch (code) {
      case "USER_NOT_FOUND":
        return "User not found."
      case "INVALID_PASSWORD":
        return "Invalid password."
    }
  })
}
