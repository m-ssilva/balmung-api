const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const path = require('path')
const bodyParser = require('koa-bodyparser')
const registerRoutes = require('./helpers/register-routes')
const errorHandler = require('./middlewares/error-handler')

app.use(bodyParser())
app.use(errorHandler)
registerRoutes(router, path.join(__dirname, './routes'))
app.use(router.routes())

module.exports = app

