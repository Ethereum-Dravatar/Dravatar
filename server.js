const Koa = require('koa');
var app = new Koa();

const bodyParser = require('koa-bodyparser');
app.use(bodyParser())
// CORS
const cors = require('koa2-cors')
const CORS = cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return false;
        }
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
})
app.use(CORS)

// router
const { routerRules, allowedMethods } = require('./routers')
app.use(routerRules)
    .use(allowedMethods)

const port = process.env.LEANCLOUD_APP_PORT || '8000'
app.listen(port);
