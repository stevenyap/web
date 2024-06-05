import * as JD from "decoders"
import { stringNumberDecoder } from "../../core/Data/Decoder"

const env = JD.object({
  APP_ENV: JD.string,
  APP_PORT: stringNumberDecoder,
  API_HOST: JD.string,
  LOCAL_STORAGE_TOKEN_KEY: JD.string,
}).verify({
  APP_ENV: import.meta.env.VITE_APP_ENV,
  APP_PORT: import.meta.env.VITE_APP_PORT,
  API_HOST: import.meta.env.VITE_API_HOST,
  LOCAL_STORAGE_TOKEN_KEY: import.meta.env.VITE_LOCAL_STORAGE_TOKEN_KEY,
})

export default env
