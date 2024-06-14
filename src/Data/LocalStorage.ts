import { Opaque, jsonValueCreate } from "../../../core/Data/Opaque"

const tokenKey = "token"
const key: unique symbol = Symbol()
export type Token = Opaque<string, typeof key>

export function createToken(s: string): Token {
  return jsonValueCreate<string, typeof key>(key)(s)
}

export function getToken(): Token | null {
  const tokenS = localStorage.getItem(tokenKey)
  return tokenS == null
    ? null
    : jsonValueCreate<string, typeof key>(key)(tokenS)
}

export function setToken(token: string): void {
  localStorage.setItem(tokenKey, token)
}

export function removeToken(): void {
  localStorage.removeItem(tokenKey)
}
