const app = require('../app')
const helmet = require('helmet')
const uuidv4 = require('uuid/v4')

app.use(function (req, res, next) {
  res.locals.nonce = uuidv4()
  next()
})
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'cdnjs.cloudflare.com'],
    scriptSrc: ["'self'", 'cdnjs.cloudflare.com', (req, res) => `'nonce-${res.locals.nonce}'`]
  }
}))
app.use(helmet.xssFilter())
