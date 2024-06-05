import { Either, left, right } from "../../../core/Data/Either"

export type RequestError = "NETWORK_ERROR" | "PAYLOAD_TOO_LARGE"
export type RequestData = [number, unknown]
export type RequestResult = Either<RequestError, RequestData>

export async function request(
  url: string,
  options: RequestInit,
): Promise<RequestResult> {
  try {
    const response = await fetch(url, options)
    return response.status === 413
      ? left("PAYLOAD_TOO_LARGE")
      : right([response.status, await response.json()])
  } catch (error) {
    console.error(error)
    return left("NETWORK_ERROR")
  }
}
