const Koa = require('koa')
var app = new Koa()

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
// CORS
const CORS = require('./middleware/cors')
app.use(CORS)

// router
const { routerRules, allowedMethods } = require('./routers')
app.use(routerRules)
    .use(allowedMethods)

const port = process.env.LEANCLOUD_APP_PORT || '8000'
app.listen(port)
