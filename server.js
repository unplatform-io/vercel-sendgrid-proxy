/* eslint-disable no-console */
const express = require('express')
const next = require('next')

const proxy = {
  '/': {
    target: 'https://sendgrid.net/',
    changeOrigin: true,
  },
}

const port = parseInt(process.env.PORT, 10) || 3000
const env = process.env.NODE_ENV
const app = next({
  dir: '.', // base directory where everything is, could move to src later
})

const handle = app.getRequestHandler()

let server
app
  .prepare()
  .then(() => {
    server = express()

    // Set up the proxy.
    const { createProxyMiddleware } = require('http-proxy-middleware')
    Object.keys(proxy).forEach(function (context) {
      server.use(context, createProxyMiddleware(proxy[context]))
    })

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      console.log(`> Ready on port ${port} [${env}]`)
    })
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })
