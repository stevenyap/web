import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { stringNumberDecoder } from "../core/data/Decoder"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    // Seem like cannot move index.html to public
    // https://stackoverflow.com/questions/76590642/how-to-configure-vite-with-index-html-in-public-folder
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
