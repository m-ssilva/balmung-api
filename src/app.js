const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const path = require('path')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const koaSwagger = require('koa2-swagger-ui')
const yamljs = require('yamljs')
const fs = require('fs')
const registerRoutes = require('./helpers/register-routes')
const errorHandler = require('./middlewares/error-handler')
const swaggerFile = path.resolve(path.join(__dirname, '../swagger.yaml'))
const spec = yamljs.parse(fs.readFileSync(swaggerFile, 'utf8'))

app.use(cors())
app.use(bodyParser())
app.use(errorHandler)
registerRoutes(router, path.join(__dirname, './routes'))
app.use(router.routes())


router.use(koaSwagger())
router.get('/api/docs', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }))

module.exports = app

