import { defineConfig, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { NextFunction } from 'connect'

const localDevPlugin = (): Plugin => ({
  name: 'local-dev-plugin',

  configureServer(server: ViteDevServer) {
    server.middlewares.use(
      (
        req: IncomingMessage,
        res: ServerResponse,
        next: NextFunction
      ) => {
        if (
          req.method === 'GET' &&
          (req.url === '/ad' || req.url === '/ad/')
        ) {
          req.url = '/ad/index.html'
          return next()
        }

        if (req.method === 'POST' && req.url === '/api/book') {
          let body = ''

          req.on('data', (chunk: Buffer) => {
            body += chunk.toString()
          })

          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body)

              const appsScriptUrl =
                'https://script.google.com/macros/s/AKfycbyBD8TdMWxsCk0xqlSBSJFWbi-iwB_5qchyKiwELpOKFb1viN9SO6vpi5UN0bor7SGmXQ/exec'

              await fetch(appsScriptUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsed),
              })

              res.setHeader('Content-Type', 'application/json')
              res.end(
                JSON.stringify({
                  message: 'Appointment booked successfully!',
                })
              )
            } catch (e) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(
                JSON.stringify({
                  error: 'Failed to process booking.',
                })
              )
            }
          })

          return
        }

        next()
      }
    )
  },
})

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localDevPlugin(),
  ],
})
