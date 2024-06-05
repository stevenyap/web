import { ApiResponse, apiErrorString, ApiError, postApi } from "../Api"
import {
  contract,
  ErrorCode,
  Payload,
  BodyParams,
} from "../../../core/Api/Login"
import { errorHandler } from "./ErrorHandler"

export type { ErrorCode, Payload }
export type Response = ApiResponse<ErrorCode, Payload>

export async function call(params: BodyParams): Promise<Response> {
  return postApi(contract, {}, params).then(errorHandler)
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
