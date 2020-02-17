const path = require('path')
const {readMiddlewareAndRoutes} = require('koa-architect')

exports.loadMiddleware = (app) => {
  // Load middleware
  const fullPath = path.join(__dirname, 'middleware')
  for (const middleware of readMiddlewareAndRoutes(fullPath)) {
    app.use(middleware)
  }
}
