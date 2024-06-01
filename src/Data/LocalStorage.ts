import Env from "../Env"

export function getToken(): string | null {
  return localStorage.getItem(Env.LOCAL_STORAGE_TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(Env.LOCAL_STORAGE_TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(Env.LOCAL_STORAGE_TOKEN_KEY)
}
