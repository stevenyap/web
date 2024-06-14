import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { stringNumberDecoder } from "../core/Data/Decoder"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    plugins: [react()],
    publicDir: "./public",
    server: {
      port: stringNumberDecoder.verify(env.VITE_APP_PORT),
    },
    build: {
      outDir: "dist",
    },
  }
})
