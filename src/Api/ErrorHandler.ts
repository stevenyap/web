import { ApiResponse } from "../Api"
import { emit } from "../emit"

export function errorHandler<ErrorCode, Payload>(
  r: ApiResponse<ErrorCode, Payload>,
): ApiResponse<ErrorCode, Payload> {
  if (r._t === "Left" && r.error === "UNAUTHORISED")
    emit((s) => [{ _t: "Public", publicState: s.publicState }, []])
  return r
}
