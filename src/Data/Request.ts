import { Either, left, right } from "../../../core/Data/Either"
import * as Logger from "./Logger"

export type RequestError = "NETWORK_ERROR"
export type RequestData = [number, unknown]
export type RequestResult = Either<RequestError, RequestData>

export async function request(
  url: string,
  options: RequestInit,
): Promise<RequestResult> {
  try {
    const response = await fetch(url, options)
    return right([response.status, await response.json()])
  } catch (error) {
    Logger.error(error)
    return left("NETWORK_ERROR")
  }
}
